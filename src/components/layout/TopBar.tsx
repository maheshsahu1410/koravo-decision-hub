import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HumanControlBadge } from '@/components/decisions/HumanControlBadge';
import { IntentSelector } from '@/components/decisions/IntentSelector';

export function TopBar() {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Left: Intent Selector + Human Control */}
      <div className="flex items-center gap-6">
        <IntentSelector variant="compact" />
        <div className="h-8 w-px bg-border" />
        <HumanControlBadge />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                2
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Notifications</TooltipContent>
        </Tooltip>

        <div className="h-8 w-px bg-border" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">Operations Manager</p>
            <p className="text-[10px] text-muted-foreground">Approval Authority</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center ring-2 ring-border">
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
