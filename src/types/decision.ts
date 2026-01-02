// KORAVO Decision Object - Single source of truth
// This structure is designed to be API-ready for future backend integration

export type Priority = 'critical' | 'high' | 'medium';
export type DecisionStage = 'pending' | 'reviewing' | 'approved' | 'executing' | 'completed';
export type ExecutionTrajectory = 'on_track' | 'at_risk' | 'off_track';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface Evidence {
  id: string;
  statement: string;
  metric?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ActionParameter {
  id: string;
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  description?: string;
}

export interface RecommendedAction {
  id: string;
  summary: string;
  duration: string;
  expectedOutcome: string;
  riskLevel: RiskLevel;
  rollbackAvailable: boolean;
  rollbackWindow?: string;
  parameters: ActionParameter[];
}

export interface ExecutionStatus {
  stage: 'pending' | 'in_progress' | 'completed' | 'rolled_back';
  trajectory: ExecutionTrajectory;
  startedAt?: string;
  completedAt?: string;
  progressDescription: string;
  observedImpact?: string;
}

// The core Decision object - everything in KORAVO maps to this
export interface Decision {
  id: string;
  
  // What stage is this decision in?
  stage: DecisionStage;
  
  // The insight that triggered this decision
  insight: {
    title: string;
    state: string;
    priority: Priority;
    confidence: number;
    detectedAt: string;
  };
  
  // Why does this matter?
  context: {
    whatHappened: string;
    whyItMatters: string;
    evidence: Evidence[];
    inactionConsequence: string;
  };
  
  // Financial/operational impact
  impact: {
    value: string;
    description: string;
    timeframe: string;
  };
  
  // System recommendation (can be overridden by human)
  recommendation: RecommendedAction;
  
  // Execution tracking (populated after approval)
  execution?: ExecutionStatus;
  
  // Audit trail
  approvedBy?: string;
  approvedAt?: string;
}

// Lifecycle stage metadata for UI
export const DECISION_STAGES: Record<DecisionStage, {
  label: string;
  description: string;
  order: number;
}> = {
  pending: {
    label: 'Pending Review',
    description: 'Awaiting human attention',
    order: 1
  },
  reviewing: {
    label: 'Under Review',
    description: 'Being evaluated',
    order: 2
  },
  approved: {
    label: 'Approved',
    description: 'Ready for execution',
    order: 3
  },
  executing: {
    label: 'Executing',
    description: 'Action in progress',
    order: 4
  },
  completed: {
    label: 'Completed',
    description: 'Action finished',
    order: 5
  }
};
