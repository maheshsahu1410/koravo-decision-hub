import { cn } from '@/lib/utils';
import { TrendingDown } from 'lucide-react';

interface ImpactCardProps {
  value: string;
  description: string;
  timeframe: string;
  className?: string;
}

export function ImpactCard({ value, description, timeframe, className }: ImpactCardProps) {
  return (
    <div className={cn(
      'bg-gradient-to-br from-critical/5 to-critical/10 border border-critical/20 rounded-xl p-4',
      className
    )}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs text-critical font-medium uppercase tracking-wide">
          Estimated Impact
        </span>
        <TrendingDown className="w-4 h-4 text-critical" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-2xl font-semibold text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{description}</span>
      </div>
      <span className="text-xs text-muted-foreground">{timeframe}</span>
    </div>
  );
}
