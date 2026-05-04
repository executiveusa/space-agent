/**
 * Settings Panel UI Component
 * Provides UI for configuring Agent Alex settings
 */

import { getSettingsManager } from "./settings-manager.js";
import { getPromptEnhancer } from "./prompt-enhancer.js";

export class SettingsPanelUI {
  constructor(options = {}) {
    this.settingsManager = getSettingsManager(options.settingsOptions || {});
    this.promptEnhancer = getPromptEnhancer(options.enhancerOptions || {});
    this.panelElement = null;
    this.onSettingsChanged = options.onSettingsChanged || (() => {});
  }

  /**
   * Create and insert the settings panel
   */
  createPanel() {
    const panel = document.createElement("div");
    panel.id = "agent-settings-panel";
    panel.className = "agent-settings-panel";
    
    const settings = this.settingsManager.settings;
    const enhancerSettings = settings.promptEnhancer;

    panel.innerHTML = `
      <div class="settings-header">
        <h2>Agent Alex Settings</h2>
        <button id="settings-close" class="settings-close">×</button>
      </div>

      <div class="settings-content">
        <!-- Prompt Enhancer Section -->
        <section class="settings-section">
          <h3 class="section-title">Prompt Enhancer</h3>
          <p class="section-description">Automatically enhance prompts with PAUL framework compliance</p>
          
          <div class="settings-row">
            <label class="settings-label">
              <input 
                type="checkbox" 
                id="enhancer-enabled" 
                class="settings-checkbox"
                ${enhancerSettings.enabled ? "checked" : ""}
              />
              <span class="checkbox-label">Enable Prompt Enhancer</span>
            </label>
            <span class="setting-hint">Converts prompts into spec-driven, PAUL-compliant format</span>
          </div>

          <div class="settings-row">
            <label class="settings-label">
              <input 
                type="checkbox" 
                id="enhancer-preview" 
                class="settings-checkbox"
                ${enhancerSettings.autoPreview ? "checked" : ""}
              />
              <span class="checkbox-label">Auto-Show Preview</span>
            </label>
            <span class="setting-hint">Automatically display enhancement preview</span>
          </div>

          <div class="settings-row">
            <label class="settings-label" for="enhancer-model">Enhancement Model:</label>
            <select id="enhancer-model" class="settings-select">
              <option value="claude-3-sonnet" ${enhancerSettings.model === "claude-3-sonnet" ? "selected" : ""}>
                Claude 3 Sonnet (Balanced)
              </option>
              <option value="claude-3-opus" ${enhancerSettings.model === "claude-3-opus" ? "selected" : ""}>
                Claude 3 Opus (Advanced)
              </option>
              <option value="claude-3-haiku" ${enhancerSettings.model === "claude-3-haiku" ? "selected" : ""}>
                Claude 3 Haiku (Fast)
              </option>
            </select>
          </div>
        </section>

        <!-- Appearance Section -->
        <section class="settings-section">
          <h3 class="section-title">Appearance</h3>
          
          <div class="settings-row">
            <label class="settings-label" for="theme-select">Theme:</label>
            <select id="theme-select" class="settings-select">
              <option value="auto" ${settings.appearance.theme === "auto" ? "selected" : ""}>Auto</option>
              <option value="light" ${settings.appearance.theme === "light" ? "selected" : ""}>Light</option>
              <option value="dark" ${settings.appearance.theme === "dark" ? "selected" : ""}>Dark</option>
            </select>
          </div>

          <div class="settings-row">
            <label class="settings-label">
              <input 
                type="checkbox" 
                id="compact-mode" 
                class="settings-checkbox"
                ${settings.appearance.compactMode ? "checked" : ""}
              />
              <span class="checkbox-label">Compact Mode</span>
            </label>
            <span class="setting-hint">Reduce spacing and font sizes</span>
          </div>
        </section>

        <!-- Notifications Section -->
        <section class="settings-section">
          <h3 class="section-title">Notifications</h3>
          
          <div class="settings-row">
            <label class="settings-label">
              <input 
                type="checkbox" 
                id="notifications-enabled" 
                class="settings-checkbox"
                ${settings.notifications.enabled ? "checked" : ""}
              />
              <span class="checkbox-label">Enable Notifications</span>
            </label>
          </div>

          <div class="settings-row">
            <label class="settings-label">
              <input 
                type="checkbox" 
                id="notification-sound" 
                class="settings-checkbox"
                ${settings.notifications.sound ? "checked" : ""}
              />
              <span class="checkbox-label">Notification Sound</span>
            </label>
          </div>
        </section>

        <!-- Actions Section -->
        <section class="settings-section">
          <h3 class="section-title">Actions</h3>
          
          <div class="settings-actions">
            <button id="settings-export" class="settings-button secondary">
              Export Settings
            </button>
            <button id="settings-reset" class="settings-button secondary">
              Reset to Defaults
            </button>
          </div>
        </section>
      </div>

      <div class="settings-footer">
        <button id="settings-save" class="settings-button primary">Save Settings</button>
      </div>
    `;

    this.panelElement = panel;
    this.attachEventListeners();
    return panel;
  }

  /**
   * Attach event listeners to settings controls
   */
  attachEventListeners() {
    // Enhancer settings
    const enhancerEnabled = this.panelElement.querySelector("#enhancer-enabled");
    if (enhancerEnabled) {
      enhancerEnabled.addEventListener("change", (e) => {
        this.settingsManager.set("promptEnhancer.enabled", e.target.checked);
        this.promptEnhancer.toggle(e.target.checked);
      });
    }

    const enhancerPreview = this.panelElement.querySelector("#enhancer-preview");
    if (enhancerPreview) {
      enhancerPreview.addEventListener("change", (e) => {
        this.settingsManager.set("promptEnhancer.autoPreview", e.target.checked);
      });
    }

    const enhancerModel = this.panelElement.querySelector("#enhancer-model");
    if (enhancerModel) {
      enhancerModel.addEventListener("change", (e) => {
        this.settingsManager.set("promptEnhancer.model", e.target.value);
        this.promptEnhancer.updateSettings({ model: e.target.value });
      });
    }

    // Appearance settings
    const themeSelect = this.panelElement.querySelector("#theme-select");
    if (themeSelect) {
      themeSelect.addEventListener("change", (e) => {
        this.settingsManager.set("appearance.theme", e.target.value);
      });
    }

    const compactMode = this.panelElement.querySelector("#compact-mode");
    if (compactMode) {
      compactMode.addEventListener("change", (e) => {
        this.settingsManager.set("appearance.compactMode", e.target.checked);
      });
    }

    // Notification settings
    const notificationsEnabled = this.panelElement.querySelector("#notifications-enabled");
    if (notificationsEnabled) {
      notificationsEnabled.addEventListener("change", (e) => {
        this.settingsManager.set("notifications.enabled", e.target.checked);
      });
    }

    const notificationSound = this.panelElement.querySelector("#notification-sound");
    if (notificationSound) {
      notificationSound.addEventListener("change", (e) => {
        this.settingsManager.set("notifications.sound", e.target.checked);
      });
    }

    // Action buttons
    const closeBtn = this.panelElement.querySelector("#settings-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    const saveBtn = this.panelElement.querySelector("#settings-save");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => this.save());
    }

    const resetBtn = this.panelElement.querySelector("#settings-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.reset());
    }

    const exportBtn = this.panelElement.querySelector("#settings-export");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => this.export());
    }
  }

  /**
   * Show the settings panel
   */
  show() {
    if (!this.panelElement) {
      this.createPanel();
    }
    
    document.body.appendChild(this.panelElement);
    this.panelElement.classList.add("visible");
  }

  /**
   * Hide the settings panel
   */
  close() {
    if (this.panelElement) {
      this.panelElement.classList.remove("visible");
      setTimeout(() => {
        if (this.panelElement?.parentNode) {
          this.panelElement.parentNode.removeChild(this.panelElement);
        }
      }, 300);
    }
  }

  /**
   * Save settings
   */
  save() {
    this.settingsManager.saveSettings();
    this.onSettingsChanged?.(this.settingsManager.settings);
    console.log("[v0] Settings saved");
  }

  /**
   * Reset to defaults
   */
  reset() {
    if (confirm("Reset all settings to defaults?")) {
      this.settingsManager.reset();
      this.close();
      console.log("[v0] Settings reset to defaults");
    }
  }

  /**
   * Export settings
   */
  export() {
    const exported = this.settingsManager.export();
    const blob = new Blob([exported], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "agent-alex-settings.json";
    a.click();
    URL.revokeObjectURL(url);
  }
}

/**
 * Open settings panel
 */
export function openSettingsPanel(options = {}) {
  const panel = new SettingsPanelUI(options);
  panel.show();
  return panel;
}
