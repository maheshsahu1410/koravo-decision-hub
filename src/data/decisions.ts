// KORAVO Mock Decision Data
// Structured to mirror future API responses
// All business logic lives in the backend - UI only renders

import { Decision } from '@/types/decision';

export const mockDecisions: Decision[] = [
  {
    id: 'decision-001',
    stage: 'pending',
    
    insight: {
      title: 'Ingredient wastage above safe range',
      state: 'Wastage deviation detected in Outlet Cluster A',
      priority: 'critical',
      confidence: 87,
      detectedAt: '2 hours ago'
    },
    
    context: {
      whatHappened: 'Over the past 7 days, ingredient wastage has increased significantly while customer demand has decreased. The system detected that preparation quantities were not adjusted to match the demand dip, leading to excess inventory that spoils before use.',
      whyItMatters: 'This pattern is causing direct margin erosion. The wastage is structural, not random, which means it will continue until corrected.',
      evidence: [
        { id: 'ev-1', statement: 'Wastage increased 12% over 7 days', metric: '+12%', trend: 'up' },
        { id: 'ev-2', statement: 'Demand dipped 9% in same period', metric: '-9%', trend: 'down' },
        { id: 'ev-3', statement: 'No vendor quality issues detected', trend: 'neutral' },
        { id: 'ev-4', statement: 'Pattern consistent across 3 outlets', trend: 'neutral' }
      ],
      inactionConsequence: 'If no action is taken, the margin loss will continue at approximately ₹42,000 per month. Over 90 days, this compounds to ₹1.26 lakh in preventable losses.'
    },
    
    impact: {
      value: '₹42,000',
      description: 'margin loss',
      timeframe: 'per month'
    },
    
    recommendation: {
      id: 'rec-001',
      summary: 'Reduce prep quantity by 12% for the next 7 days',
      duration: '7 days',
      expectedOutcome: 'Margin stabilization and wastage reduction. Expected recovery of approximately ₹10,500 in the first week.',
      riskLevel: 'low',
      rollbackAvailable: true,
      rollbackWindow: '48 hours',
      parameters: [
        {
          id: 'param-reduction',
          label: 'Reduction percentage',
          value: 12,
          unit: '%',
          min: 5,
          max: 25,
          description: 'How much to reduce prep quantities'
        },
        {
          id: 'param-duration',
          label: 'Duration',
          value: 7,
          unit: 'days',
          min: 3,
          max: 14,
          description: 'How long to apply this adjustment'
        }
      ]
    }
  },
  {
    id: 'decision-002',
    stage: 'pending',
    
    insight: {
      title: 'Staff overtime trending above threshold',
      state: 'Labor cost deviation in Region B',
      priority: 'high',
      confidence: 79,
      detectedAt: '1 day ago'
    },
    
    context: {
      whatHappened: 'Peak customer traffic times have shifted, but staff scheduling has not been updated to match. This is causing overtime during actual peaks while regular hours are underutilized.',
      whyItMatters: 'Excess labor cost without improvement in service quality. The misalignment will persist until schedules are adjusted.',
      evidence: [
        { id: 'ev-5', statement: 'Overtime hours up 18% this month', metric: '+18%', trend: 'up' },
        { id: 'ev-6', statement: 'Peak traffic shifted by 2 hours', trend: 'neutral' },
        { id: 'ev-7', statement: 'Total customer volume unchanged', trend: 'neutral' }
      ],
      inactionConsequence: 'Continued excess labor spend of ₹28,000 per month with no improvement in service levels.'
    },
    
    impact: {
      value: '₹28,000',
      description: 'excess labor cost',
      timeframe: 'per month'
    },
    
    recommendation: {
      id: 'rec-002',
      summary: 'Adjust shift schedules to align with new traffic patterns',
      duration: '14 days',
      expectedOutcome: 'Reduce overtime by 15%, saving approximately ₹4,200 per week while maintaining service quality.',
      riskLevel: 'low',
      rollbackAvailable: true,
      rollbackWindow: '24 hours',
      parameters: [
        {
          id: 'param-shift',
          label: 'Shift adjustment',
          value: 2,
          unit: 'hours',
          min: 1,
          max: 4,
          description: 'Hours to shift peak staffing'
        }
      ]
    }
  },
  {
    id: 'decision-003',
    stage: 'executing',
    
    insight: {
      title: 'Vendor delivery delays impacting stock',
      state: 'Supply reliability deviation',
      priority: 'medium',
      confidence: 72,
      detectedAt: '3 days ago'
    },
    
    context: {
      whatHappened: 'Primary dairy vendor showing consistent 1-2 day delays. No communication about supply chain issues from vendor side.',
      whyItMatters: 'Risk of stockout is increasing. May require emergency procurement at premium prices.',
      evidence: [
        { id: 'ev-8', statement: 'Average delivery delay: 1.4 days', metric: '+1.4d', trend: 'up' },
        { id: 'ev-9', statement: '3 near-stockout events this month', trend: 'up' },
        { id: 'ev-10', statement: 'Backup vendor available and vetted', trend: 'neutral' }
      ],
      inactionConsequence: 'Stockout probability increases to 40% within 2 weeks, potentially impacting customer experience and forcing premium procurement.'
    },
    
    impact: {
      value: '₹15,000',
      description: 'potential stockout risk',
      timeframe: 'this month'
    },
    
    recommendation: {
      id: 'rec-003',
      summary: 'Increase safety stock by 20% and initiate backup vendor',
      duration: '14 days',
      expectedOutcome: 'Eliminate stockout risk while vendor reliability is assessed.',
      riskLevel: 'low',
      rollbackAvailable: true,
      rollbackWindow: '72 hours',
      parameters: [
        {
          id: 'param-stock',
          label: 'Safety stock increase',
          value: 20,
          unit: '%',
          min: 10,
          max: 40,
          description: 'Additional buffer inventory'
        }
      ]
    },
    
    execution: {
      stage: 'in_progress',
      trajectory: 'on_track',
      startedAt: '1 day ago',
      progressDescription: 'Safety stock adjustment applied. Backup vendor contacted and confirmed availability.',
      observedImpact: 'Early indicators positive: No near-stockout events in last 24 hours.'
    },
    
    approvedBy: 'Operations Manager',
    approvedAt: '1 day ago'
  }
];

// Helper functions - will map to API calls later
export function getDecisionById(id: string): Decision | undefined {
  return mockDecisions.find(d => d.id === id);
}

export function getPendingDecisions(): Decision[] {
  return mockDecisions.filter(d => d.stage === 'pending');
}

export function getActiveExecutions(): Decision[] {
  return mockDecisions.filter(d => d.stage === 'executing');
}

export function getCompletedDecisions(): Decision[] {
  return mockDecisions.filter(d => d.stage === 'completed');
}
