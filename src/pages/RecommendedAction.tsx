import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, RotateCcw, Check, X, Pause, Sparkles } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { RiskIndicator } from '@/components/decisions/RiskIndicator';
import { HumanControlBadge } from '@/components/decisions/HumanControlBadge';
import { LifecycleIndicator } from '@/components/decisions/LifecycleIndicator';
import { getDecisionById } from '@/data/decisions';

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

  if (!decision) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Decision not found</p>
        </div>
      </AppShell>
    );
  }

  const { insight, recommendation, stage } = decision;

  const handleParameterChange = (paramId: string, value: number[]) => {
    setParameters(prev => ({ ...prev, [paramId]: value[0] }));
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
          <LifecycleIndicator currentStage="reviewing" />
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

          {/* Expected Outcome */}
          <div className="bg-success/5 border border-success/20 rounded-xl p-4">
            <h4 className="text-sm font-medium text-success mb-2">Expected Outcome</h4>
            <p className="text-foreground leading-relaxed">{recommendation.expectedOutcome}</p>
          </div>

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
                      <span className="font-mono text-xl text-primary font-semibold">
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
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="border-border text-muted-foreground hover:text-foreground"
            onClick={() => navigate('/')}
          >
            <X className="w-4 h-4 mr-2" />
            Dismiss
          </Button>
          <Button 
            variant="outline"
            className="border-border text-muted-foreground hover:text-foreground"
          >
            <Pause className="w-4 h-4 mr-2" />
            Defer for later
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
    </AppShell>
  );
}
