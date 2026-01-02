import { cn } from '@/lib/utils';
import { RiskLevel } from '@/data/mockData';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

interface RiskBadgeProps {
  risk: RiskLevel;
  showIcon?: boolean;
  className?: string;
}

export function RiskBadge({ risk, showIcon = true, className }: RiskBadgeProps) {
  const styles = {
    low: 'bg-success/15 text-success border-success/30',
    medium: 'bg-warning/15 text-warning border-warning/30',
    high: 'bg-critical/15 text-critical border-critical/30',
  };

  const labels = {
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk',
  };

  const icons = {
    low: ShieldCheck,
    medium: Shield,
    high: ShieldAlert,
  };

  const Icon = icons[risk];

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border',
      styles[risk],
      className
    )}>
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      {labels[risk]}
    </span>
  );
}
