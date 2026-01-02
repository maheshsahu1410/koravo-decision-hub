import { cn } from '@/lib/utils';
import { Trajectory } from '@/data/mockData';
import { TrendingUp, AlertTriangle, TrendingDown } from 'lucide-react';

interface TrajectoryBadgeProps {
  trajectory: Trajectory;
  className?: string;
}

export function TrajectoryBadge({ trajectory, className }: TrajectoryBadgeProps) {
  const styles = {
    on_track: 'bg-success/15 text-success border-success/30',
    at_risk: 'bg-warning/15 text-warning border-warning/30',
    off_track: 'bg-critical/15 text-critical border-critical/30',
  };

  const labels = {
    on_track: 'On Track',
    at_risk: 'At Risk',
    off_track: 'Off Track',
  };

  const icons = {
    on_track: TrendingUp,
    at_risk: AlertTriangle,
    off_track: TrendingDown,
  };

  const Icon = icons[trajectory];

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border',
      styles[trajectory],
      className
    )}>
      <Icon className="w-3.5 h-3.5" />
      {labels[trajectory]}
    </span>
  );
}
