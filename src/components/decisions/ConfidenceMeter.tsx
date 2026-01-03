import { cn } from '@/lib/utils';
import { Confidence } from '@/types/decision';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface ConfidenceMeterProps {
  value: number | Confidence;
  size?: 'sm' | 'md' | 'lg';
  showExplanation?: boolean;
  showBreakdown?: boolean;
  className?: string;
}

export function ConfidenceMeter({ 
  value, 
  size = 'md', 
  showExplanation = false,
  showBreakdown = false,
  className 
}: ConfidenceMeterProps) {
  const isDetailed = typeof value === 'object';
  const overallValue = isDetailed ? value.overall : value;

  const getConfidenceLevel = (val: number) => {
    if (val >= 85) return { label: 'High confidence', color: 'bg-success', textColor: 'text-success' };
    if (val >= 70) return { label: 'Moderate confidence', color: 'bg-warning', textColor: 'text-warning' };
    return { label: 'Lower confidence', color: 'bg-critical', textColor: 'text-critical' };
  };

  const { label, color, textColor } = getConfidenceLevel(overallValue);

  const heights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">System Confidence</span>
          {isDetailed && value.explanation && (
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p className="text-sm">{value.explanation}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <span className={cn('font-mono text-sm font-medium', textColor)}>
          {overallValue}%
        </span>
      </div>
      <div className={cn('w-full bg-muted rounded-full overflow-hidden', heights[size])}>
        <div 
          className={cn('h-full rounded-full transition-all duration-700 ease-out', color)}
          style={{ width: `${overallValue}%` }}
        />
      </div>
      
      {/* Breakdown for detailed confidence */}
      {showBreakdown && isDetailed && (
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border">
          {value.dataQuality !== undefined && (
            <div>
              <span className="text-[10px] text-muted-foreground block">Data Quality</span>
              <span className="text-xs font-mono font-medium text-foreground">{value.dataQuality}%</span>
            </div>
          )}
          {value.modelPerformance !== undefined && (
            <div>
              <span className="text-[10px] text-muted-foreground block">Model</span>
              <span className="text-xs font-mono font-medium text-foreground">{value.modelPerformance}%</span>
            </div>
          )}
          {value.contextualFactors !== undefined && (
            <div>
              <span className="text-[10px] text-muted-foreground block">Context</span>
              <span className="text-xs font-mono font-medium text-foreground">{value.contextualFactors}%</span>
            </div>
          )}
        </div>
      )}
      
      {showExplanation && (
        <p className="text-xs text-muted-foreground">
          {label} — Based on historical patterns and data quality
        </p>
      )}
    </div>
  );
}
