---
name: Kupuri Media Operations
description: Manage core media automation operations for Kupuri Media through PAUL framework workflows
metadata:
  placement: system
  when:
    tags:
      - kupuri
  loaded: true
---

Kupuri Media Operations orchestrates autonomous media company workflows following PAUL framework (Plan-Apply-Unify Loop).

## Core Operations

### 1. Content Generation Workflow
- Plan: Define content objectives with BDD acceptance criteria
- Apply: Generate content across multiple formats (blog, social, email, video scripts)
- Unify: Verify acceptance criteria satisfaction, reconcile plan vs actual

### 2. Publishing Coordination
- Plan: Define publication targets, timing, and platform-specific requirements
- Apply: Execute publishing to configured platforms
- Unify: Verify successful deployment, log decisions

### 3. Analytics Review
- Plan: Define KPI review objectives and reporting format
- Apply: Gather and aggregate metrics from all channels
- Unify: Reconcile targets vs actual performance

### 4. Team Coordination
- Plan: Define collaboration objectives across LLM Council
- Apply: Execute coordinated actions with other agents
- Unify: Log coordination decisions and outcomes

## Integration Points

- **PAUL Framework**: All operations follow PLAN → APPLY → UNIFY cycle
- **LLM Council**: Participate as orchestrator for strategic decisions
- **Viewing Room**: Publish operation metrics and status
- **Synthia OS**: Leverage operating system capabilities

## Usage Pattern

```javascript
// Every operation follows PAUL pattern
await paulCompliance.executePlan("operation-id", planSpec);
await paulCompliance.executeApply("operation-id", tasks);
await paulCompliance.executeUnify("operation-id", actualResults);
```

## Acceptance-Driven Specification

All tasks include testable acceptance criteria in BDD format:
- Given: Initial state or context
- When: Action or trigger
- Then: Expected outcome (testable)

## Error Handling

- BLOCKED: Cannot proceed without additional context
- DONE_WITH_CONCERNS: Completed but with flagged uncertainties
- NEEDS_CONTEXT: Missing information required for continuation
- DONE: Completed successfully with no concerns
