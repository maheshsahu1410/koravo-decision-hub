import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, AlertTriangle, FileText, Eye, ChevronDown, ChevronUp, HelpCircle, History } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PriorityIndicator } from '@/components/decisions/PriorityIndicator';
import { ConfidenceMeter } from '@/components/decisions/ConfidenceMeter';
import { ImpactCard } from '@/components/decisions/ImpactCard';
import { EvidenceList } from '@/components/decisions/EvidenceList';
import { LifecycleIndicator } from '@/components/decisions/LifecycleIndicator';
import { HumanControlBadge } from '@/components/decisions/HumanControlBadge';
import { getDecisionById } from '@/data/decisions';
import { cn } from '@/lib/utils';

export default function DecisionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [explanationOpen, setExplanationOpen] = useState(false);
  
  const decision = getDecisionById(id || '');

  if (!decision) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Decision not found</p>
        </div>
      </AppShell>
    );
  }

  const { insight, context, impact, stage, similarCases } = decision;
  
  // Get confidence value for display
  const confidenceValue = typeof insight.confidence === 'object' 
    ? insight.confidence 
    : { overall: insight.confidence };

  return (
    <AppShell>
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="mb-6 -ml-2 text-muted-foreground hover:text-foreground group"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Insights
      </Button>

      {/* Lifecycle Progress */}
      <Card className="bg-card border-border mb-6">
        <CardContent className="py-5 px-6">
          <LifecycleIndicator currentStage={stage} />
        </CardContent>
      </Card>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <PriorityIndicator priority={insight.priority} size="lg" />
          <span className="text-sm text-muted-foreground">Detected {insight.detectedAt}</span>
          {insight.momentum && (
            <span className={cn(
              'text-sm px-2 py-0.5 rounded-md',
              insight.momentum === 'accelerating' && 'bg-critical/15 text-critical',
              insight.momentum === 'degrading' && 'bg-warning/15 text-warning',
              insight.momentum === 'stable' && 'bg-muted text-muted-foreground',
              insight.momentum === 'improving' && 'bg-success/15 text-success'
            )}>
              {insight.momentum.charAt(0).toUpperCase() + insight.momentum.slice(1)}
            </span>
          )}
          <div className="flex-1" />
          <HumanControlBadge />
        </div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">{insight.title}</h1>
        <p className="text-lg text-muted-foreground">{insight.state}</p>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <ConfidenceMeter 
              value={confidenceValue} 
              size="lg" 
              showExplanation 
              showBreakdown={typeof insight.confidence === 'object'}
            />
          </CardContent>
        </Card>
        <ImpactCard 
          value={impact.value} 
          description={impact.description} 
          timeframe={impact.timeframe} 
        />
      </div>

      {/* Understanding Section */}
      <div className="space-y-4 mb-8">
        {/* What Happened */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-info/20 flex items-center justify-center">
                <FileText className="w-4 h-4 text-info" />
              </div>
              What is happening?
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pl-14">
            <p className="text-foreground leading-relaxed">{context.whatHappened}</p>
          </CardContent>
        </Card>

        {/* Why It Matters */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-warning" />
              </div>
              Why does this matter?
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pl-14">
            <p className="text-foreground leading-relaxed">{context.whyItMatters}</p>
          </CardContent>
        </Card>

        {/* Expandable Explanation - Evidence & What System Cannot See */}
        <Collapsible open={explanationOpen} onOpenChange={setExplanationOpen}>
          <Card className="bg-card border-border">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
                <CardTitle className="text-base font-medium flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                      <Eye className="w-4 h-4 text-success" />
                    </div>
                    Evidence & context
                  </div>
                  {explanationOpen ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0 pl-14 space-y-6">
                {/* Evidence List */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Supporting evidence</h4>
                  <EvidenceList evidence={context.evidence} />
                </div>
                
                {/* What System Cannot See */}
                {context.whatSystemCannotSee && (
                  <div className="bg-muted/30 rounded-xl p-4 border border-muted">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      What the system cannot see
                    </h4>
                    <p className="text-sm text-foreground">{context.whatSystemCannotSee}</p>
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>

      {/* If You Do Nothing - Mandatory Section */}
      <Card className="bg-warning/5 border-warning/30 mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center gap-2 text-warning">
            <AlertTriangle className="w-5 h-5" />
            If no action is taken
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <p className="text-foreground leading-relaxed">{context.inactionConsequence}</p>
          
          {/* Timeline Projection */}
          {context.inactionProjection && (
            <div className="bg-background/50 rounded-xl p-4 space-y-3 border border-warning/20">
              <h4 className="text-sm font-medium text-warning">Timeline projection</h4>
              <div className="grid gap-2">
                {context.inactionProjection.week1 && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-16">Week 1</span>
                    <span className="text-sm text-foreground">{context.inactionProjection.week1}</span>
                  </div>
                )}
                {context.inactionProjection.week4 && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-16">Week 4</span>
                    <span className="text-sm text-foreground">{context.inactionProjection.week4}</span>
                  </div>
                )}
                {context.inactionProjection.week8 && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-16">Week 8</span>
                    <span className="text-sm text-foreground">{context.inactionProjection.week8}</span>
                  </div>
                )}
                {context.inactionProjection.week12 && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-16">Week 12</span>
                    <span className="text-sm text-foreground">{context.inactionProjection.week12}</span>
                  </div>
                )}
              </div>
              <div className="pt-3 border-t border-warning/20 mt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total cost if no action:</span>
                  <span className="font-medium text-critical">{context.inactionProjection.totalCost}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-muted-foreground">With action:</span>
                  <span className="font-medium text-success">{context.inactionProjection.comparisonWithAction}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Similar Past Cases */}
      {similarCases && (
        <Card className="bg-card border-border mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-info/20 flex items-center justify-center">
                <History className="w-4 h-4 text-info" />
              </div>
              Historical context
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pl-14">
            <p className="text-sm text-muted-foreground mb-3">
              The system has seen <span className="text-foreground font-medium">{similarCases.count}</span> similar situations:
            </p>
            <div className="bg-muted/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Success rate</span>
                <span className="font-mono text-sm font-medium text-success">{similarCases.successRate}%</span>
              </div>
              {similarCases.mostSimilar && (
                <div className="pt-3 border-t border-border mt-2">
                  <span className="text-xs text-muted-foreground block mb-1">Most similar case:</span>
                  <p className="text-sm text-foreground">{similarCases.mostSimilar.description}</p>
                  <p className="text-xs text-success mt-1">{similarCases.mostSimilar.outcome}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* CTA */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground max-w-md">
          Ready to review the system's recommendation? You maintain full control over any action taken.
        </p>
        <Button 
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 group"
          onClick={() => navigate(`/decision/${id}/action`)}
        >
          View Recommendation
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </AppShell>
  );
}
