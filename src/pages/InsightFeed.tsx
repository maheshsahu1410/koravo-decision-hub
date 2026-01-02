import { AlertCircle, Lightbulb } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { DecisionCard } from '@/components/decisions/DecisionCard';
import { HumanControlBadge } from '@/components/decisions/HumanControlBadge';
import { getPendingDecisions } from '@/data/decisions';

export default function InsightFeed() {
  const pendingDecisions = getPendingDecisions();
  const criticalCount = pendingDecisions.filter(d => d.insight.priority === 'critical').length;

  return (
    <AppShell>
      {/* Page Header */}
      <header className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Insight Feed</h1>
                <p className="text-sm text-muted-foreground">Decisions awaiting your judgment</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Context Banner */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <span className="text-3xl font-mono font-semibold text-foreground">{pendingDecisions.length}</span>
              <p className="text-xs text-muted-foreground mt-0.5">Pending decisions</p>
            </div>
            {criticalCount > 0 && (
              <>
                <div className="h-12 w-px bg-border" />
                <div>
                  <span className="text-3xl font-mono font-semibold text-critical">{criticalCount}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">Critical priority</p>
                </div>
              </>
            )}
          </div>
          <div className="max-w-sm text-right">
            <p className="text-sm text-muted-foreground leading-relaxed">
              These insights represent decisions the system has identified as needing human judgment. 
              <span className="text-foreground font-medium"> You decide. The system executes.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Decision Cards */}
      <div className="space-y-4">
        {pendingDecisions.map((decision, index) => (
          <DecisionCard key={decision.id} decision={decision} index={index} />
        ))}
      </div>

      {/* Empty State */}
      {pendingDecisions.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-3xl bg-success/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-success" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No pending decisions</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            All insights have been reviewed. The system continues to monitor operations and will surface new decisions when attention is needed.
          </p>
        </div>
      )}
    </AppShell>
  );
}
