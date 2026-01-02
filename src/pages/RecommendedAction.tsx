import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, RotateCcw, Check, X, Pause } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { RiskBadge } from '@/components/ui/risk-badge';
import { getInsightById, getActionForInsight } from '@/data/mockData';

export default function RecommendedAction() {
  const { insightId } = useParams<{ insightId: string }>();
  const navigate = useNavigate();
  
  const insight = getInsightById(insightId || '');
  const action = getActionForInsight(insightId || '');

  const [parameters, setParameters] = useState(
    action?.parameters.reduce((acc, p) => ({ ...acc, [p.id]: p.value }), {}) || {}
  );

  if (!insight || !action) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Action not found</p>
        </div>
      </AppShell>
    );
  }

  const handleParameterChange = (paramId: string, value: number[]) => {
    setParameters(prev => ({ ...prev, [paramId]: value[0] }));
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate(`/insight/${insightId}`)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Insight
        </Button>

        {/* Header */}
        <header className="mb-8">
          <span className="text-sm text-muted-foreground block mb-2">Recommended Action for</span>
          <h1 className="text-2xl font-semibold text-foreground mb-2">{insight.title}</h1>
        </header>

        {/* Action Card */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">
              {action.action}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Metadata Row */}
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Duration:</span>
                <span className="text-sm font-medium text-foreground">{action.duration}</span>
              </div>
              <RiskBadge risk={action.riskLevel} />
              {action.rollbackAvailable && (
                <div className="flex items-center gap-2 text-success">
                  <RotateCcw className="w-4 h-4" />
                  <span className="text-sm">Rollback Available</span>
                </div>
              )}
            </div>

            {/* Expected Outcome */}
            <div className="bg-success/5 border border-success/20 rounded-lg p-4">
              <h4 className="text-sm font-medium text-success mb-2">Expected Outcome</h4>
              <p className="text-foreground">{action.expectedOutcome}</p>
            </div>

            {/* Adjustable Parameters */}
            {action.parameters.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Adjust Parameters (Optional)</h4>
                <div className="space-y-6">
                  {action.parameters.map(param => (
                    <div key={param.id} className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-foreground">{param.label}</span>
                        <span className="font-mono-metric text-lg text-primary">
                          {(parameters as Record<string, number>)[param.id] || param.value}{param.unit}
                        </span>
                      </div>
                      <Slider
                        value={[(parameters as Record<string, number>)[param.id] || param.value]}
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
              Defer
            </Button>
          </div>
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => navigate(`/confirm/${insightId}`)}
          >
            <Check className="w-4 h-4 mr-2" />
            Approve Action
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
