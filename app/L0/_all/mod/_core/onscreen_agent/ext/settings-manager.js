/**
 * Settings Manager for Agent Alex
 * Manages persistent settings including Prompt Enhancer toggle
 */

const SETTINGS_KEY = "agent-alex-settings";

export const DEFAULT_SETTINGS = {
  promptEnhancer: {
    enabled: true,
    autoPreview: false,
    model: "claude-3-sonnet"
  },
  appearance: {
    theme: "auto",
    compactMode: false
  },
  notifications: {
    enabled: true,
    sound: false
  }
};

export class SettingsManager {
  constructor(options = {}) {
    this.storageKey = options.storageKey || SETTINGS_KEY;
    this.settings = this.loadSettings();
    this.observers = new Set();
  }

  /**
   * Load settings from storage
   */
  loadSettings() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return this.mergeSettings(DEFAULT_SETTINGS, parsed);
      }
    } catch (error) {
      console.error("[v0] Failed to load settings:", error);
    }
    return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
  }

  /**
   * Save settings to storage
   */
  saveSettings() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
      this.notifyObservers("settings-changed", this.settings);
    } catch (error) {
      console.error("[v0] Failed to save settings:", error);
    }
  }

  /**
   * Merge settings objects
   */
  mergeSettings(defaults, current) {
    const merged = JSON.parse(JSON.stringify(defaults));
    
    if (!current || typeof current !== "object") {
      return merged;
    }

    for (const key in current) {
      if (typeof merged[key] === "object" && !Array.isArray(merged[key])) {
        merged[key] = { ...merged[key], ...current[key] };
      } else {
        merged[key] = current[key];
      }
    }

    return merged;
  }

  /**
   * Get a setting by path
   */
  get(path, defaultValue = undefined) {
    if (typeof path !== "string") {
      return defaultValue;
    }

    const keys = path.split(".");
    let value = this.settings;

    for (const key of keys) {
      if (value && typeof value === "object" && key in value) {
        value = value[key];
      } else {
        return defaultValue;
      }
    }

    return value;
  }

  /**
   * Set a setting by path
   */
  set(path, value) {
    if (typeof path !== "string") {
      return false;
    }

    const keys = path.split(".");
    const lastKey = keys.pop();
    let current = this.settings;

    for (const key of keys) {
      if (!(key in current) || typeof current[key] !== "object") {
        current[key] = {};
      }
      current = current[key];
    }

    current[lastKey] = value;
    this.saveSettings();
    return true;
  }

  /**
   * Toggle boolean setting
   */
  toggle(path) {
    const current = this.get(path, false);
    this.set(path, !current);
    return !current;
  }

  /**
   * Get Prompt Enhancer settings
   */
  getEnhancerSettings() {
    return {
      ...this.get("promptEnhancer", DEFAULT_SETTINGS.promptEnhancer)
    };
  }

  /**
   * Set Prompt Enhancer settings
   */
  setEnhancerSettings(settings) {
    if (typeof settings !== "object") {
      return false;
    }

    const current = this.getEnhancerSettings();
    this.set("promptEnhancer", { ...current, ...settings });
    return true;
  }

  /**
   * Toggle prompt enhancer on/off
   */
  toggleEnhancer() {
    return this.toggle("promptEnhancer.enabled");
  }

  /**
   * Subscribe to settings changes
   */
  subscribe(callback) {
    if (typeof callback === "function") {
      this.observers.add(callback);
    }
    return () => this.observers.delete(callback);
  }

  /**
   * Notify all observers
   */
  notifyObservers(event, data) {
    this.observers.forEach(callback => {
      try {
        callback({ event, data });
      } catch (error) {
        console.error("[v0] Observer notification error:", error);
      }
    });
  }

  /**
   * Reset to defaults
   */
  reset() {
    this.settings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    this.saveSettings();
  }

  /**
   * Export settings
   */
  export() {
    return JSON.stringify(this.settings, null, 2);
  }

  /**
   * Import settings
   */
  import(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      this.settings = this.mergeSettings(DEFAULT_SETTINGS, imported);
      this.saveSettings();
      return true;
    } catch (error) {
      console.error("[v0] Failed to import settings:", error);
      return false;
    }
  }
}

/**
 * Singleton instance
 */
let settingsInstance = null;

export function getSettingsManager(options = {}) {
  if (!settingsInstance) {
    settingsInstance = new SettingsManager(options);
  }
  return settingsInstance;
}

export function resetSettingsManager() {
  settingsInstance = null;
}
