# Agent Profiles System

## Overview

The Agent Profiles System enables flexible management of multiple AI agents with distinct identities, capabilities, system prompts, and UI customizations. This architecture supports:

- **Multiple Agents**: Define distinct agent personalities and capabilities
- **Custom System Prompts**: Each agent has specialized instructions for their domain
- **Avatar Management**: Visual representation tied to agent identity
- **Branding & UI**: Agent-specific theming and interface customization
- **Extensibility**: Add new agents by creating new profile configurations
- **LLM Council Integration**: Multi-agent collaboration and decision-making
- **Viewing Room**: Centralized monitoring and coordination

## Agent Architecture

### Core Components

1. **Avatar Registry** (`avatar-config.js`)
   - Centralized configuration for all agent avatars
   - Defines visual assets (helmet icons, astronaut graphics)
   - Manages branding colors and themes
   - Maps system prompt paths to agents

2. **Agent Configuration** (`agents/*.yaml`)
   - Persistent agent profile definitions
   - Capability declarations
   - LLM Council role and settings
   - Viewing Room access configuration
   - Behavior parameters

3. **System Prompts** (`prompts/agent-*-system.md`)
   - Agent-specific instructions and personality
   - Domain expertise and capabilities
   - Operational constraints and guidelines
   - Integration points with Synthia OS

4. **Extensions** (`ext/*.js`)
   - Modular capability extensions
   - LLM Council participation logic
   - Viewing Room access controls
   - Dynamic context injection

## Existing Agents

### Agent 1: Space Agent (Default)

**Avatar**: Space-themed astronaut and helmet graphics
**Purpose**: General-purpose browser automation and task execution
**System Prompt**: `/mod/_core/onscreen_agent/prompts/system-prompt.md`
**Status**: Default agent, active

#### Capabilities
- Browser runtime operation
- Task execution and automation
- Framework interaction
- Widget management
- File system operations
- Space API access

### Agent 2: Agent Alex - Kupuri Media Orchestrator

**Avatar**: Synthia-themed blue design aesthetic
**Purpose**: Automated media company orchestration for Kupuri Media
**Owner**: Ivette Milo
**System Prompt**: `/mod/_core/onscreen_agent/prompts/agent-alex-kupuri-system.md`
**Status**: Active, production-ready

#### Capabilities
- **Content Generation**: AI-powered media creation across formats
- **Media Publishing**: Multi-channel distribution orchestration
- **Content Calendar**: Intelligent scheduling and planning
- **Analytics**: Performance tracking and insights
- **Synthia OS Integration**: Native operating system control
- **LLM Council**: Active orchestrator role
- **Viewing Room**: Full access with monitoring and coordination

#### Configuration
```yaml
# Located at: app/L0/_all/mod/_core/onscreen_agent/agents/alex-kupuri.yaml
owner: "Ivette Milo"
company: "Kupuri Media"
operating_system: "Synthia OS"
llm_council.enabled: true
llm_council.role: "orchestrator"
viewing_room.enabled: true
viewing_room.role: "monitor"
```

## Creating New Agents

### Step 1: Define Avatar Configuration

Add entry to `AVATAR_REGISTRY` in `avatar-config.js`:

```javascript
'my-agent': {
  id: 'my-agent',
  name: 'My Custom Agent',
  description: 'Description of agent purpose',
  helmets: '/mod/_core/visual/res/chat/my-agent/helmet_256.webp',
  astronaut: '/mod/_core/visual/res/chat/my-agent/astronaut.webp',
  adminHelmet: '/mod/_core/visual/res/chat/admin/my-agent/helmet_256.webp',
  adminAstronaut: '/mod/_core/visual/res/chat/admin/my-agent/astronaut.webp',
  branding: {
    primaryColor: '#your-color',
    accentColor: '#accent-color',
    secondaryColor: '#secondary',
    theme: 'your-theme'
  },
  systemPromptPath: '/mod/_core/onscreen_agent/prompts/agent-my-system.md',
  config: {
    owner: 'Owner Name',
    company: 'Company Name',
    role: 'Agent Role'
  }
}
```

### Step 2: Create System Prompt

Create `agent-my-system.md` in `/mod/_core/onscreen_agent/prompts/`:

```markdown
# Agent My - System Prompt

## Identity & Purpose
You are Agent My, specialized for [domain].

## Core Capabilities
- Capability 1
- Capability 2
- Capability 3

## Operational Constraints
...

## Example Interactions
...
```

### Step 3: Create Configuration File

Create `agent-my.yaml` in `/mod/_core/onscreen_agent/agents/`:

```yaml
agent_id: my-agent
agent_name: "Agent My"
agent_avatar: my-agent
owner: "Owner Name"
capabilities:
  - capability1
  - capability2
model: "anthropic/claude-sonnet-4.6"
system_prompt_path: "/mod/_core/onscreen_agent/prompts/agent-my-system.md"
```

### Step 4: Prepare Avatar Assets

Place avatar images in:
- `/mod/_core/visual/res/chat/my-agent/helmet_no_bg_256.webp`
- `/mod/_core/visual/res/chat/my-agent/astronaut_no_bg.webp`
- `/mod/_core/visual/res/chat/admin/my-agent/helmet_no_bg_256.webp`
- `/mod/_core/visual/res/chat/admin/my-agent/astronaut_no_bg.webp`

### Step 5: Activate Agent

In runtime initialization, set:
```javascript
window.__ONSCREEN_AGENT_AVATAR_ID = 'my-agent';
window.__ADMIN_AGENT_AVATAR_ID = 'my-agent'; // if using in admin
```

Or in configuration file:
```yaml
avatar_id: my-agent
```

## LLM Council Integration

Agents can be members of the LLM Council for multi-agent collaboration:

```yaml
llm_council:
  enabled: true
  role: "orchestrator"  # or "specialist", "coordinator", "observer"
  participation_mode: "active"
  consultation_expertise:
    - domain1
    - domain2
```

### Council Roles

- **Orchestrator**: Coordinates across domains, implements council decisions
- **Specialist**: Deep expertise in specific domain
- **Coordinator**: Helps synthesize multi-domain decisions
- **Observer**: Provides input without decision authority

## Viewing Room Access

Agents can monitor real-time operations through the Viewing Room:

```yaml
viewing_room:
  enabled: true
  access_level: "full"
  role: "monitor"
  contribution_enabled: true
  can_alert: true
  can_coordinate: true
```

## Usage Patterns

### Switching Between Agents

```javascript
import { getAvatarConfig } from "/mod/_core/visual/avatar-config.js";

// Get specific agent config
const alexConfig = getAvatarConfig('alex');

// List all available agents
import { listAvatarIds } from "/mod/_core/visual/avatar-config.js";
const agents = listAvatarIds(); // ['space-agent', 'alex']

// Check if agent exists
import { hasAvatar } from "/mod/_core/visual/avatar-config.js";
if (hasAvatar('my-custom-agent')) { ... }
```

### Getting System Prompt Path

```javascript
import { getAvatarSystemPromptPath } from "/mod/_core/visual/avatar-config.js";

const promptPath = getAvatarSystemPromptPath('alex');
// Returns: '/mod/_core/onscreen_agent/prompts/agent-alex-kupuri-system.md'
```

## Best Practices

1. **Isolation**: Each agent's system prompt should be self-contained
2. **Consistency**: Use similar formatting across agent definitions
3. **Documentation**: Document agent capabilities clearly
4. **Naming**: Use descriptive names for agent IDs (lowercase, hyphens)
5. **Assets**: Provide high-quality avatar graphics in consistent formats
6. **Testing**: Test agent switching and context injection
7. **Versioning**: Track agent configuration changes in version control

## File Structure

```
app/L0/_all/mod/_core/
├── visual/
│   ├── avatar-config.js (avatar registry)
│   └── res/chat/
│       ├── alex/ (Agent Alex assets)
│       ├── my-agent/ (Custom agent assets)
│       └── admin/
├── onscreen_agent/
│   ├── agents/
│   │   ├── AGENTS.md (this documentation)
│   │   ├── alex-kupuri.yaml (Agent Alex config)
│   │   └── agent-my.yaml (Custom agent config)
│   ├── prompts/
│   │   ├── system-prompt.md (Space Agent)
│   │   ├── agent-alex-kupuri-system.md (Agent Alex)
│   │   └── agent-my-system.md (Custom agent)
│   ├── ext/
│   │   ├── llm-council.js
│   │   └── viewing-room-access.js
│   ├── view.js (uses avatar registry)
│   └── llm.js (loads system prompts)
└── admin/views/agent/
    └── view.js (uses avatar registry)
```

## Future Enhancements

- Per-agent skill loading and capabilities
- Dynamic agent switching in UI
- Agent collaboration workflows
- Custom branding themes per agent
- Agent-specific command palettes
- Multi-agent dialogue rendering
- Council decision logging and replay
