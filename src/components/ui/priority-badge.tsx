import { cn } from '@/lib/utils';
import { Priority } from '@/data/mockData';

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const styles = {
    critical: 'bg-critical/15 text-critical border-critical/30',
    high: 'bg-high/15 text-high border-high/30',
    medium: 'bg-medium/15 text-medium border-medium/30',
  };

  const labels = {
    critical: 'Critical',
    high: 'High',
    medium: 'Medium',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border uppercase tracking-wide',
      styles[priority],
      priority === 'critical' && 'animate-pulse-subtle',
      className
    )}>
      {labels[priority]}
    </span>
  );
}
