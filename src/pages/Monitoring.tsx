import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity, Clock, CheckCircle2, RotateCcw } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrajectoryBadge } from '@/components/ui/trajectory-badge';
import { getInsightById, getActionForInsight, executionRecords } from '@/data/mockData';

export default function Monitoring() {
  const { insightId } = useParams<{ insightId: string }>();
  const navigate = useNavigate();
  
  const insight = getInsightById(insightId || 'insight-001');
  const action = getActionForInsight(insightId || 'insight-001');
  
  // Use mock execution data or create one
  const execution = executionRecords[0];

  if (!insight || !action) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Execution not found</p>
        </div>
      </AppShell>
    );
  }

  const statusConfig = {
    pending: { label: 'Pending', color: 'text-muted-foreground', bg: 'bg-muted' },
    in_progress: { label: 'In Progress', color: 'text-info', bg: 'bg-info/20' },
    completed: { label: 'Completed', color: 'text-success', bg: 'bg-success/20' },
    rolled_back: { label: 'Rolled Back', color: 'text-warning', bg: 'bg-warning/20' },
  };

  const status = statusConfig[execution.executionStatus];

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Insights
        </Button>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl ${status.bg} flex items-center justify-center`}>
              <Activity className={`w-5 h-5 ${status.color}`} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Execution Monitoring</h1>
              <p className="text-sm text-muted-foreground">{insight.title}</p>
            </div>
          </div>
        </header>

        {/* Status Overview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <span className="text-xs text-muted-foreground block mb-2">Execution Status</span>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${status.bg}`}>
                  <div className={`w-full h-full rounded-full ${status.color.replace('text-', 'bg-')} animate-pulse`} />
                </div>
                <span className={`font-medium ${status.color}`}>{status.label}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <span className="text-xs text-muted-foreground block mb-2">Trajectory</span>
              <TrajectoryBadge trajectory={execution.trajectory} />
            </CardContent>
          </Card>
        </div>

        {/* Action Summary */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              Action Executed
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-foreground mb-4">{action.action}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Started {execution.startedAt}
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Duration: {action.duration}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Outcome */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle className="text-base font-medium">Current Outcome</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <p className="text-foreground">{execution.outcomeDescription}</p>
            {execution.actualImpact && (
              <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                <h4 className="text-sm font-medium text-success mb-1">Observed Impact</h4>
                <p className="text-foreground">{execution.actualImpact}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle className="text-base font-medium">Execution Timeline</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Action Approved</p>
                  <p className="text-xs text-muted-foreground">2 hours ago by Operations Manager</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-info/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Activity className="w-3.5 h-3.5 text-info" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Execution Started</p>
                  <p className="text-xs text-muted-foreground">2 hours ago • Prep quantities adjusted</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completion Expected</p>
                  <p className="text-xs text-muted-foreground">In 6 days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            className="border-border text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Rollback Action
          </Button>
          <Button 
            variant="outline"
            className="border-border"
            onClick={() => navigate('/')}
          >
            Return to Insights
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
