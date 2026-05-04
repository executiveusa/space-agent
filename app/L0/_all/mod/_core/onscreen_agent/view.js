import * as execution from "/mod/_core/onscreen_agent/execution.js";
import { formatAttachmentSize } from "/mod/_core/onscreen_agent/attachments.js";
import { createAgentThreadView } from "/mod/_core/visual/conversation/thread-view.js";
import { getAvatarConfig } from "/mod/_core/visual/avatar-config.js";

// Get avatar configuration - can be set dynamically via config or defaulted to space-agent
const avatarConfig = getAvatarConfig(window.__ONSCREEN_AGENT_AVATAR_ID || 'space-agent');

const threadView = createAgentThreadView({
  assistantAvatarPath: avatarConfig.helmets,
  assistantMarkdownClassName: "onscreen-agent-response-markdown",
  autoResizeMaxHeight: 120,
  emptyStateText: "Send a message to start the onscreen agent thread.",
  execution,
  formatAttachmentSize,
  groupConsecutiveAvatars: true,
  renderMarkdownWithMarked: true,
  avatarId: avatarConfig.id
});

export const autoResizeTextarea = threadView.autoResizeTextarea;
export const copyTextToClipboard = threadView.copyTextToClipboard;
export const findExecuteSection = threadView.findExecuteSection;
export const getAssistantMessageCopyText = threadView.getAssistantMessageCopyText;
export const getTerminalInputText = threadView.getTerminalInputText;
export const getTerminalOutputText = threadView.getTerminalOutputText;
export const renderMessages = threadView.renderMessages;
export const summarizeLlmConfig = threadView.summarizeLlmConfig;
export const summarizeSystemPrompt = threadView.summarizeSystemPrompt;
export const updateStreamingAssistantMessage = threadView.updateStreamingAssistantMessage;
export const avatarConfig = avatarConfig;
