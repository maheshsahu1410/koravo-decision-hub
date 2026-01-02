import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, AlertTriangle, FileText } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PriorityIndicator } from '@/components/decisions/PriorityIndicator';
import { ConfidenceMeter } from '@/components/decisions/ConfidenceMeter';
import { ImpactCard } from '@/components/decisions/ImpactCard';
import { EvidenceList } from '@/components/decisions/EvidenceList';
import { LifecycleIndicator } from '@/components/decisions/LifecycleIndicator';
import { HumanControlBadge } from '@/components/decisions/HumanControlBadge';
import { getDecisionById } from '@/data/decisions';

export default function DecisionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
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

  const { insight, context, impact, stage } = decision;

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
        <div className="flex items-center gap-3 mb-4">
          <PriorityIndicator priority={insight.priority} size="lg" />
          <span className="text-sm text-muted-foreground">Detected {insight.detectedAt}</span>
          <div className="flex-1" />
          <HumanControlBadge />
        </div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">{insight.title}</h1>
        <p className="text-lg text-muted-foreground">{insight.state}</p>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <ConfidenceMeter value={insight.confidence} size="lg" showExplanation />
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
                <span className="text-warning text-sm font-semibold">?</span>
              </div>
              Why does this matter?
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pl-14">
            <p className="text-foreground leading-relaxed">{context.whyItMatters}</p>
          </CardContent>
        </Card>

        {/* Evidence */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                <span className="text-success text-sm font-semibold">✓</span>
              </div>
              Supporting evidence
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pl-14">
            <EvidenceList evidence={context.evidence} />
          </CardContent>
        </Card>
      </div>

      {/* Inaction Warning */}
      <Card className="bg-warning/5 border-warning/30 mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center gap-2 text-warning">
            <AlertTriangle className="w-5 h-5" />
            If no action is taken
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-foreground leading-relaxed">{context.inactionConsequence}</p>
        </CardContent>
      </Card>

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
