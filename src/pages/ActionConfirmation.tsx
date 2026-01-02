import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, RotateCcw, AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RiskIndicator } from '@/components/decisions/RiskIndicator';
import { LifecycleIndicator } from '@/components/decisions/LifecycleIndicator';
import { getDecisionById } from '@/data/decisions';
import { toast } from 'sonner';

export default function ActionConfirmation() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const decision = getDecisionById(id || '');

  const [confirmed, setConfirmed] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  if (!decision) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Decision not found</p>
        </div>
      </AppShell>
    );
  }

  const { insight, recommendation } = decision;

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      toast.success('Action approved and executing', {
        description: 'You can track progress in the Monitoring section.'
      });
      navigate('/monitoring');
    }, 1500);
  };

  return (
    <AppShell>
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="mb-6 -ml-2 text-muted-foreground hover:text-foreground group"
        onClick={() => navigate(`/decision/${id}/action`)}
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Recommendation
      </Button>

      {/* Lifecycle Progress */}
      <Card className="bg-card border-border mb-6">
        <CardContent className="py-5 px-6">
          <LifecycleIndicator currentStage="approved" />
        </CardContent>
      </Card>

      {/* Header */}
      <header className="mb-8 text-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-5">
          <Lock className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Final Confirmation</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          You are about to authorize an action. Please review the details carefully.
        </p>
      </header>

      {/* Summary Card */}
      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Execution Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* What Will Change */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-info/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-info" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">What will change</h4>
              <p className="text-sm text-muted-foreground">{recommendation.summary}</p>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
              <span className="text-muted-foreground text-sm">⏱</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">Duration</h4>
              <p className="text-sm text-muted-foreground">{recommendation.duration}</p>
            </div>
          </div>

          {/* Expected Outcome */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">Expected outcome</h4>
              <p className="text-sm text-muted-foreground">{recommendation.expectedOutcome}</p>
            </div>
          </div>

          {/* Risk Level */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">Risk assessment</h4>
              <RiskIndicator risk={recommendation.riskLevel} showDescription />
            </div>
          </div>

          {/* Rollback */}
          {recommendation.rollbackAvailable && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-5 h-5 text-success" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Rollback available</h4>
                <p className="text-sm text-muted-foreground">
                  This action can be reversed within <span className="text-foreground font-medium">{recommendation.rollbackWindow}</span> if needed. 
                  You remain in control even after execution.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Checkbox */}
      <Card className="bg-primary/5 border-primary/20 mb-8">
        <CardContent className="p-5">
          <label className="flex items-start gap-4 cursor-pointer">
            <Checkbox 
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked as boolean)}
              className="mt-0.5 border-primary data-[state=checked]:bg-primary"
            />
            <div>
              <span className="text-sm font-medium text-foreground block">
                I have reviewed and authorize this action
              </span>
              <span className="text-xs text-muted-foreground">
                I understand what will change and accept responsibility for this decision.
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
          onClick={() => navigate(`/decision/${id}/action`)}
        >
          Cancel
        </Button>
        <Button 
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[180px]"
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
    </AppShell>
  );
}
