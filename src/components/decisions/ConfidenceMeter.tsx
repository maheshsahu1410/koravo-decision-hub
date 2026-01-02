import { cn } from '@/lib/utils';

interface ConfidenceMeterProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showExplanation?: boolean;
  className?: string;
}

export function ConfidenceMeter({ 
  value, 
  size = 'md', 
  showExplanation = false,
  className 
}: ConfidenceMeterProps) {
  const getConfidenceLevel = (val: number) => {
    if (val >= 85) return { label: 'High confidence', color: 'bg-success', textColor: 'text-success' };
    if (val >= 70) return { label: 'Moderate confidence', color: 'bg-warning', textColor: 'text-warning' };
    return { label: 'Lower confidence', color: 'bg-critical', textColor: 'text-critical' };
  };

  const { label, color, textColor } = getConfidenceLevel(value);

  const heights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">System Confidence</span>
        <span className={cn('font-mono text-sm font-medium', textColor)}>
          {value}%
        </span>
      </div>
      <div className={cn('w-full bg-muted rounded-full overflow-hidden', heights[size])}>
        <div 
          className={cn('h-full rounded-full transition-all duration-700 ease-out', color)}
          style={{ width: `${value}%` }}
        />
      </div>
      {showExplanation && (
        <p className="text-xs text-muted-foreground">
          {label} — Based on historical patterns and data quality
        </p>
      )}
    </div>
  );
}
