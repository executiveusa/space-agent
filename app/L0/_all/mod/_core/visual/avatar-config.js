/**
 * Avatar Configuration Registry
 * 
 * Centralized system for managing multiple agent avatars with support for:
 * - Different avatar profiles (helmets, astronauts, animations)
 * - Agent-specific branding and UI customizations
 * - Runtime avatar switching without redeploying UI components
 * - Custom system prompts per avatar
 * 
 * New avatars can be added by extending AVATAR_REGISTRY with new profiles.
 */

export const AVATAR_REGISTRY = Object.freeze({
  'space-agent': {
    id: 'space-agent',
    name: 'Space Agent',
    description: 'Default space-themed AI agent',
    helmets: '/mod/_core/visual/res/chat/overlay/helmet_no_bg_256.webp',
    astronaut: '/mod/_core/visual/res/chat/overlay/astronaut_no_bg.webp',
    adminHelmet: '/mod/_core/visual/res/chat/admin/helmet_no_bg_256.webp',
    adminAstronaut: '/mod/_core/visual/res/chat/admin/astronaut_no_bg.webp',
    branding: {
      primaryColor: '#3b82f6',
      accentColor: '#1e40af',
      secondaryColor: '#f3f4f6',
      theme: 'space',
      uiCustomizations: {}
    },
    systemPromptPath: '/mod/_core/onscreen_agent/prompts/system-prompt.md'
  },
  'alex': {
    id: 'alex',
    name: 'Agent Alex - Synthia',
    description: 'AI media orchestration agent for Kupuri Media on Synthia OS',
    helmets: '/mod/_core/visual/res/chat/alex/helmet_no_bg_256.webp',
    astronaut: '/mod/_core/visual/res/chat/alex/astronaut_no_bg.webp',
    adminHelmet: '/mod/_core/visual/res/chat/admin/alex/helmet_no_bg_256.webp',
    adminAstronaut: '/mod/_core/visual/res/chat/admin/alex/astronaut_no_bg.webp',
    branding: {
      primaryColor: '#2563eb',
      accentColor: '#1e40af',
      secondaryColor: '#eff6ff',
      theme: 'kupuri',
      uiCustomizations: {
        bubbleGradient: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
        accentGlow: 'rgba(37, 99, 235, 0.1)'
      }
    },
    systemPromptPath: '/mod/_core/onscreen_agent/prompts/agent-alex-kupuri-system.md',
    config: {
      owner: 'Ivette Milo',
      company: 'Kupuri Media',
      operatingSystem: 'Synthia OS',
      role: 'Media Orchestration Agent',
      councilMode: true,
      viewingRoomAccess: true
    }
  }
});

/**
 * Get avatar configuration by ID
 * @param {string} avatarId - Avatar ID (defaults to 'space-agent')
 * @returns {Object} Avatar configuration object
 */
export function getAvatarConfig(avatarId = 'space-agent') {
  const config = AVATAR_REGISTRY[avatarId];
  return config || AVATAR_REGISTRY['space-agent'];
}

/**
 * List all available avatars
 * @returns {Array} Array of avatar IDs
 */
export function listAvatarIds() {
  return Object.keys(AVATAR_REGISTRY);
}

/**
 * Check if avatar exists
 * @param {string} avatarId - Avatar ID to check
 * @returns {boolean} True if avatar exists
 */
export function hasAvatar(avatarId) {
  return avatarId in AVATAR_REGISTRY;
}

/**
 * Get avatar branding configuration
 * @param {string} avatarId - Avatar ID
 * @returns {Object} Branding configuration
 */
export function getAvatarBranding(avatarId = 'space-agent') {
  const config = getAvatarConfig(avatarId);
  return config?.branding || AVATAR_REGISTRY['space-agent'].branding;
}

/**
 * Get avatar system prompt path
 * @param {string} avatarId - Avatar ID
 * @returns {string} System prompt file path
 */
export function getAvatarSystemPromptPath(avatarId = 'space-agent') {
  const config = getAvatarConfig(avatarId);
  return config?.systemPromptPath || AVATAR_REGISTRY['space-agent'].systemPromptPath;
}
