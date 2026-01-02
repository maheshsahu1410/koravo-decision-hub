import { cn } from '@/lib/utils';
import { RiskLevel } from '@/types/decision';
import { ShieldCheck, Shield, ShieldAlert } from 'lucide-react';

interface RiskIndicatorProps {
  risk: RiskLevel;
  showDescription?: boolean;
  className?: string;
}

const config = {
  low: {
    label: 'Low Risk',
    description: 'This action has minimal potential for negative impact.',
    icon: ShieldCheck,
    styles: 'bg-success/15 text-success border-success/30'
  },
  medium: {
    label: 'Medium Risk',
    description: 'Some potential for impact. Monitor closely after execution.',
    icon: Shield,
    styles: 'bg-warning/15 text-warning border-warning/30'
  },
  high: {
    label: 'High Risk',
    description: 'Significant potential impact. Consider carefully before proceeding.',
    icon: ShieldAlert,
    styles: 'bg-critical/15 text-critical border-critical/30'
  }
};

export function RiskIndicator({ risk, showDescription = false, className }: RiskIndicatorProps) {
  const { label, description, icon: Icon, styles } = config[risk];

  if (showDescription) {
    return (
      <div className={cn('rounded-lg border p-3', styles.replace('bg-', 'bg-').replace('/15', '/5'), className)}>
        <div className="flex items-center gap-2 mb-1">
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <p className="text-xs text-muted-foreground pl-6">{description}</p>
      </div>
    );
  }

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border',
      styles,
      className
    )}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}
