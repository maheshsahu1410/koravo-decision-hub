import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RiskBadge } from '@/components/ui/risk-badge';
import { getInsightById, getActionForInsight } from '@/data/mockData';
import { toast } from 'sonner';

export default function ActionConfirmation() {
  const { insightId } = useParams<{ insightId: string }>();
  const navigate = useNavigate();
  
  const insight = getInsightById(insightId || '');
  const action = getActionForInsight(insightId || '');

  const [confirmed, setConfirmed] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  if (!insight || !action) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Action not found</p>
        </div>
      </AppShell>
    );
  }

  const handleExecute = () => {
    setIsExecuting(true);
    // Simulate execution
    setTimeout(() => {
      toast.success('Action executed successfully', {
        description: 'Monitoring has begun. You can track progress in the Monitoring screen.'
      });
      navigate(`/monitoring/${insightId}`);
    }, 1500);
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate(`/action/${insightId}`)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Action
        </Button>

        {/* Header */}
        <header className="mb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Confirm Execution</h1>
          <p className="text-muted-foreground">Please review the details before proceeding</p>
        </header>

        {/* Summary Card */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Execution Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* What Will Change */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-info/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-4 h-4 text-info" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">What Will Change</h4>
                <p className="text-sm text-muted-foreground">{action.action}</p>
              </div>
            </div>

            {/* Expected Outcome */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-success" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Expected Outcome</h4>
                <p className="text-sm text-muted-foreground">{action.expectedOutcome}</p>
              </div>
            </div>

            {/* Risk Level */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Risk Level</h4>
                <RiskBadge risk={action.riskLevel} />
              </div>
            </div>

            {/* Rollback */}
            {action.rollbackAvailable && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-4 h-4 text-success" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Rollback Available</h4>
                  <p className="text-sm text-muted-foreground">
                    This action can be reversed within 48 hours if needed.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Confirmation Checkbox */}
        <Card className="bg-muted/30 border-border mb-6">
          <CardContent className="p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox 
                checked={confirmed}
                onCheckedChange={(checked) => setConfirmed(checked as boolean)}
                className="mt-0.5"
              />
              <div>
                <span className="text-sm font-medium text-foreground block">
                  I have reviewed and approve this action
                </span>
                <span className="text-xs text-muted-foreground">
                  I understand what will change and accept the associated risk level.
                </span>
              </div>
            </label>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            className="border-border text-muted-foreground hover:text-foreground"
            onClick={() => navigate(`/action/${insightId}`)}
          >
            Cancel
          </Button>
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={!confirmed || isExecuting}
            onClick={handleExecute}
          >
            {isExecuting ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                Executing...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Execute Action
              </>
            )}
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
