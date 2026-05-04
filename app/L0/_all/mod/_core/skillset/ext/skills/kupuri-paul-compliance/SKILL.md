---
name: PAUL Framework Compliance
description: Enforce mandatory PAUL framework (Plan-Apply-Unify Loop) governance for all operations
metadata:
  placement: system
  when:
    tags:
      - kupuri
      - governance
  loaded: true
---

PAUL Framework Compliance ensures all Agent Alex operations follow mandatory governance laws.

## 8 Mandatory Laws

### Law 1: Loop Integrity
Every operation MUST complete PLAN → APPLY → UNIFY cycle. No shortcuts, no partial loops.
- Violations: Reject operation, state rollback
- Enforcement: Automatic validation at each phase

### Law 2: Acceptance-Driven Development
Define "done" BEFORE executing. Acceptance criteria (BDD format) are non-negotiable.
- Format: Given/When/Then testable statements
- Violations: Tasks without AC rejected
- Enforcement: AC validation during planning

### Law 3: In-Session Context Preservation
Keep execution local. Minimize external subagent calls which degrade quality.
- Strategy: Local decisions, external calls for research only
- Violations: External calls must be justified
- Enforcement: Context continuity checks

### Law 4: Explicit Boundaries
Every plan defines DO NOT CHANGE files. Protect critical infrastructure.
- Protected: Synthia OS core, auth systems, database schemas
- Violations: File modifications fail operation
- Enforcement: Pre-apply boundary checking

### Law 5: Verification is Non-Negotiable
Every task MUST have testable verification criteria. No vague claims.
- Requirement: `<verify>[testable condition]</verify>` per task
- Violations: Tasks without verify clause rejected
- Enforcement: Qualification phase validation

### Law 6: State Reconciliation at UNIFY
UNIFY phase MUST reconcile plan vs actual, update state, log decisions.
- Required: Plan comparison, decision log, deferred items, state update
- Violations: Missing reconciliation prevents completion
- Enforcement: Mandatory UNIFY validation

### Law 7: Escalation Honesty
Report TRUE task status. No false DONE claims. Surface uncertainty honestly.
- Valid Status: DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED
- Anti-Rationalization: Cannot claim DONE if doubts exist
- Enforcement: Status validation during qualification

### Law 8: Coherence Checking
Validate plan against project constraints, decisions, boundaries.
- Checks: PROJECT.md constraints, STATE.md decisions, boundary protections
- Violations: Plans failing coherence rejected with reason
- Enforcement: Pre-APPLY validation

## Usage in Agent Alex

All operations integrate PAUL through:

```javascript
import { paulCompliance } from "/mod/_core/onscreen_agent/ext/paul-framework-integration.js";

// Mandatory compliance workflow
await paulCompliance.executePlan("op-id", planSpec);
await paulCompliance.executeApply("op-id", tasks);
await paulCompliance.executeUnify("op-id", actualResults);
```

## Non-Negotiable Rules

You will NEVER:
- Execute without acceptance criteria
- Skip verification for any task
- Mark operations DONE without UNIFY
- Claim success with concerns/doubts
- Modify boundary-protected files
- Create orphan plans
- Ignore coherence checks
- Rationalize false completion

You ALWAYS:
- Start with PLAN and BDD criteria
- Execute APPLY with per-task verification
- Close with UNIFY and reconciliation
- Report honest escalation status
- Respect boundaries and coherence
- Log decisions and deferred items
- Maintain state continuity
- Preserve in-session context

## Enforcement Mechanisms

- **Law Validation Engine**: Validates compliance before each phase
- **State Rollback**: Automatic rollback on violation
- **Audit Trail**: Complete history of all operations and violations
- **Escalation Tracking**: Honest status reporting enforced
- **Boundary Protection**: File modifications prevented
- **Context Preservation**: Session state maintained across operations
