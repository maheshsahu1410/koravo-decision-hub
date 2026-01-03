import { useLocation, Link } from 'react-router-dom';
import { 
  Lightbulb, 
  Activity, 
  History, 
  Settings,
  Hexagon,
  ChevronRight,
  BookOpen,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDecisions } from '@/context/DecisionContext';

const navItems = [
  { 
    label: 'Insights', 
    icon: Lightbulb, 
    path: '/',
    description: 'Decisions awaiting review',
    countKey: 'pending' as const
  },
  { 
    label: 'Monitoring', 
    icon: Activity, 
    path: '/monitoring',
    description: 'Active executions',
    countKey: 'executing' as const
  },
  { 
    label: 'Deferred', 
    icon: Clock, 
    path: '/deferred',
    description: 'Postponed decisions',
    countKey: 'deferred' as const
  },
  { 
    label: 'History', 
    icon: History, 
    path: '/history',
    description: 'Past decisions'
  },
  { 
    label: 'Learning', 
    icon: BookOpen, 
    path: '/learning',
    description: 'System adaptations'
  },
  { 
    label: 'Settings', 
    icon: Settings, 
    path: '/settings',
    description: 'System configuration'
  },
];

export function Sidebar() {
  const location = useLocation();
  const { pendingCount, executingCount, deferredCount } = useDecisions();

  const getCounts = (key?: 'pending' | 'executing' | 'deferred') => {
    if (key === 'pending') return pendingCount;
    if (key === 'executing') return executingCount;
    if (key === 'deferred') return deferredCount;
    return null;
  };

  return (
    <aside className="w-72 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
            <Hexagon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <span className="font-semibold text-foreground tracking-tight text-lg">KORAVO</span>
            <p className="text-[10px] text-muted-foreground leading-none mt-0.5 uppercase tracking-wider">
              Decision Intelligence
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 overflow-y-auto">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3 px-3">
          Decision Lifecycle
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/' && location.pathname.startsWith(item.path));
            const count = getCounts(item.countKey);
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200',
                    'group hover:bg-sidebar-accent',
                    isActive && 'bg-sidebar-accent'
                  )}
                >
                  <div className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200',
                    isActive ? 'bg-primary/20' : 'bg-muted/50 group-hover:bg-muted'
                  )}>
                    <item.icon className={cn(
                      'w-5 h-5 transition-colors',
                      isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={cn(
                      'block text-sm font-medium transition-colors',
                      isActive ? 'text-foreground' : 'text-sidebar-foreground group-hover:text-foreground'
                    )}>
                      {item.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                  {count !== null && count > 0 && (
                    <span className={cn(
                      'min-w-[24px] h-6 rounded-full text-xs font-medium flex items-center justify-center',
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-primary/20 text-primary'
                    )}>
                      {count}
                    </span>
                  )}
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-primary" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-gradient-to-br from-sidebar-accent to-sidebar-accent/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium text-foreground">System Healthy</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Continuously observing operations. All services operational.
          </p>
        </div>
      </div>
    </aside>
  );
}
