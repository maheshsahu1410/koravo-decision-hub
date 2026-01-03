import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, RotateCcw, Check, X, Pause, Sparkles, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { RiskIndicator } from '@/components/decisions/RiskIndicator';
import { HumanControlBadge } from '@/components/decisions/HumanControlBadge';
import { LifecycleIndicator } from '@/components/decisions/LifecycleIndicator';
import { getDecisionById } from '@/data/decisions';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function RecommendedAction() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const decision = getDecisionById(id || '');

  const [parameters, setParameters] = useState(
    decision?.recommendation.parameters.reduce(
      (acc, p) => ({ ...acc, [p.id]: p.value }), 
      {} as Record<string, number>
    ) || {}
  );
  
  const [riskOpen, setRiskOpen] = useState(false);
  const [dismissDialogOpen, setDismissDialogOpen] = useState(false);
  const [deferDialogOpen, setDeferDialogOpen] = useState(false);
  const [dismissReason, setDismissReason] = useState('');

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

  const handleParameterChange = (paramId: string, value: number[]) => {
    setParameters(prev => ({ ...prev, [paramId]: value[0] }));
  };

  // Check if parameters have been modified from defaults
  const parametersModified = useMemo(() => {
    return recommendation.parameters.some(p => parameters[p.id] !== p.value);
  }, [parameters, recommendation.parameters]);

  const handleDismiss = () => {
    if (!dismissReason.trim()) {
      toast.error('Please provide a reason for dismissing this insight');
      return;
    }
    toast.success('Insight dismissed', {
      description: 'Your feedback has been recorded.'
    });
    navigate('/');
  };

  const handleDefer = (duration: string) => {
    toast.success(`Insight deferred until ${duration}`, {
      description: 'The system will remind you when it\'s time to review.'
    });
    setDeferDialogOpen(false);
    navigate('/');
  };

  return (
    <AppShell>
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="mb-6 -ml-2 text-muted-foreground hover:text-foreground group"
        onClick={() => navigate(`/decision/${id}`)}
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Insight
      </Button>

      {/* Lifecycle Progress */}
      <Card className="bg-card border-border mb-6">
        <CardContent className="py-5 px-6">
          <LifecycleIndicator currentStage="in_review" />
        </CardContent>
      </Card>

      {/* Header */}
      <header className="mb-8">
        <p className="text-sm text-muted-foreground mb-2">System recommendation for</p>
        <h1 className="text-2xl font-semibold text-foreground mb-4">{insight.title}</h1>
        <HumanControlBadge variant="prominent" />
      </header>

      {/* Recommendation Card */}
      <Card className="bg-gradient-to-br from-card to-muted/20 border-border mb-6">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wide">System Recommendation</span>
          </div>
          <CardTitle className="text-xl font-semibold text-foreground">
            {recommendation.summary}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Metadata Row */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Duration:</span>
              <span className="text-sm font-medium text-foreground">{recommendation.duration}</span>
            </div>
            <RiskIndicator risk={recommendation.riskLevel} />
            {recommendation.rollbackAvailable && (
              <div className="flex items-center gap-2 text-success bg-success/10 rounded-lg px-3 py-2">
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm">Reversible within {recommendation.rollbackWindow}</span>
              </div>
            )}
          </div>

          {/* What Will / Won't Change */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-info/5 border border-info/20 rounded-xl p-4">
              <h4 className="text-sm font-medium text-info mb-3">What will change</h4>
              <ul className="space-y-2">
                {recommendation.willChange.map((item, i) => (
                  <li key={i} className="text-sm text-foreground flex items-start gap-2">
                    <Check className="w-4 h-4 text-info flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-muted/30 border border-muted rounded-xl p-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">What will NOT change</h4>
              <ul className="space-y-2">
                {recommendation.willNotChange.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Expected Outcome */}
          <div className="bg-success/5 border border-success/20 rounded-xl p-4">
            <h4 className="text-sm font-medium text-success mb-2">Expected Outcome</h4>
            <p className="text-foreground leading-relaxed">{recommendation.expectedOutcome}</p>
          </div>

          {/* Risk Explanation - Expandable */}
          {recommendation.riskExplanation && (
            <Collapsible open={riskOpen} onOpenChange={setRiskOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-4 bg-muted/30 rounded-xl h-auto">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="text-sm font-medium">Explain risk</span>
                  </div>
                  {riskOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="space-y-4 bg-muted/20 rounded-xl p-4">
                  <div>
                    <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Sources of Risk</h5>
                    <ul className="space-y-2">
                      {recommendation.riskExplanation.sources.map((source, i) => (
                        <li key={i} className="text-sm text-foreground">{source}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">What Could Go Wrong</h5>
                    <ul className="space-y-2">
                      {recommendation.riskExplanation.whatCouldGoWrong.map((item, i) => (
                        <li key={i} className="text-sm text-foreground">• {item}</li>
                      ))}
                    </ul>
                  </div>
                  {recommendation.riskExplanation.worstCase && (
                    <div>
                      <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Worst-Case Boundary</h5>
                      <p className="text-sm text-foreground">{recommendation.riskExplanation.worstCase}</p>
                    </div>
                  )}
                  {recommendation.riskExplanation.whyAcceptable && (
                    <div className="bg-success/10 rounded-lg p-3 border border-success/20">
                      <h5 className="text-xs font-medium text-success uppercase tracking-wide mb-2">Why Risk Is Acceptable</h5>
                      <p className="text-sm text-foreground">{recommendation.riskExplanation.whyAcceptable}</p>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Adjustable Parameters */}
          {recommendation.parameters.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-4">
                Adjust parameters (optional)
              </h4>
              <div className="space-y-5">
                {recommendation.parameters.map(param => (
                  <div key={param.id} className="bg-muted/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{param.label}</span>
                      <span className={cn(
                        'font-mono text-xl font-semibold',
                        parameters[param.id] !== param.value ? 'text-warning' : 'text-primary'
                      )}>
                        {parameters[param.id] || param.value}{param.unit}
                      </span>
                    </div>
                    {param.description && (
                      <p className="text-xs text-muted-foreground mb-4">{param.description}</p>
                    )}
                    <Slider
                      value={[parameters[param.id] || param.value]}
                      min={param.min}
                      max={param.max}
                      step={1}
                      onValueChange={(value) => handleParameterChange(param.id, value)}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{param.min}{param.unit}</span>
                      <span className="text-xs text-muted-foreground">{param.max}{param.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Parameter modification warning */}
              {parametersModified && (
                <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <p className="text-sm text-warning">
                    You have modified the recommended parameters. Expected outcome may vary from predictions.
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Important Note */}
      <p className="text-sm text-muted-foreground text-center mb-6">
        This is a <span className="text-foreground font-medium">recommendation</span>, not an order. 
        You choose what happens next.
      </p>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="border-border text-muted-foreground hover:text-foreground"
            onClick={() => setDismissDialogOpen(true)}
          >
            <X className="w-4 h-4 mr-2" />
            Dismiss
          </Button>
          <Button 
            variant="outline"
            className="border-border text-muted-foreground hover:text-foreground"
            onClick={() => setDeferDialogOpen(true)}
          >
            <Pause className="w-4 h-4 mr-2" />
            Defer
          </Button>
        </div>
        <Button 
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => navigate(`/decision/${id}/confirm`)}
        >
          <Check className="w-4 h-4 mr-2" />
          Approve this action
        </Button>
      </div>

      {/* Dismiss Dialog */}
      <Dialog open={dismissDialogOpen} onOpenChange={setDismissDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Why are you dismissing this?</DialogTitle>
            <DialogDescription>
              Help us improve. Your feedback helps the system learn.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              {[
                'Already handled elsewhere',
                'Not a priority right now',
                'Context the system doesn\'t understand',
                'System is wrong',
                'Other'
              ].map((reason) => (
                <Button
                  key={reason}
                  variant={dismissReason === reason ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setDismissReason(reason)}
                >
                  {reason}
                </Button>
              ))}
            </div>
            {dismissReason === 'Other' && (
              <Textarea
                placeholder="Please describe..."
                value={dismissReason === 'Other' ? '' : dismissReason}
                onChange={(e) => setDismissReason(e.target.value || 'Other')}
              />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDismissDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDismiss}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Defer Dialog */}
      <Dialog open={deferDialogOpen} onOpenChange={setDeferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>When should we remind you?</DialogTitle>
            <DialogDescription>
              The insight will reappear at the selected time, or earlier if the situation changes.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            {[
              { label: 'Later today (6 hours)', value: 'later today' },
              { label: 'Tomorrow', value: 'tomorrow' },
              { label: 'In 3 days', value: 'in 3 days' },
              { label: 'In 1 week', value: 'in 1 week' },
              { label: 'When momentum changes', value: 'when momentum changes' }
            ].map((option) => (
              <Button
                key={option.value}
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleDefer(option.label)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
