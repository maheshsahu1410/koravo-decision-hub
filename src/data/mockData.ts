// KORAVO Mock Data - Decision Intelligence System
// All data represents decisions, not raw analytics

export type Priority = 'critical' | 'high' | 'medium';
export type DecisionStatus = 'pending' | 'reviewed' | 'approved' | 'executed' | 'completed';
export type ExecutionStatus = 'pending' | 'in_progress' | 'completed' | 'rolled_back';
export type Trajectory = 'on_track' | 'at_risk' | 'off_track';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface Evidence {
  statement: string;
  metric?: string;
}

export interface Insight {
  id: string;
  title: string;
  priority: Priority;
  confidence: number;
  impactValue: string;
  impactDescription: string;
  detectedAt: string;
  state: string;
  whyItHappened: string;
  evidence: Evidence[];
  inactionImpact: string;
  status: DecisionStatus;
}

export interface RecommendedAction {
  id: string;
  insightId: string;
  action: string;
  duration: string;
  expectedOutcome: string;
  riskLevel: RiskLevel;
  rollbackAvailable: boolean;
  parameters: ActionParameter[];
}

export interface ActionParameter {
  id: string;
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
}

export interface ExecutionRecord {
  id: string;
  insightId: string;
  actionId: string;
  executionStatus: ExecutionStatus;
  trajectory: Trajectory;
  startedAt: string;
  completedAt?: string;
  outcomeDescription: string;
  actualImpact?: string;
}

// Primary insight based on user specification
export const insights: Insight[] = [
  {
    id: 'insight-001',
    title: 'Ingredient wastage above safe range',
    priority: 'critical',
    confidence: 87,
    impactValue: '₹42,000',
    impactDescription: 'per month margin loss',
    detectedAt: '2 hours ago',
    state: 'Wastage above expected range in Outlet Cluster A',
    whyItHappened: 'Prep quantity is not aligned with the recent demand dip. Over the past 7 days, demand has decreased but preparation volumes have remained constant, leading to excess inventory that spoils before use.',
    evidence: [
      { statement: 'Wastage increased 12% over 7 days', metric: '+12%' },
      { statement: 'Demand dipped 9% in same period', metric: '-9%' },
      { statement: 'No vendor quality change detected' },
      { statement: 'Pattern repeating across 3 outlets' }
    ],
    inactionImpact: 'If no action is taken, margin loss will continue at ₹42,000/month. Over 90 days, this compounds to ₹1.26L in preventable losses.',
    status: 'pending'
  },
  {
    id: 'insight-002',
    title: 'Staff overtime trending above threshold',
    priority: 'high',
    confidence: 79,
    impactValue: '₹28,000',
    impactDescription: 'per month in excess labor cost',
    detectedAt: '1 day ago',
    state: 'Labor cost deviation in Region B',
    whyItHappened: 'Shift scheduling not optimized for current traffic patterns. Peak hours require additional staff, but current schedules maintain flat coverage.',
    evidence: [
      { statement: 'Overtime hours up 18% this month', metric: '+18%' },
      { statement: 'Peak traffic times shifted by 2 hours' },
      { statement: 'No change in total customer volume' }
    ],
    inactionImpact: 'Continued excess labor spend of ₹28,000/month with no improvement in service quality.',
    status: 'pending'
  },
  {
    id: 'insight-003',
    title: 'Vendor delivery delays impacting stock',
    priority: 'medium',
    confidence: 72,
    impactValue: '₹15,000',
    impactDescription: 'potential stockout risk',
    detectedAt: '3 days ago',
    state: 'Supply reliability deviation',
    whyItHappened: 'Primary vendor showing consistent 1-2 day delays on dairy products. No communication about supply chain issues.',
    evidence: [
      { statement: 'Average delivery delay: 1.4 days', metric: '+1.4d' },
      { statement: '3 near-stockout events this month' },
      { statement: 'Backup vendor available' }
    ],
    inactionImpact: 'Risk of stockout increases. May need emergency procurement at premium prices.',
    status: 'pending'
  }
];

export const recommendedActions: RecommendedAction[] = [
  {
    id: 'action-001',
    insightId: 'insight-001',
    action: 'Reduce prep quantity by 12% for the next 7 days',
    duration: '7 days',
    expectedOutcome: 'Margin stabilization and wastage reduction. Expected recovery of ₹10,500 in the first week.',
    riskLevel: 'low',
    rollbackAvailable: true,
    parameters: [
      {
        id: 'param-001',
        label: 'Reduction percentage',
        value: 12,
        unit: '%',
        min: 5,
        max: 25
      },
      {
        id: 'param-002',
        label: 'Duration',
        value: 7,
        unit: 'days',
        min: 3,
        max: 14
      }
    ]
  },
  {
    id: 'action-002',
    insightId: 'insight-002',
    action: 'Adjust shift schedules to match traffic patterns',
    duration: '14 days',
    expectedOutcome: 'Reduce overtime by 15%, saving approximately ₹4,200 per week.',
    riskLevel: 'low',
    rollbackAvailable: true,
    parameters: [
      {
        id: 'param-003',
        label: 'Shift adjustment',
        value: 2,
        unit: 'hours',
        min: 1,
        max: 4
      }
    ]
  }
];

export const executionRecords: ExecutionRecord[] = [
  {
    id: 'exec-001',
    insightId: 'insight-001',
    actionId: 'action-001',
    executionStatus: 'in_progress',
    trajectory: 'on_track',
    startedAt: '2 hours ago',
    outcomeDescription: 'Prep quantities adjusted across 3 outlets. Monitoring wastage metrics.',
    actualImpact: 'Early indicators positive: Day 1 wastage down 8%'
  }
];

// Helper functions
export function getInsightById(id: string): Insight | undefined {
  return insights.find(insight => insight.id === id);
}

export function getActionForInsight(insightId: string): RecommendedAction | undefined {
  return recommendedActions.find(action => action.insightId === insightId);
}

export function getExecutionForInsight(insightId: string): ExecutionRecord | undefined {
  return executionRecords.find(exec => exec.insightId === insightId);
}

export function getPriorityColor(priority: Priority): string {
  switch (priority) {
    case 'critical': return 'critical';
    case 'high': return 'high';
    case 'medium': return 'medium';
    default: return 'muted';
  }
}

export function getRiskColor(risk: RiskLevel): string {
  switch (risk) {
    case 'high': return 'critical';
    case 'medium': return 'warning';
    case 'low': return 'success';
    default: return 'muted';
  }
}

export function getTrajectoryColor(trajectory: Trajectory): string {
  switch (trajectory) {
    case 'on_track': return 'success';
    case 'at_risk': return 'warning';
    case 'off_track': return 'critical';
    default: return 'muted';
  }
}
