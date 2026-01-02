import { cn } from '@/lib/utils';

interface ConfidenceBarProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function ConfidenceBar({ 
  value, 
  size = 'md', 
  showLabel = true,
  className 
}: ConfidenceBarProps) {
  const getConfidenceColor = (val: number) => {
    if (val >= 80) return 'bg-success';
    if (val >= 60) return 'bg-warning';
    return 'bg-critical';
  };

  const heights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn('flex-1 bg-muted rounded-full overflow-hidden', heights[size])}>
        <div 
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            getConfidenceColor(value)
          )}
          style={{ width: `${value}%` }}
        />
      </div>
      {showLabel && (
        <span className="font-mono-metric text-sm text-foreground min-w-[3rem] text-right">
          {value}%
        </span>
      )}
    </div>
  );
}
