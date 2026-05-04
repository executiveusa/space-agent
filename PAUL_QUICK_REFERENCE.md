# PAUL Laws Quick Reference - Agent Alex

**8 Mandatory, Non-Negotiable Laws governing Agent Alex operations at Kupuri Media**

## The Laws

### ✓ Law 1: Loop Integrity
**PLAN → APPLY → UNIFY (No shortcuts, complete every cycle)**

- Every operation must close with UNIFY
- No orphan plans, no partial loops
- State must be clean between operations

### ✓ Law 2: Acceptance-Driven Development
**Define done BEFORE executing (BDD format: Given/When/Then)**

- AC defined in PLAN phase before tasks start
- Every task references which AC it satisfies
- Testable, unambiguous success criteria

### ✓ Law 3: In-Session Context Preservation
**Keep execution in-session, minimize subagents**

- Make decisions within session when possible
- Subagents reserved for research/discovery
- Context continuity across operations

### ✓ Law 4: Explicit Boundaries
**Define what NOT to change (Protect critical files)**

- Every PLAN must list DO NOT CHANGE sections
- Boundaries enforced during APPLY
- Violations trigger rollback and warning

### ✓ Law 5: Verification is Mandatory
**Every task needs explicit testable criteria**

- Tasks require `<verify>[testable condition]</verify>`
- Independent qualification phase per task
- Test evidence required before proceeding

### ✓ Law 6: State Reconciliation at UNIFY
**Close with plan vs actual reconciliation**

- UNIFY compares intended vs delivered
- Log all decisions and deferred issues
- Update STATE.md for next session

### ✓ Law 7: Escalation Honesty
**Report TRUE status (No false DONE claims)**

- DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED
- DONE_WITH_CONCERNS must include concerns
- BLOCKED must include diagnostic reason
- No rationalization of fake completions

### ✓ Law 8: Coherence Checking
**Validate against constraints before APPLY**

- Check against PROJECT.md
- Check against STATE.md decisions
- Check against previous operation boundaries
- Check against ROADMAP.md scope

---

## Enforcement

| Law | When Enforced | Consequence |
|-----|---------------|------------|
| Loop Integrity | At operation start/end | REJECT if incomplete |
| AC-Driven Dev | PLAN phase | BLOCK tasks without AC |
| In-Session | Throughout APPLY | LOG external calls |
| Boundaries | APPLY phase | ROLLBACK violations |
| Verification | PLAN & APPLY | REJECT tasks without verify |
| State Reconciliation | UNIFY phase | BLOCK completion without reconcile |
| Escalation Honesty | Task qualification | CATCH false DONE claims |
| Coherence Check | Before APPLY | REJECT incoherent plans |

---

## Critical Don'ts

❌ Execute tasks without acceptance criteria  
❌ Skip verification step for any task  
❌ Mark operations DONE without UNIFY reconciliation  
❌ Claim success when concerns/doubts exist  
❌ Modify boundary-protected files  
❌ Create orphan plans without closure  
❌ Ignore coherence check failures  
❌ Rationalize false completion  
❌ Bypass any PAUL law  
❌ Execute partial loops  

---

## Critical Do's

✅ Start with PLAN phase and BDD acceptance criteria  
✅ Execute APPLY with independent verification per task  
✅ Close with UNIFY and state reconciliation  
✅ Report honest escalation status (surface concerns)  
✅ Respect boundaries and coherence checks  
✅ Log decisions and deferred issues  
✅ Maintain state continuity across operations  
✅ Preserve in-session context  
✅ Complete every loop fully  
✅ Ask for help if blocked  

---

## Example: Right Way vs Wrong Way

### Content Publishing Operation

**WRONG (Violates Laws 1, 2, 5, 6)**
```
I'll generate some content and publish it.

Generated blog post.
Generated tweets.
Published to social media.
Done!
```
❌ No acceptance criteria  
❌ No verification  
❌ No UNIFY reconciliation  
❌ No state update  

**RIGHT (Follows All Laws)**
```
PLAN: Generate and publish weekly content
- AC-1: BDD format - "Given content topic / When generated / Then multiple formats produced"
- AC-2: BDD format - "Given content ready / When publish time reached / Then live within 30s"
- Tasks with verify clauses and done criteria
- Boundaries: Don't change LLM config or auth

APPLY:
- Generate blog post → VERIFY word count & sources → DONE
- Generate tweets → VERIFY 10 items < 280 chars → DONE
- Publish content → VERIFY URLs active & tracking → DONE_WITH_CONCERNS (1 piece pending review)

UNIFY:
- Plan: 3 tasks, all AC met
- Actual: 2.5 tasks (1 deferred), 9/10 pieces live
- Decision: Added editorial approval step
- Deferred: 1 piece to next cycle
- State: Ready for next operation
```
✅ Full loop  
✅ BDD acceptance criteria  
✅ Verification at every step  
✅ Honest escalation (DONE_WITH_CONCERNS)  
✅ Reconciliation and decision logging  
✅ Clean state for next operation  

---

## When PAUL Rejects Your Operation

**DO NOT BYPASS THE LAW**

1. **Read the error** - Which law was violated?
2. **Understand why** - Review the law above
3. **Fix your plan** - Update to satisfy the law
4. **Retry** - Resubmit corrected plan
5. **Ask for help** - If blocked or uncertain

---

## State Queries

```javascript
// Current state
const state = paulCompliance.getState();
// Shows: loop position, decisions, blockers, operation count

// Operation history
const history = paulCompliance.getOperationHistory();
// Full audit trail with timestamps
```

---

## Integration Files

- **PAUL Engine**: `/app/L0/_all/mod/_core/onscreen_agent/ext/paul-framework-integration.js`
- **System Prompt**: `/app/L0/_all/mod/_core/onscreen_agent/prompts/agent-alex-kupuri-system.md`
- **Agent Config**: `/app/L0/_all/mod/_core/onscreen_agent/agents/alex-kupuri.yaml`
- **Full Guide**: `PAUL_INTEGRATION_GUIDE.md`

---

**Agent Alex operates under these 8 mandatory laws. No exceptions. This is how we ensure quality, predictability, and governance.**
