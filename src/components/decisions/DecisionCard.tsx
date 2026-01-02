import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Decision } from '@/types/decision';
import { PriorityIndicator } from './PriorityIndicator';
import { ConfidenceMeter } from './ConfidenceMeter';
import { ImpactCard } from './ImpactCard';
import { LifecycleIndicator } from './LifecycleIndicator';
import { cn } from '@/lib/utils';

interface DecisionCardProps {
  decision: Decision;
  index?: number;
}

export function DecisionCard({ decision, index = 0 }: DecisionCardProps) {
  const navigate = useNavigate();
  const { insight, impact, stage } = decision;

  return (
    <Card 
      className={cn(
        'group cursor-pointer transition-all duration-300',
        'bg-card border-border hover:border-primary/30',
        'hover:shadow-[0_0_40px_hsl(38_92%_50%_/_0.08)]',
        'animate-fade-in-up'
      )}
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={() => navigate(`/decision/${decision.id}`)}
    >
      <CardContent className="p-6">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <PriorityIndicator priority={insight.priority} />
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Detected {insight.detectedAt}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
              {insight.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{insight.state}</p>
          </div>
          <LifecycleIndicator currentStage={stage} compact />
        </div>

        {/* Confidence & Impact */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-muted/30 rounded-xl p-4">
            <ConfidenceMeter value={insight.confidence} size="sm" />
          </div>
          <div className="bg-gradient-to-br from-critical/5 to-critical/10 border border-critical/20 rounded-xl p-4">
            <span className="text-[10px] text-critical font-medium uppercase tracking-wide block mb-1">
              Impact
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-lg font-semibold text-foreground">{impact.value}</span>
              <span className="text-xs text-muted-foreground">{impact.timeframe}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button 
          variant="ghost" 
          className="w-full justify-between text-primary hover:bg-primary/10 group/btn"
        >
          <span>Review this decision</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
