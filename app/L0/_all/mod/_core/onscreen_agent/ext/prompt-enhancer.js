/**
 * Prompt Enhancer - Converts user prompts into PAUL-compliant, spec-driven format
 * Integrates with Agent Alex to automatically improve prompt quality
 */

export class PromptEnhancer {
  constructor(options = {}) {
    this.enabled = options.enabled !== false;
    this.model = options.model || "claude-3-sonnet";
    this.autoPreview = options.autoPreview !== false;
    this.onEnhanced = options.onEnhanced || (() => {});
  }

  /**
   * Enhance a user prompt into a PAUL-compliant, spec-driven format
   */
  async enhance(userPrompt) {
    if (!this.enabled || !userPrompt || typeof userPrompt !== "string") {
      return {
        original: userPrompt,
        enhanced: userPrompt,
        wasEnhanced: false
      };
    }

    const enhancementPrompt = this.buildEnhancementPrompt(userPrompt);

    try {
      const enhanced = await this.callEnhancementService(enhancementPrompt);
      
      const result = {
        original: userPrompt,
        enhanced: enhanced.text,
        wasEnhanced: true,
        acceptanceCriteria: enhanced.acceptanceCriteria || [],
        boundaries: enhanced.boundaries || [],
        estimatedComplexity: enhanced.complexity || "medium"
      };

      this.onEnhanced?.(result);
      return result;
    } catch (error) {
      console.error("[v0] Prompt enhancement failed:", error);
      return {
        original: userPrompt,
        enhanced: userPrompt,
        wasEnhanced: false,
        error: error.message
      };
    }
  }

  /**
   * Build the enhancement system prompt
   */
  buildEnhancementPrompt(userPrompt) {
    return `You are an expert prompt engineer specializing in PAUL framework compliance and SEED structured development.

Your task is to enhance the following user prompt into a tighter, spec-driven format that follows:

1. **PAUL Framework**: Plan-Apply-Unify-Loop structure with acceptance criteria
2. **BDD Format**: Given/When/Then testable statements
3. **Clear Boundaries**: Define what NOT to change
4. **Acceptance Criteria**: Measurable, testable outcomes

User Prompt:
"${userPrompt}"

Enhance this prompt by:
1. Clarifying the objective
2. Breaking down into PAUL phases (PLAN, APPLY, UNIFY)
3. Adding BDD-format acceptance criteria
4. Defining boundaries (files/systems to protect)
5. Specifying verification methods
6. Identifying potential risks or blockers
7. Estimating complexity (simple|medium|complex)

Response format (JSON):
{
  "text": "[enhanced prompt with full PAUL structure]",
  "acceptanceCriteria": [
    "Given X / When Y / Then Z",
    "Given A / When B / Then C"
  ],
  "boundaries": ["critical-file-1", "critical-system-1"],
  "complexity": "medium"
}`;
  }

  /**
   * Call the enhancement service (LLM)
   */
  async callEnhancementService(systemPrompt) {
    // Check if space runtime has LLM access
    if (!globalThis.space?.api?.call) {
      throw new Error("LLM service not available");
    }

    try {
      const response = await globalThis.space.api.call("llm", {
        body: {
          messages: [
            {
              role: "system",
              content: systemPrompt
            }
          ],
          model: this.model,
          temperature: 0.3, // Lower temp for consistency
          max_tokens: 1500
        },
        method: "POST"
      });

      if (!response?.content) {
        throw new Error("Invalid LLM response");
      }

      // Parse the JSON response
      const jsonMatch = response.content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Could not extract JSON from LLM response");
      }

      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      throw new Error(`LLM enhancement failed: ${error.message}`);
    }
  }

  /**
   * Create a preview of the enhancement
   */
  createPreview(enhancedResult) {
    return {
      preview: true,
      original: enhancedResult.original,
      enhanced: enhancedResult.enhanced,
      acceptanceCriteria: enhancedResult.acceptanceCriteria || [],
      boundaries: enhancedResult.boundaries || [],
      complexity: enhancedResult.estimatedComplexity || "unknown",
      html: this.generatePreviewHtml(enhancedResult)
    };
  }

  /**
   * Generate HTML preview
   */
  generatePreviewHtml(result) {
    const acHtml = result.acceptanceCriteria
      ?.map(ac => `<li class="preview-ac">${this.escapeHtml(ac)}</li>`)
      .join("") || "<li>No specific criteria defined</li>";

    const boundaryHtml = result.boundaries
      ?.map(b => `<li class="preview-boundary">${this.escapeHtml(b)}</li>`)
      .join("") || "<li>No boundaries defined</li>";

    return `
      <div class="prompt-enhancement-preview">
        <div class="preview-section">
          <h4>Original Prompt</h4>
          <p class="preview-original">${this.escapeHtml(result.original)}</p>
        </div>
        
        <div class="preview-section">
          <h4>Enhanced Prompt</h4>
          <p class="preview-enhanced">${this.escapeHtml(result.enhanced)}</p>
        </div>

        <div class="preview-section">
          <h4>Acceptance Criteria (BDD)</h4>
          <ul class="preview-list">
            ${acHtml}
          </ul>
        </div>

        <div class="preview-section">
          <h4>Boundaries (Protected)</h4>
          <ul class="preview-list">
            ${boundaryHtml}
          </ul>
        </div>

        <div class="preview-section">
          <h4>Estimated Complexity</h4>
          <span class="complexity-badge ${result.estimatedComplexity}">${result.estimatedComplexity}</span>
        </div>
      </div>
    `;
  }

  /**
   * Utility: Escape HTML
   */
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Toggle enhancement on/off
   */
  toggle(enabled) {
    this.enabled = enabled === true;
    return this.enabled;
  }

  /**
   * Get current settings
   */
  getSettings() {
    return {
      enabled: this.enabled,
      model: this.model,
      autoPreview: this.autoPreview
    };
  }

  /**
   * Update settings
   */
  updateSettings(options = {}) {
    if (typeof options.enabled === "boolean") this.enabled = options.enabled;
    if (typeof options.model === "string") this.model = options.model;
    if (typeof options.autoPreview === "boolean") this.autoPreview = options.autoPreview;
    return this.getSettings();
  }
}

/**
 * Singleton instance
 */
let enhancerInstance = null;

export function getPromptEnhancer(options = {}) {
  if (!enhancerInstance) {
    enhancerInstance = new PromptEnhancer(options);
  }
  return enhancerInstance;
}

export function resetPromptEnhancer() {
  enhancerInstance = null;
}
