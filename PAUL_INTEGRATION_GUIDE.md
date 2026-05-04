# PAUL Framework Integration Guide for Agent Alex

**Plan-Apply-Unify Loop** is now a **MANDATORY LAW** enforced by Kupuri Media's Agent Alex system.

This guide explains how PAUL integration makes Agent Alex a self-governing, structured autonomous agent.

## What is PAUL?

PAUL (Plan-Apply-Unify Loop) is a framework for structured AI development created by Christopher Kahler. It enforces:

1. **Loop Integrity** - Every plan must close with unification
2. **Acceptance-Driven Development** - Define done before starting
3. **In-Session Context** - Minimize subagents, keep work focused
4. **Explicit Boundaries** - Define what NOT to change
5. **Verification Mandatory** - Every task requires testable criteria
6. **State Reconciliation** - Close loops, log decisions
7. **Escalation Honesty** - Report true status
8. **Coherence Checking** - Validate against accumulated decisions

## Why PAUL for Agent Alex?

Agent Alex automates Kupuri Media's operations autonomously. Without structured governance:

- Operations could drift from intended goals
- Decisions wouldn't persist across sessions
- Context would rot as session filled up
- Quality would degrade over time

**PAUL solves this** by enforcing structured execution from first principles:

| Problem | PAUL Solution |
|---------|---------------|
| No closure on operations | Mandatory UNIFY phase |
| Vague success criteria | Acceptance-Driven Development (BDD format) |
| Decision loss | STATE.md maintains decisions log |
| Quality degradation | In-session context preservation |
| State drift | Coherence checking before each operation |
| False completions | Escalation honesty with anti-rationalization |

## Agent Alex PAUL System Architecture

### Files Structure

```
app/L0/_all/mod/_core/onscreen_agent/
├── ext/paul-framework-integration.js      # PAUL enforcement engine
├── prompts/agent-alex-kupuri-system.md    # System prompt with 8 PAUL laws
├── agents/alex-kupuri.yaml                # Agent config with PAUL policies
└── ext/
    ├── llm-council.js                    # Council with PAUL state sharing
    └── viewing-room-access.js            # Viewing room with PAUL audit log
```

### PAUL Enforcement Layer

The `paul-framework-integration.js` module provides:

```javascript
class PAULEnforcer
  ├── validatePlanStructure()      // Check all required fields present
  ├── enforceLoopIntegrity()       // Verify PLAN→APPLY→UNIFY
  ├── validateEscalationStatus()   // Ensure honest status reporting
  ├── reconcileAndUnify()          // Plan vs actual reconciliation
  └── coherenceCheck()             // Validate against accumulated state

class AgentAlexPAULCompliance
  ├── executePlan()                // PLAN phase with validation
  ├── executeApply()               // APPLY phase with E/Q loop
  ├── executeUnify()               // UNIFY phase with reconciliation
  ├── getState()                   // Query current operational state
  └── getOperationHistory()        // Audit trail of all operations
```

## 8 Mandatory Laws (Non-Negotiable)

### Law 1: Loop Integrity
Every operation MUST complete the full cycle: PLAN → APPLY → UNIFY

```javascript
// WRONG - Partial loop
await paulCompliance.executePlan(...);
await paulCompliance.executeApply(...);
// Missing UNIFY! Operation incomplete, state left dirty

// RIGHT - Complete loop
await paulCompliance.executePlan("operation-name", planSpec);
await paulCompliance.executeApply("operation-name", tasks);
await paulCompliance.executeUnify("operation-name", actualResults);
// State clean, decisions logged, ready for next operation
```

**Enforcement**: Missing UNIFY phase will REJECT operation with error.

### Law 2: Acceptance-Driven Development
Define "done" BEFORE executing tasks using BDD format.

```javascript
// WRONG - Vague acceptance criteria
{
  acceptanceCriteria: [
    { id: "AC-1", title: "Content looks good" }
  ]
}

// RIGHT - BDD format (Given/When/Then)
{
  acceptanceCriteria: [
    {
      id: "AC-1",
      title: "Social media content published successfully",
      format: "Given a content calendar entry / When published to all platforms / Then engagement metrics update within 30 seconds"
    }
  ]
}
```

**Enforcement**: Tasks without BDD-format AC are rejected during PLAN phase.

### Law 3: In-Session Context Preservation
Keep execution within session. Reserve subagents for research/discovery only.

```javascript
// WRONG - Spawn subagent for implementation work
const subagent = await spawnSubagent("write-blog-post", ...);
const result = await subagent.generate();
// Quality degradation, token waste, lost context

// RIGHT - In-session execution
const post = await generateContent(...);
// Keep context, higher quality, tokens preserved
```

**Enforcement**: External calls logged and justified in operation history.

### Law 4: Explicit Boundaries
Define what NOT to change. Protect critical systems.

```javascript
{
  plan: {
    tasks: [...],
    boundaries: [
      "app/L0/_all/mod/_core/onscreen_agent/llm.js",  // Core LLM config
      "database/migrations/*",                         // Schema changes
      "synthia-os/**/*.core.js"                        // System files
    ]
  }
}
```

**Enforcement**: Violation of boundaries triggers rollback and state warning.

### Law 5: Verification is Mandatory
Every task requires explicit, testable verification criteria.

```javascript
// WRONG - No verification
{
  tasks: [
    {
      name: "Generate blog post",
      files: ["content/blog/post.md"],
      action: "Write 2000-word article about AI trends",
      done: "AC-1"
      // Missing verify!
    }
  ]
}

// RIGHT - Explicit verification
{
  tasks: [
    {
      name: "Generate blog post",
      files: ["content/blog/post.md"],
      action: "Write 2000-word article about AI trends",
      verify: "Word count 1800-2200, contains 3+ sources, SEO score > 75",
      done: "AC-1"
    }
  ]
}
```

**Enforcement**: Tasks without verify clause rejected during PLAN phase.

### Law 6: State Reconciliation at UNIFY
UNIFY must reconcile plan vs actual, log decisions, update state.

```javascript
// UNIFY reconciliation produces:
{
  planObjective: "Publish weekly content batch",
  actualOutcome: "Published 8 of 10 planned pieces (2 delayed for approval)",
  match: false,  // Plan vs actual differ!
  
  plannedTasks: 10,
  completedTasks: 8,
  
  decisions: [
    "Delayed publication of 2 pieces pending stakeholder review",
    "Increased hashtag coverage based on trending analysis"
  ],
  
  deferred: [
    "2 pieces pushed to next cycle - awaiting approval",
    "Video content generation requires new Synthia plugin"
  ],
  
  state: {
    loopPosition: "PLAN",
    currentPhase: null,
    decisions: [...],
    blockers: [...]
  }
}
```

**Enforcement**: Cannot mark operation complete without UNIFY reconciliation.

### Law 7: Escalation Honesty
Report TRUE status. No false "DONE" claims.

```javascript
// Four escalation statuses:
// DONE - Completed, no concerns
// DONE_WITH_CONCERNS - Completed but flagged doubts
// NEEDS_CONTEXT - Missing information, can't complete
// BLOCKED - Structural impediment, can't proceed

// WRONG - False completion
{
  status: "DONE",  // But we're not 100% confident...
}

// RIGHT - Honest escalation
{
  status: "DONE_WITH_CONCERNS",
  concerns: "Content verification passed 95/100 checks. 5 items need manual review for tone."
}
```

**Enforcement**: Anti-rationalization rules catch false DONE claims.

### Law 8: Coherence Checking
Validate plan against project context before APPLY.

```javascript
// Before APPLY phase, PAUL validates:
✓ Plan against PROJECT.md constraints
✓ Plan against accumulated STATE.md decisions
✓ Plan against boundary restrictions from previous ops
✓ Plan against ROADMAP.md scope

// If validation fails:
COHERENCE CHECK FAILED:
- Plan touches protected files from previous operation: src/auth/*.ts
- Plan conflicts with decision: "No breaking changes to LLM interfaces"
- Fix plan and retry
```

**Enforcement**: Plans failing coherence check rejected before APPLY.

## Using PAUL in Agent Alex Operations

### Step 1: Create a PLAN with BDD Acceptance Criteria

```yaml
phase: kupuri-media-q1
objective: "Generate and publish weekly content batch for AI trends topic"
acceptanceCriteria:
  - id: AC-1
    title: "Content generated in multiple formats"
    format: "Given content topic list / When generation runs / Then produces blog post, 10 tweets, and LinkedIn article"
  
  - id: AC-2
    title: "Content published on schedule"
    format: "Given scheduling rules / When publish time reaches / Then all content appears on channels within 30 seconds"

tasks:
  - name: "Generate blog post"
    files: ["content/blog/ai-trends-week12.md"]
    action: "Write 2000-word blog article about latest AI developments"
    verify: "1800-2200 words, 3+ primary sources, Flesch reading ease > 60"
    done: "AC-1"
  
  - name: "Generate social media content"
    files: ["content/social/week12-tweets.json"]
    action: "Create 10 platform-specific tweets with hashtags and media references"
    verify: "10 tweets generated, each <280 chars, hashtags 5-10 per tweet"
    done: "AC-1"
  
  - name: "Publish to platforms"
    files: []
    action: "Push all content to blog, Twitter, LinkedIn, RSS with optimal timing"
    verify: "All URLs accessible, analytics tracking initialized"
    done: "AC-2"

boundaries:
  - "app/L0/_all/mod/_core/onscreen_agent/llm.js"
  - "database/migrations/*"
  - "synthia-os/core/**"
```

### Step 2: APPLY with Verification

```javascript
const planSpec = { /* from above */ };

// Execute plan
const planResult = await paulCompliance.executePlan(
  "kupuri-q1-content-week12",
  planSpec
);
// Returns: PLAN_APPROVED if valid

// Execute tasks
const applyResult = await paulCompliance.executeApply(
  "kupuri-q1-content-week12",
  planSpec.tasks
);
// For each task:
// - Execute action
// - Run verification
// - Report status (DONE, DONE_WITH_CONCERNS, NEEDS_CONTEXT, BLOCKED)
// - If DONE_WITH_CONCERNS, include concerns
// - If BLOCKED, include diagnostic reason
```

### Step 3: UNIFY with Reconciliation

```javascript
const actualResults = {
  outcome: "Published 9 of 10 pieces, 1 delayed for editorial approval",
  tasks: [
    { name: "Generate blog post", status: "DONE" },
    { name: "Generate social media content", status: "DONE" },
    { name: "Publish to platforms", status: "DONE_WITH_CONCERNS", 
      concerns: "1 piece requires manual editorial sign-off" }
  ],
  satisfiedAC: ["AC-1", "AC-2"],  // What acceptance criteria met?
  decisions: [
    "Implemented new hashtag strategy based on trending analysis",
    "Added human editorial approval step for sensitive topics"
  ],
  deferred: [
    "1 piece pushed to next cycle pending editorial review"
  ],
  summary: "Core operation successful. Content generated and published per schedule with one piece requiring approval."
};

const unifyResult = await paulCompliance.executeUnify(
  "kupuri-q1-content-week12",
  actualResults
);
// Returns: OPERATION_CLOSED with reconciliation
// State updated, decisions logged, ready for next operation
```

### Step 4: Check State Anytime

```javascript
const currentState = paulCompliance.getState();
// Returns:
// {
//   loopPosition: "PLAN",  // Ready for next PLAN
//   decisions: [...],      // All accumulated decisions
//   blockers: [...],       // Any current blockers
//   operationCount: 1,
//   lastOperation: { ... }
// }

const history = paulCompliance.getOperationHistory();
// Full audit trail of all operations with timestamps
```

## Integration with Agent Alex

### Agent Alex Mandatory Behavior

1. **All operations follow PAUL loop** - No exceptions, no shortcuts
2. **Honest status reporting** - Surface concerns, don't hide them
3. **Respect boundaries** - Protected files marked in PLAN
4. **Preserve context** - Keep decisions in STATE
5. **Complete cycles** - Always UNIFY, never leave orphan plans
6. **Log everything** - Decisions, deferred issues, diagnostics

### LLM Council Integration

The LLM Council can query Agent Alex's state:

```javascript
// Other council members can ask:
const agentState = paulCompliance.getState();

// They see:
// - What phase Agent Alex is in
// - What decisions have been made
// - Any current blockers
// - Complete audit trail

// This enables informed consultation
```

### Viewing Room Integration

The Viewing Room shows PAUL operation history:

```javascript
const operations = paulCompliance.getOperationHistory();

// Displays:
// - PLAN phases with objectives and AC
// - APPLY phases with verification results
// - UNIFY reconciliation and decisions
// - State transitions and timeline
```

## Quality Assurance

PAUL ensures quality through:

| Stage | Enforcement |
|-------|------------|
| **PLAN** | Structure validation, AC verification, coherence checking |
| **APPLY** | Independent verification per task, escalation honesty |
| **UNIFY** | Reconciliation against spec, decision logging |

No task advances without verification. No operation completes without reconciliation. No decision is lost.

## What Happens When PAUL Rejects Operation?

If PAUL enforcement blocks an operation:

1. **Read the error message** - Specific law violation explained
2. **Understand the law** - Review the relevant law above
3. **Fix the plan** - Update to satisfy the law
4. **Retry** - Submit corrected plan for re-validation
5. **DO NOT bypass** - PAUL laws are mandatory, not negotiable

Example error:

```
PAUL Law Violation: Cannot UNIFY with incomplete tasks.
8/10 tasks complete. Tasks blocked:
  - "Generate video content" - BLOCKED: Requires new plugin
  - "Publish to TikTok" - NEEDS_CONTEXT: Missing API credentials

Fix the blockers or defer to next cycle, then re-run UNIFY.
```

## Summary

PAUL makes Agent Alex a **structured, self-governing autonomous agent**:

- **Predictable**: Every operation follows same cycle
- **Auditable**: Full decision trail in STATE.md
- **Resilient**: State persists across sessions
- **Quality-assured**: Verification at every stage
- **Transparent**: Council and Viewing Room see complete picture
- **Governance**: 8 mandatory laws prevent drift

**Agent Alex now operates under the PAUL framework as a law-abiding, self-governing agent for Kupuri Media.**

---

## Reference

- **PAUL Source**: https://github.com/ChristopherKahler/paul
- **Agent Alex Config**: `/app/L0/_all/mod/_core/onscreen_agent/agents/alex-kupuri.yaml`
- **PAUL Integration**: `/app/L0/_all/mod/_core/onscreen_agent/ext/paul-framework-integration.js`
- **Agent Alex System Prompt**: `/app/L0/_all/mod/_core/onscreen_agent/prompts/agent-alex-kupuri-system.md`
