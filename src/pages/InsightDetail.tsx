import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { ConfidenceBar } from '@/components/ui/confidence-bar';
import { getInsightById } from '@/data/mockData';

export default function InsightDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const insight = getInsightById(id || '');

  if (!insight) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Insight not found</p>
        </div>
      </AppShell>
    );
  }

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
            <PriorityBadge priority={insight.priority} />
            <span className="text-sm text-muted-foreground">{insight.detectedAt}</span>
          </div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">{insight.title}</h1>
          <p className="text-muted-foreground">{insight.state}</p>
        </header>

        {/* Confidence & Impact Row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <span className="text-xs text-muted-foreground block mb-2">System Confidence</span>
              <ConfidenceBar value={insight.confidence} size="lg" />
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <span className="text-xs text-muted-foreground block mb-2">Estimated Impact</span>
              <div className="flex items-baseline gap-2">
                <span className="font-mono-metric text-2xl text-foreground">{insight.impactValue}</span>
                <span className="text-sm text-muted-foreground">{insight.impactDescription}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What Happened */}
        <Card className="bg-card border-border mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-info/20 flex items-center justify-center">
                <span className="text-info text-xs font-bold">1</span>
              </div>
              What Happened
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-foreground leading-relaxed">{insight.whyItHappened}</p>
          </CardContent>
        </Card>

        {/* Evidence */}
        <Card className="bg-card border-border mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-info/20 flex items-center justify-center">
                <span className="text-info text-xs font-bold">2</span>
              </div>
              Evidence
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-3">
              {insight.evidence.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="text-foreground">{item.statement}</span>
                    {item.metric && (
                      <span className="ml-2 font-mono-metric text-sm text-muted-foreground">
                        ({item.metric})
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Inaction Impact */}
        <Card className="bg-warning/5 border-warning/30 mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2 text-warning">
              <AlertTriangle className="w-5 h-5" />
              If You Do Nothing
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-foreground leading-relaxed">{insight.inactionImpact}</p>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="flex justify-end">
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => navigate(`/action/${insight.id}`)}
          >
            View Recommended Action
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
