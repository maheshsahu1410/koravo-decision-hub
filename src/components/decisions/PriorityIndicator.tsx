import { cn } from '@/lib/utils';
import { Priority } from '@/types/decision';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface PriorityIndicatorProps {
  priority: Priority;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const config = {
  critical: {
    label: 'Critical',
    icon: AlertCircle,
    styles: 'bg-critical/15 text-critical border-critical/30',
    pulse: true
  },
  high: {
    label: 'High Priority',
    icon: AlertTriangle,
    styles: 'bg-high/15 text-high border-high/30',
    pulse: false
  },
  medium: {
    label: 'Medium',
    icon: Info,
    styles: 'bg-medium/15 text-medium border-medium/30',
    pulse: false
  }
};

const sizes = {
  sm: 'px-2 py-0.5 text-[10px] gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
  lg: 'px-3 py-1.5 text-sm gap-2'
};

const iconSizes = {
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
  lg: 'w-4 h-4'
};

export function PriorityIndicator({ 
  priority, 
  size = 'md', 
  showLabel = true,
  className 
}: PriorityIndicatorProps) {
  const { label, icon: Icon, styles, pulse } = config[priority];

  return (
    <span className={cn(
      'inline-flex items-center rounded-md font-medium border uppercase tracking-wide',
      styles,
      sizes[size],
      pulse && 'animate-pulse-subtle',
      className
    )}>
      <Icon className={iconSizes[size]} />
      {showLabel && label}
    </span>
  );
}
