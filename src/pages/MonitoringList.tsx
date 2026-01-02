import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, Clock } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrajectoryBadge } from '@/components/ui/trajectory-badge';
import { executionRecords, getInsightById, getActionForInsight } from '@/data/mockData';

export default function MonitoringList() {
  const navigate = useNavigate();

  const statusConfig = {
    pending: { label: 'Pending', color: 'text-muted-foreground', bg: 'bg-muted' },
    in_progress: { label: 'In Progress', color: 'text-info', bg: 'bg-info/20' },
    completed: { label: 'Completed', color: 'text-success', bg: 'bg-success/20' },
    rolled_back: { label: 'Rolled Back', color: 'text-warning', bg: 'bg-warning/20' },
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-info" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Monitoring</h1>
              <p className="text-sm text-muted-foreground">Track active executions and outcomes</p>
            </div>
          </div>
        </header>

        {/* Summary */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-2xl font-mono-metric text-foreground">{executionRecords.length}</span>
              <p className="text-xs text-muted-foreground">Active executions</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <span className="text-2xl font-mono-metric text-success">
                {executionRecords.filter(e => e.trajectory === 'on_track').length}
              </span>
              <p className="text-xs text-muted-foreground">On track</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm text-right">
            Monitor the progress of approved actions and their real-world outcomes.
          </p>
        </div>

        {/* Execution Cards */}
        <div className="space-y-4">
          {executionRecords.map((execution, index) => {
            const insight = getInsightById(execution.insightId);
            const action = getActionForInsight(execution.insightId);
            const status = statusConfig[execution.executionStatus];

            if (!insight || !action) return null;

            return (
              <Card 
                key={execution.id}
                className="decision-card bg-card border-border cursor-pointer group animate-fade-in-up"
                style={{ animationDelay: `${index * 60}ms` }}
                onClick={() => navigate(`/monitoring/${execution.insightId}`)}
              >
                <CardContent className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${status.bg} ${status.color}`}>
                          {status.label}
                        </div>
                        <TrajectoryBadge trajectory={execution.trajectory} />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                        {insight.title}
                      </h3>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="bg-muted/50 rounded-lg p-3 mb-4">
                    <span className="text-xs text-muted-foreground block mb-1">Action Taken</span>
                    <p className="text-sm text-foreground">{action.action}</p>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Started {execution.startedAt}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-primary hover:bg-primary/10 hover:text-primary"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {executionRecords.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No active executions</h3>
            <p className="text-muted-foreground">Approve an action to see it here.</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
