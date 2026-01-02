import { insights } from '@/data/mockData';
import { InsightCard } from '@/components/insights/InsightCard';
import { AppShell } from '@/components/layout/AppShell';
import { AlertCircle } from 'lucide-react';

export default function InsightFeed() {
  const pendingInsights = insights.filter(i => i.status === 'pending');

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Insight Feed</h1>
              <p className="text-sm text-muted-foreground">Decisions awaiting your review</p>
            </div>
          </div>
        </header>

        {/* Summary */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-2xl font-mono-metric text-foreground">{pendingInsights.length}</span>
              <p className="text-xs text-muted-foreground">Pending decisions</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <span className="text-2xl font-mono-metric text-critical">
                {pendingInsights.filter(i => i.priority === 'critical').length}
              </span>
              <p className="text-xs text-muted-foreground">Critical priority</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm text-right">
            These insights represent decisions the system has detected as requiring human judgment.
          </p>
        </div>

        {/* Insight Cards */}
        <div className="space-y-4">
          {pendingInsights.map((insight, index) => (
            <InsightCard key={insight.id} insight={insight} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {pendingInsights.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No pending decisions</h3>
            <p className="text-muted-foreground">All insights have been reviewed. Check back later.</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
