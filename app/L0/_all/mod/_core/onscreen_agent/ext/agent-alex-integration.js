/**
 * Agent Alex Integration Module
 * Initializes all systems: PAUL Framework, Skills, Prompt Enhancer, Settings
 */

import { initializePromptEnhancerUI } from "./prompt-enhancer-ui.js";
import { getSettingsManager } from "./settings-manager.js";
import { openSettingsPanel } from "./settings-panel-ui.js";
import { getPromptEnhancer } from "./prompt-enhancer.js";
import { initSkillsBoardView } from "../admin/views/skills-board/view.js";

export class AgentAlexIntegration {
  constructor(options = {}) {
    this.options = options;
    this.settingsManager = getSettingsManager();
    this.promptEnhancer = getPromptEnhancer();
    this.enhancerUI = null;
    this.initialized = false;
  }

  /**
   * Initialize all Agent Alex systems
   */
  async initialize() {
    if (this.initialized) {
      return this;
    }

    console.log("[v0] Initializing Agent Alex systems...");

    try {
      // Load settings
      const settings = this.settingsManager.loadSettings();
      console.log("[v0] Settings loaded:", settings);

      // Initialize Prompt Enhancer
      await this.initializePromptEnhancer(settings);

      // Initialize UI components
      await this.initializeUI();

      // Add settings button to chat
      this.addSettingsButton();

      // Subscribe to settings changes
      this.subscribeToSettingsChanges();

      this.initialized = true;
      console.log("[v0] Agent Alex initialized successfully");
      
      return this;
    } catch (error) {
      console.error("[v0] Failed to initialize Agent Alex:", error);
      throw error;
    }
  }

  /**
   * Initialize Prompt Enhancer
   */
  async initializePromptEnhancer(settings) {
    const enhancerSettings = settings.promptEnhancer || {};
    
    this.promptEnhancer.updateSettings({
      enabled: enhancerSettings.enabled !== false,
      model: enhancerSettings.model || "claude-3-sonnet",
      autoPreview: enhancerSettings.autoPreview === true
    });

    console.log("[v0] Prompt Enhancer initialized with settings:", this.promptEnhancer.getSettings());
  }

  /**
   * Initialize UI components
   */
  async initializeUI() {
    try {
      // Initialize Prompt Enhancer UI
      this.enhancerUI = await initializePromptEnhancerUI({
        enhancerOptions: {
          enabled: this.settingsManager.get("promptEnhancer.enabled", true),
          model: this.settingsManager.get("promptEnhancer.model", "claude-3-sonnet")
        },
        onEnhanced: (result) => this.onPromptEnhanced(result)
      });

      console.log("[v0] Prompt Enhancer UI initialized");
    } catch (error) {
      console.warn("[v0] Failed to initialize Prompt Enhancer UI:", error);
    }
  }

  /**
   * Add settings button to chat header
   */
  addSettingsButton() {
    try {
      // Look for chat header or toolbar
      const header = document.querySelector(".onscreen-agent-header") ||
                     document.querySelector(".agent-toolbar") ||
                     document.querySelector("[class*='toolbar']");

      if (!header) {
        console.warn("[v0] Could not find chat header for settings button");
        return;
      }

      // Check if button already exists
      if (document.getElementById("agent-settings-button")) {
        return;
      }

      const settingsBtn = document.createElement("button");
      settingsBtn.id = "agent-settings-button";
      settingsBtn.className = "agent-settings-button";
      settingsBtn.title = "Agent Alex Settings";
      settingsBtn.innerHTML = "⚙️";
      settingsBtn.style.cssText = `
        padding: 0.5rem 0.75rem;
        margin: 0 0.25rem;
        background: none;
        border: 1px solid var(--border, #d1d5db);
        border-radius: 0.375rem;
        cursor: pointer;
        font-size: 1.2rem;
        transition: all 0.2s ease;
      `;

      settingsBtn.addEventListener("mouseenter", () => {
        settingsBtn.style.backgroundColor = "var(--background, #f3f4f6)";
      });
      settingsBtn.addEventListener("mouseleave", () => {
        settingsBtn.style.backgroundColor = "transparent";
      });

      settingsBtn.addEventListener("click", () => {
        openSettingsPanel({
          settingsOptions: {},
          enhancerOptions: {},
          onSettingsChanged: (settings) => this.onSettingsChanged(settings)
        });
      });

      header.appendChild(settingsBtn);
      console.log("[v0] Settings button added to chat");
    } catch (error) {
      console.warn("[v0] Failed to add settings button:", error);
    }
  }

  /**
   * Subscribe to settings changes
   */
  subscribeToSettingsChanges() {
    this.settingsManager.subscribe(({ event, data }) => {
      if (event === "settings-changed") {
        this.onSettingsChanged(data);
      }
    });
  }

  /**
   * Handle settings changes
   */
  onSettingsChanged(settings) {
    if (settings?.promptEnhancer) {
      this.promptEnhancer.updateSettings({
        enabled: settings.promptEnhancer.enabled,
        model: settings.promptEnhancer.model,
        autoPreview: settings.promptEnhancer.autoPreview
      });

      if (this.enhancerUI) {
        this.enhancerUI.setEnabled(settings.promptEnhancer.enabled);
      }
    }

    console.log("[v0] Settings updated");
  }

  /**
   * Handle prompt enhancement
   */
  onPromptEnhanced(result) {
    console.log("[v0] Prompt enhanced:", result);
    
    // Could trigger additional actions here
    // e.g., log analytics, update state, etc.
  }

  /**
   * Open Skills Board
   */
  async openSkillsBoard() {
    try {
      const container = document.createElement("div");
      container.id = "skills-board-modal";
      document.body.appendChild(container);

      window.__SKILLS_BOARD_CONTAINER = container;
      await initSkillsBoardView();
    } catch (error) {
      console.error("[v0] Failed to open Skills Board:", error);
    }
  }

  /**
   * Get current state
   */
  getState() {
    return {
      initialized: this.initialized,
      settingsManager: this.settingsManager.getSettings?.(),
      promptEnhancer: this.promptEnhancer.getSettings?.(),
      enhancerUI: this.enhancerUI?.getState?.()
    };
  }

  /**
   * Destroy/cleanup
   */
  destroy() {
    if (this.enhancerUI) {
      // Cleanup enhancer UI if needed
    }
    
    // Remove event listeners
    const settingsBtn = document.getElementById("agent-settings-button");
    if (settingsBtn) {
      settingsBtn.remove();
    }

    this.initialized = false;
    console.log("[v0] Agent Alex cleaned up");
  }
}

/**
 * Singleton instance
 */
let agentIntegration = null;

export function getAgentAlexIntegration(options = {}) {
  if (!agentIntegration) {
    agentIntegration = new AgentAlexIntegration(options);
  }
  return agentIntegration;
}

export async function initializeAgentAlex(options = {}) {
  const integration = getAgentAlexIntegration(options);
  return await integration.initialize();
}

export function getAgentAlexState() {
  if (agentIntegration) {
    return agentIntegration.getState();
  }
  return null;
}

export function destroyAgentAlex() {
  if (agentIntegration) {
    agentIntegration.destroy();
    agentIntegration = null;
  }
}

// Auto-initialize on page load if in browser
if (typeof window !== "undefined" && typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      // Only initialize if not already initialized
      if (!window.__AGENT_ALEX_INITIALIZED) {
        window.__AGENT_ALEX_INITIALIZED = true;
        await initializeAgentAlex();
      }
    } catch (error) {
      console.warn("[v0] Optional Agent Alex initialization skipped:", error.message);
    }
  });
}
