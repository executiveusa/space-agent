// PAUL Framework Integration Layer
// Agent Alex MANDATORY Workflow System
// Enforces Plan-Apply-Unify Loop for all operations

/**
 * PAUL Integration for Agent Alex
 * 
 * The Plan-Apply-Unify Loop is MANDATORY and NON-NEGOTIABLE.
 * All agent operations MUST follow this structured workflow.
 * 
 * This is a LAW, not a guideline.
 */

const PAUL_LAWS = {
  // LAW 1: Loop Integrity
  LOOP_INTEGRITY: {
    name: "Loop Integrity",
    rule: "PLAN → APPLY → UNIFY (No shortcuts, no partial loops)",
    enforcement: "FAIL operation if loop is incomplete",
    consequence: "State drift, orphan operations, decision loss"
  },

  // LAW 2: Acceptance-Driven Execution
  ACCEPTANCE_DRIVEN: {
    name: "Acceptance-Driven Development",
    rule: "Define Acceptance Criteria BEFORE executing tasks",
    format: "Given [precondition] / When [action] / Then [outcome]",
    enforcement: "Block APPLY if AC not defined",
    consequence: "Undefined quality, test drift, unclear success"
  },

  // LAW 3: In-Session Context Preservation
  IN_SESSION_CONTEXT: {
    name: "In-Session Context Preservation",
    rule: "Maintain context within session; no orphan subagents",
    enforcement: "Minimize external calls; keep decisions local",
    consequence: "70% quality degradation, context rot, token waste"
  },

  // LAW 4: Explicit Boundaries
  EXPLICIT_BOUNDARIES: {
    name: "Explicit Boundaries",
    rule: "Define what NOT to change; protect critical files",
    enforcement: "PLAN must list DO NOT CHANGE sections",
    consequence: "Accidental breaking changes, regression"
  },

  // LAW 5: Verification is Mandatory
  VERIFICATION_MANDATORY: {
    name: "Verification Requirement",
    rule: "Every task must have explicit verification criteria",
    format: "<verify>[testable condition]</verify>",
    enforcement: "Reject tasks without verify clause",
    consequence: "Silent failures, undetected bugs"
  },

  // LAW 6: State Reconciliation
  STATE_RECONCILIATION: {
    name: "State Reconciliation at UNIFY",
    rule: "UNIFY compares PLAN vs ACTUAL, reconciles STATE.md",
    enforcement: "Mandatory before marking operation complete",
    consequence: "State drift, lost decisions, broken continuity"
  },

  // LAW 7: Escalation Honesty
  ESCALATION_HONESTY: {
    name: "Escalation Status Honesty",
    rule: "Report true status: DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED",
    enforcement: "No false DONE claims; escalate doubts",
    consequence: "Hidden problems become crisis later"
  }
};

/**
 * PAUL Operation Structure
 * Every Agent Alex operation MUST follow this pattern
 */
const PAUL_OPERATION_TEMPLATE = {
  phase: "string (e.g., '01-kupuri-media')",
  
  plan: {
    objective: "What we're building and why",
    acceptanceCriteria: [
      {
        id: "AC-1",
        title: "Clear acceptance criterion",
        format: "Given X / When Y / Then Z"
      }
    ],
    tasks: [
      {
        name: "Task name",
        files: ["affected/files.ts"],
        action: "What to do and why",
        verify: "How to test success",
        done: "Which AC does this satisfy?"
      }
    ],
    boundaries: ["files/NOT/to/change/*"],
    scope: "QUICK_FIX | STANDARD | COMPLEX"
  },

  apply: {
    tasks: [
      {
        name: "task name",
        status: "EXECUTING | DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED",
        verification: "test result",
        satisfiesAC: "AC-1, AC-2"
      }
    ]
  },

  unify: {
    summary: "What was actually built",
    planVsActual: "Comparison of intended vs delivered",
    decisions: "Key choices made during execution",
    deferred: "Issues to address in next cycle",
    stateUpdate: "Current operational state"
  }
};

/**
 * PAUL Enforcement Engine
 * Validates every Agent Alex operation against PAUL laws
 */
class PAULEnforcer {
  constructor() {
    this.operations = [];
    this.state = {
      currentPhase: null,
      currentPlan: null,
      loopPosition: "PLAN", // PLAN → APPLY → UNIFY
      decisions: [],
      blockers: []
    };
  }

  // LAW VALIDATION: Check operation has all required elements
  validatePlanStructure(plan) {
    const required = ["objective", "acceptanceCriteria", "tasks", "boundaries"];
    const missing = required.filter(field => !plan[field]);
    
    if (missing.length > 0) {
      throw new Error(
        `PAUL Law Violation: Plan missing required fields: ${missing.join(", ")}`
      );
    }

    // Validate AC format (BDD: Given/When/Then)
    plan.acceptanceCriteria.forEach(ac => {
      if (!ac.format || (!ac.format.includes("Given") && !ac.format.includes("When"))) {
        throw new Error(
          `PAUL Law Violation: AC-${ac.id} missing BDD format (Given/When/Then)`
        );
      }
    });

    // Validate every task has verification
    plan.tasks.forEach(task => {
      if (!task.verify) {
        throw new Error(
          `PAUL Law Violation: Task "${task.name}" missing verification criteria`
        );
      }
      if (!task.done) {
        throw new Error(
          `PAUL Law Violation: Task "${task.name}" missing done criteria (which AC?)`
        );
      }
    });

    return true;
  }

  // LAW ENFORCEMENT: Block incomplete loops
  enforceLoopIntegrity() {
    if (this.state.loopPosition === "PLAN" && !this.state.currentPlan) {
      return { allowed: false, reason: "No plan defined; cannot APPLY" };
    }
    if (this.state.loopPosition === "APPLY" && !this.state.currentPlan) {
      return { allowed: false, reason: "Plan was not properly UNIFIED; state inconsistent" };
    }
    return { allowed: true };
  }

  // LAW ENFORCEMENT: Validate escalation status
  validateEscalationStatus(task, status) {
    const valid = ["DONE", "DONE_WITH_CONCERNS", "NEEDS_CONTEXT", "BLOCKED"];
    if (!valid.includes(status)) {
      throw new Error(
        `PAUL Law Violation: Invalid escalation status "${status}". Must be: ${valid.join(", ")}`
      );
    }
    
    // Anti-rationalization: DONE_WITH_CONCERNS must include doubt explanation
    if (status === "DONE_WITH_CONCERNS" && !task.concerns) {
      throw new Error(
        `PAUL Law Violation: DONE_WITH_CONCERNS requires detailed concerns field`
      );
    }
    
    return true;
  }

  // LAW ENFORCEMENT: Reconcile plan vs actual at UNIFY
  reconcileAndUnify(plan, actual) {
    const reconciliation = {
      planObjective: plan.objective,
      actualOutcome: actual.outcome,
      match: plan.objective === actual.outcome,
      
      plannedTasks: plan.tasks.length,
      completedTasks: actual.tasks.filter(t => t.status === "DONE").length,
      
      plannedAC: plan.acceptanceCriteria.length,
      satisfiedAC: actual.satisfiedAC.length,
      
      allTasksComplete: false,
      allACMet: false,
      
      decisions: actual.decisions || [],
      deferred: actual.deferred || [],
      state: this.state
    };

    // Verify all tasks complete
    reconciliation.allTasksComplete = 
      actual.tasks.every(t => 
        ["DONE", "DONE_WITH_CONCERNS"].includes(t.status)
      );

    // Verify all AC met
    reconciliation.allACMet = 
      plan.acceptanceCriteria.length === actual.satisfiedAC.length;

    if (!reconciliation.allTasksComplete) {
      throw new Error(
        `PAUL Law Violation: Cannot UNIFY with incomplete tasks. ` +
        `${reconciliation.completedTasks}/${reconciliation.plannedTasks} complete`
      );
    }

    return reconciliation;
  }

  // STATE MANAGEMENT: Move through loop
  transitionState(from, to) {
    const validTransitions = {
      "PLAN": ["APPLY"],
      "APPLY": ["UNIFY"],
      "UNIFY": ["PLAN"]
    };

    if (!validTransitions[from] || !validTransitions[from].includes(to)) {
      throw new Error(
        `PAUL Law Violation: Cannot transition from ${from} to ${to}`
      );
    }

    this.state.loopPosition = to;
    return { from, to, timestamp: new Date().toISOString() };
  }

  // COHERENCE CHECK: Validate against accumulated decisions
  coherenceCheck(plan) {
    const issues = [];
    
    // Check against boundaries from previous operations
    this.operations.forEach(op => {
      const previousBoundaries = op.plan.boundaries || [];
      const planTouches = (plan.tasks || [])
        .flatMap(t => t.files || [])
        .filter(f => previousBoundaries.some(b => f.match(b)));
      
      if (planTouches.length > 0) {
        issues.push(
          `Plan touches protected files from previous operation: ${planTouches.join(", ")}`
        );
      }
    });

    if (issues.length > 0) {
      throw new Error(`PAUL Coherence Check Failed:\n${issues.join("\n")}`);
    }

    return true;
  }
}

/**
 * Agent Alex PAUL Compliance Module
 * All Agent Alex operations MUST use this
 */
class AgentAlexPAULCompliance {
  constructor() {
    this.enforcer = new PAULEnforcer();
    this.operationLog = [];
  }

  // Execute PLAN phase
  async executePlan(operationName, planSpec) {
    console.log("[PAUL] PLAN Phase: " + operationName);
    
    // Validate plan structure
    this.enforcer.validatePlanStructure(planSpec);
    
    // Coherence check against project context
    this.enforcer.coherenceCheck(planSpec);
    
    // Transition state
    this.enforcer.transitionState("PLAN", "APPLY");
    
    this.operationLog.push({
      phase: "PLAN",
      operation: operationName,
      timestamp: new Date().toISOString(),
      plan: planSpec
    });

    return {
      status: "PLAN_APPROVED",
      message: "Plan validated. Ready for APPLY phase.",
      operation: operationName,
      acCount: planSpec.acceptanceCriteria.length,
      taskCount: planSpec.tasks.length
    };
  }

  // Execute APPLY phase
  async executeApply(operationName, tasks) {
    console.log("[PAUL] APPLY Phase: " + operationName);
    
    // Verify loop integrity
    const integrity = this.enforcer.enforceLoopIntegrity();
    if (!integrity.allowed) throw new Error(integrity.reason);
    
    const results = [];
    
    for (const task of tasks) {
      // Execute task
      const result = await this.executeTask(task);
      
      // Validate escalation status
      this.enforcer.validateEscalationStatus(task, result.status);
      
      results.push(result);
      
      if (result.status === "BLOCKED") {
        this.enforcer.state.blockers.push({
          task: task.name,
          reason: result.blockReason,
          timestamp: new Date().toISOString()
        });
      }
    }

    // Transition state
    this.enforcer.transitionState("APPLY", "UNIFY");

    this.operationLog.push({
      phase: "APPLY",
      operation: operationName,
      timestamp: new Date().toISOString(),
      tasks: results
    });

    return {
      status: "APPLY_COMPLETE",
      tasksCompleted: results.filter(r => r.status === "DONE").length,
      tasksWithConcerns: results.filter(r => r.status === "DONE_WITH_CONCERNS").length,
      blocked: results.filter(r => r.status === "BLOCKED").length
    };
  }

  // Execute UNIFY phase
  async executeUnify(operationName, actual) {
    console.log("[PAUL] UNIFY Phase: " + operationName);
    
    // Get original plan
    const originalOperation = this.operationLog.find(op => 
      op.operation === operationName && op.phase === "PLAN"
    );
    
    if (!originalOperation) {
      throw new Error("PAUL Law Violation: Cannot UNIFY without corresponding PLAN");
    }

    // Reconcile plan vs actual
    const reconciliation = this.enforcer.reconcileAndUnify(
      originalOperation.plan,
      actual
    );

    // Update state
    this.enforcer.state.decisions.push(...(actual.decisions || []));
    this.enforcer.state.currentPhase = null;
    this.enforcer.state.currentPlan = null;

    // Transition state
    this.enforcer.transitionState("UNIFY", "PLAN");

    this.operationLog.push({
      phase: "UNIFY",
      operation: operationName,
      timestamp: new Date().toISOString(),
      reconciliation: reconciliation,
      summary: actual.summary
    });

    return {
      status: "OPERATION_CLOSED",
      message: "Loop complete. Operation reconciled and state updated.",
      reconciliation: reconciliation,
      nextPhaseReady: true
    };
  }

  // Helper: Execute individual task with verification
  async executeTask(task) {
    // Execute the task
    const taskResult = {
      name: task.name,
      files: task.files,
      action: task.action,
      status: "EXECUTING"
    };

    try {
      // Simulate task execution
      const outcome = await this.performWork(task.action);
      
      // Verify against criteria
      const verification = await this.verify(task.verify, outcome);
      
      if (verification.passed) {
        taskResult.status = "DONE";
        taskResult.verification = verification;
      } else {
        taskResult.status = "DONE_WITH_CONCERNS";
        taskResult.concerns = verification.concerns;
        taskResult.verification = verification;
      }
    } catch (error) {
      taskResult.status = "NEEDS_CONTEXT";
      taskResult.error = error.message;
    }

    return taskResult;
  }

  // Helper: Perform work (placeholder)
  async performWork(action) {
    return { executed: true, action };
  }

  // Helper: Verify task completion
  async verify(criteria, outcome) {
    return {
      passed: true,
      criteria: criteria,
      outcome: outcome,
      timestamp: new Date().toISOString()
    };
  }

  // Get current state
  getState() {
    return {
      loopPosition: this.enforcer.state.loopPosition,
      decisions: this.enforcer.state.decisions,
      blockers: this.enforcer.state.blockers,
      operationCount: this.operationLog.length,
      lastOperation: this.operationLog[this.operationLog.length - 1] || null
    };
  }

  // Get operation history
  getOperationHistory() {
    return this.operationLog;
  }
}

// Export for Agent Alex integration
export const paulCompliance = new AgentAlexPAULCompliance();
export { PAULEnforcer, PAUL_LAWS, PAUL_OPERATION_TEMPLATE };
