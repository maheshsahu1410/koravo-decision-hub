import { ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { ConfidenceBar } from '@/components/ui/confidence-bar';
import { Insight } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface InsightCardProps {
  insight: Insight;
  index: number;
}

export function InsightCard({ insight, index }: InsightCardProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className={cn(
        'decision-card bg-card border-border cursor-pointer group',
        'animate-fade-in-up'
      )}
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={() => navigate(`/insight/${insight.id}`)}
    >
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <PriorityBadge priority={insight.priority} />
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {insight.detectedAt}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
              {insight.title}
            </h3>
          </div>
        </div>

        {/* Confidence */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">Confidence</span>
          </div>
          <ConfidenceBar value={insight.confidence} size="sm" />
        </div>

        {/* Impact */}
        <div className="bg-muted/50 rounded-lg p-3 mb-4">
          <span className="text-xs text-muted-foreground block mb-1">Estimated Impact</span>
          <div className="flex items-baseline gap-2">
            <span className="font-mono-metric text-xl text-foreground">{insight.impactValue}</span>
            <span className="text-sm text-muted-foreground">{insight.impactDescription}</span>
          </div>
        </div>

        {/* Action */}
        <Button 
          variant="ghost" 
          className="w-full justify-between text-primary hover:bg-primary/10 hover:text-primary"
        >
          Review Insight
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
