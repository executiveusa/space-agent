# Agent Alex & Avatar System - Quick Reference

## Quick Start: Using Agent Alex

### Enable Agent Alex Now
```javascript
// In browser console or initialization code
window.__ONSCREEN_AGENT_AVATAR_ID = 'alex';

// Agent Alex is now active with:
// ✓ Synthia-themed blue avatar
// ✓ Kupuri Media system prompt
// ✓ LLM Council orchestrator role
// ✓ Viewing Room monitor access
// ✓ Full media automation capabilities
```

### Switch Back to Space Agent
```javascript
window.__ONSCREEN_AGENT_AVATAR_ID = 'space-agent';
```

---

## What Agent Alex Can Do

### Content Orchestration
- Generate multi-format content (blog, social, email, video scripts)
- Publish to 10+ platforms automatically
- Optimize timing for maximum engagement
- Adapt content for each platform's specifications

### Analytics & Insights
- Real-time engagement tracking
- Performance reporting
- Trend analysis and recommendations
- ROI tracking and attribution

### Team Collaboration
- **LLM Council**: Consult with specialist agents on strategic decisions
- **Viewing Room**: Monitor all operations in real-time
- **Decision Making**: Escalate major choices to council consensus

### Synthia OS Integration
- Native system-level automation
- Distributed computing for batch processing
- Secure credential management
- Integrated monitoring and alerting

---

## Key Files to Know

### Configuration Files
- **Avatar System**: `/app/L0/_all/mod/_core/visual/avatar-config.js`
- **Agent Alex Config**: `/app/L0/_all/mod/_core/onscreen_agent/agents/alex-kupuri.yaml`
- **System Prompt**: `/app/L0/_all/mod/_core/onscreen_agent/prompts/agent-alex-kupuri-system.md`

### Documentation
- **Agent Profiles Guide**: `/app/L0/_all/mod/_core/onscreen_agent/agents/AGENTS.md`
- **Agent Alex Full Report**: `/app/L0/_all/mod/_core/documentation/docs/agents/agent-alex-capabilities.md`
- **Implementation Summary**: `/IMPLEMENTATION_SUMMARY.md`

### UI Components
- **Onscreen Agent View**: `/app/L0/_all/mod/_core/onscreen_agent/view.js`
- **Admin Agent View**: `/app/L0/_all/mod/_core/admin/views/agent/view.js`

---

## Agent Alex Capabilities at a Glance

| Capability | Details |
|------------|---------|
| **Content Generation** | Blog articles, social posts, emails, video scripts, documentation |
| **Multi-Channel Publishing** | Twitter/X, LinkedIn, Facebook, Instagram, TikTok, YouTube, Substack, Medium, email |
| **Content Calendar** | Strategic planning, scheduling, batch publishing, conflict detection |
| **Analytics** | Real-time metrics, performance reports, trend analysis, ROI tracking |
| **Synthia OS** | Native system integration, distributed processing, credential vault |
| **LLM Council** | Collaborate with specialist agents, escalate strategic decisions |
| **Viewing Room** | Real-time monitoring, anomaly detection, cross-agent coordination |

---

## LLM Council Role

Agent Alex serves as **Orchestrator** in the LLM Council:

```
When making decisions:
  Routine content operations → Autonomous (fast decision)
  Strategic direction shift → Consult Council (thoughtful, collaborative)
  Emergency/crisis response → Rapid Council assembly (time-critical)

Example workflow:
  1. "Should we pivot toward video content?"
  2. Consult: Analytics Agent, Design Agent, Legal Agent
  3. Synthesize: Recommendations + data + constraints
  4. Decide: Implement approved strategy
  5. Monitor: Track results in Viewing Room
```

---

## Viewing Room Access

Agent Alex has full access to real-time monitoring:

- **Monitor**: View all live engagement metrics
- **Alert**: Flag issues and opportunities
- **Coordinate**: Work with other monitoring agents
- **Optimize**: Use data to improve operations

Typical flow:
```
6:00 AM  → Review overnight metrics in Viewing Room
7:00 AM  → Identify 30% engagement spike in video content
8:00 AM  → Shift production toward more video content
12:00 PM → Monitor performance of new content type
6:00 PM  → Report on success; adjust next day's plan
```

---

## Creating a Custom Agent (Advanced)

### 5 Steps

1. **Add to Avatar Registry**
```javascript
// In avatar-config.js
'my-agent': {
  id: 'my-agent',
  name: 'My Custom Agent',
  helmets: '/mod/_core/visual/res/chat/my-agent/helmet_256.webp',
  astronaut: '/mod/_core/visual/res/chat/my-agent/astronaut.webp',
  // ... branding, config, etc.
}
```

2. **Create System Prompt**
   - File: `/prompts/agent-my-system.md`
   - Content: Agent identity, capabilities, constraints

3. **Create Configuration**
   - File: `/agents/agent-my.yaml`
   - Content: Model settings, capabilities, council role, etc.

4. **Add Avatar Assets**
   - Place images: `/res/chat/my-agent/helmet_256.webp`, etc.
   - Format: WebP, 256x256 for helmets

5. **Activate**
```javascript
window.__ONSCREEN_AGENT_AVATAR_ID = 'my-agent';
```

---

## Troubleshooting

### Agent Avatar Not Changing?
```javascript
// Check current avatar
console.log(window.__ONSCREEN_AGENT_AVATAR_ID);

// Verify avatar exists
import { hasAvatar } from "/mod/_core/visual/avatar-config.js";
console.log(hasAvatar('alex')); // Should be true

// Set avatar
window.__ONSCREEN_AGENT_AVATAR_ID = 'alex';
```

### Agent System Prompt Not Loading?
```javascript
// Check avatar config
import { getAvatarConfig } from "/mod/_core/visual/avatar-config.js";
const config = getAvatarConfig('alex');
console.log(config.systemPromptPath);
// Should be: /mod/_core/onscreen_agent/prompts/agent-alex-kupuri-system.md
```

### LLM Council Not Working?
- Check `alex-kupuri.yaml` - `llm_council.enabled` should be `true`
- Verify system prompt loaded correctly
- Check browser console for errors

### Viewing Room Access Issues?
- Check `alex-kupuri.yaml` - `viewing_room.enabled` should be `true`
- Verify config has `role: monitor` and `contribution_enabled: true`
- Check that other council members or monitoring agents are active

---

## Integration Points

### Using Agent Alex in Code

```javascript
// Get agent configuration
import { getAvatarConfig } from "/mod/_core/visual/avatar-config.js";
const alexConfig = getAvatarConfig('alex');

// Access agent metadata
console.log(alexConfig.config.owner);        // "Ivette Milo"
console.log(alexConfig.config.company);      // "Kupuri Media"
console.log(alexConfig.config.operatingSystem); // "Synthia OS"

// Access branding
console.log(alexConfig.branding.primaryColor); // "#2563eb"

// Get system prompt path
import { getAvatarSystemPromptPath } from "/mod/_core/visual/avatar-config.js";
const promptPath = getAvatarSystemPromptPath('alex');
```

### LLM Council Extension

```javascript
// In system prompt building
import buildLlmCouncilSystemPromptSection from "/mod/_core/onscreen_agent/ext/llm-council.js";

const councilSection = buildLlmCouncilSystemPromptSection(agentConfig);
// Returns formatted council context section
```

### Viewing Room Extension

```javascript
// In system prompt building
import buildViewingRoomAccessSection from "/mod/_core/onscreen_agent/ext/viewing-room-access.js";

const viewingRoomSection = buildViewingRoomAccessSection(agentConfig);
// Returns formatted viewing room context section
```

---

## Real-World Examples

### Example 1: Daily Media Operations
```
Agent Alex Schedule:
  6:00 AM  - Review metrics, plan day
  6:30 AM  - Generate 5 social posts
  7:00 AM  - Create blog article
  8:00 AM  - Draft newsletter
  9:00 AM  - Schedule all content across channels
  Noon     - Monitor engagement
  6:00 PM  - Generate performance report
  
Total human effort: 0 hours (fully autonomous)
Content produced: 7+ pieces
Channels covered: 10+
```

### Example 2: Campaign Launch
```
Agent Alex Campaign:
  Day 1  - Create campaign strategy, content variants
  Day 2  - Publish across all channels, set up tracking
  Day 3  - Monitor performance, adjust underperformers
  Day 4  - Pivot successful content, amplify top performers
  Day 5  - Final analysis, ROI calculation
  
Council involvement: Strategy consultation, daily check-ins
Viewing Room: 24/7 real-time monitoring
Result: Coordinated, data-driven campaign execution
```

### Example 3: Strategic Pivot
```
Situation: Video content engagement up 45%
Workflow:
  1. Viewing Room alert detected
  2. Analytics Agent confirms trend validity
  3. Consult LLM Council
  4. Design Agent: "Can support 40% video increase"
  5. Legal Agent: "No compliance issues"
  6. Agent Alex: "Recommend 40% video shift in Q3"
  7. Council approves
  8. Adjust content calendar, increase video production
  9. Monitor results daily
```

---

## Key Takeaways

1. **Agent Alex is Production Ready**: Use immediately for Kupuri Media
2. **LLM Council Collaboration**: Makes better decisions through diverse expertise
3. **Viewing Room Visibility**: Real-time monitoring drives optimization
4. **Extensible Architecture**: Add new agents without modifying core UI
5. **Well Documented**: Full documentation in AGENTS.md and capabilities report

---

## Need More Info?

- **Complete Agent System Guide**: `/app/L0/_all/mod/_core/onscreen_agent/agents/AGENTS.md`
- **Agent Alex Full Capabilities**: `/app/L0/_all/mod/_core/documentation/docs/agents/agent-alex-capabilities.md`
- **Implementation Details**: `/IMPLEMENTATION_SUMMARY.md`
- **Avatar Configuration**: `/app/L0/_all/mod/_core/visual/avatar-config.js` (source + comments)
- **System Prompt**: `/app/L0/_all/mod/_core/onscreen_agent/prompts/agent-alex-kupuri-system.md`

---

**Version**: 1.0  
**Last Updated**: May 2026  
**Status**: Production Ready
