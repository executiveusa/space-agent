/**
 * Prompt Enhancer UI Component
 * Integrates into chat interface with preview and enhancement options
 */

import { getPromptEnhancer } from "./prompt-enhancer.js";

export class PromptEnhancerUI {
  constructor(options = {}) {
    this.chatContainer = options.chatContainer;
    this.onEnhanced = options.onEnhanced || (() => {});
    this.enhancer = getPromptEnhancer(options.enhancerOptions || {});
    this.previewElement = null;
    this.isShowing = false;
  }

  /**
   * Initialize the enhancer UI in the chat
   */
  initialize() {
    const wrapper = document.getElementById("onscreen-agent-composer");
    if (!wrapper) {
      console.error("[v0] Chat composer not found");
      return;
    }

    this.createEnhancerUI(wrapper);
    this.attachEventListeners();
  }

  /**
   * Create the enhancer UI elements
   */
  createEnhancerUI(wrapper) {
    const container = document.createElement("div");
    container.id = "prompt-enhancer-container";
    container.className = "prompt-enhancer-container";
    container.innerHTML = `
      <div class="enhancer-button-group">
        <button id="enhancer-button" class="enhancer-button" title="Enhance prompt with PAUL framework">
          <span class="enhancer-icon">✨</span>
          <span class="enhancer-label">Enhance</span>
        </button>
        <button id="enhancer-preview-button" class="enhancer-preview-button" title="Show enhancement preview" style="display: none;">
          <span class="preview-icon">👁</span>
        </button>
      </div>
      
      <div id="enhancer-preview" class="enhancer-preview" style="display: none;">
        <!-- Preview content inserted here -->
      </div>
    `;

    // Insert after the composer textarea
    const textarea = wrapper.querySelector("textarea");
    if (textarea) {
      textarea.parentNode.insertBefore(container, textarea.nextSibling);
    } else {
      wrapper.appendChild(container);
    }

    this.previewElement = container.querySelector("#enhancer-preview");
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    const enhancerBtn = document.getElementById("enhancer-button");
    const previewBtn = document.getElementById("enhancer-preview-button");
    const textarea = document.querySelector("#onscreen-agent-composer textarea");

    if (enhancerBtn) {
      enhancerBtn.addEventListener("click", () => this.handleEnhanceClick(textarea));
    }

    if (previewBtn) {
      previewBtn.addEventListener("click", () => this.togglePreview());
    }

    // Show/hide enhancer based on textarea content
    if (textarea) {
      textarea.addEventListener("input", () => this.updateEnhancerState(textarea));
    }
  }

  /**
   * Handle enhance button click
   */
  async handleEnhanceClick(textarea) {
    if (!textarea || !textarea.value.trim()) {
      this.showNotification("Please enter a prompt first");
      return;
    }

    const button = document.getElementById("enhancer-button");
    button.disabled = true;
    button.classList.add("loading");
    button.textContent = "Enhancing...";

    try {
      const result = await this.enhancer.enhance(textarea.value);
      
      if (result.wasEnhanced) {
        textarea.value = result.enhanced;
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
        
        this.currentEnhancement = result;
        this.showPreviewButton();
        this.showNotification("Prompt enhanced successfully", "success");
        this.onEnhanced?.(result);
      } else {
        this.showNotification("Enhancement not needed or failed", "info");
      }
    } catch (error) {
      console.error("[v0] Enhancement error:", error);
      this.showNotification(`Enhancement failed: ${error.message}`, "error");
    } finally {
      button.disabled = false;
      button.classList.remove("loading");
      button.innerHTML = '<span class="enhancer-icon">✨</span><span class="enhancer-label">Enhance</span>';
    }
  }

  /**
   * Show the preview button
   */
  showPreviewButton() {
    const previewBtn = document.getElementById("enhancer-preview-button");
    if (previewBtn) {
      previewBtn.style.display = "inline-block";
    }
  }

  /**
   * Toggle preview visibility
   */
  togglePreview() {
    if (!this.currentEnhancement) {
      return;
    }

    this.isShowing = !this.isShowing;
    
    if (this.isShowing) {
      this.showPreview();
    } else {
      this.hidePreview();
    }
  }

  /**
   * Show preview
   */
  showPreview() {
    if (!this.previewElement || !this.currentEnhancement) {
      return;
    }

    const preview = this.enhancer.createPreview(this.currentEnhancement);
    this.previewElement.innerHTML = preview.html;
    this.previewElement.style.display = "block";
  }

  /**
   * Hide preview
   */
  hidePreview() {
    if (this.previewElement) {
      this.previewElement.style.display = "none";
    }
  }

  /**
   * Update enhancer state based on textarea content
   */
  updateEnhancerState(textarea) {
    const hasContent = textarea && textarea.value.trim().length > 20;
    const button = document.getElementById("enhancer-button");
    
    if (button) {
      button.style.opacity = hasContent ? "1" : "0.5";
      button.disabled = !hasContent;
    }
  }

  /**
   * Show notification toast
   */
  showNotification(message, type = "info") {
    // Use existing toast system if available
    if (globalThis.space?.visual?.showToast) {
      globalThis.space.visual.showToast(message, { type });
      return;
    }

    // Fallback: console message
    console.log(`[${type.toUpperCase()}] ${message}`);
  }

  /**
   * Enable/disable enhancer
   */
  setEnabled(enabled) {
    this.enhancer.toggle(enabled);
    const button = document.getElementById("enhancer-button");
    if (button) {
      button.style.display = enabled ? "inline-block" : "none";
    }
  }

  /**
   * Get current state
   */
  getState() {
    return {
      enabled: this.enhancer.enabled,
      hasPreview: !!this.currentEnhancement,
      previewShowing: this.isShowing
    };
  }
}

/**
 * Initialize enhancer UI when chat loads
 */
export async function initializePromptEnhancerUI(options = {}) {
  const enhancerUI = new PromptEnhancerUI(options);
  
  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      enhancerUI.initialize();
    });
  } else {
    enhancerUI.initialize();
  }

  return enhancerUI;
}
