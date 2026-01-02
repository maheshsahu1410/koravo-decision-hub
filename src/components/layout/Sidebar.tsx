import { useLocation, Link } from 'react-router-dom';
import { 
  Lightbulb, 
  Activity, 
  History, 
  Settings,
  Hexagon
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { 
    label: 'Insights', 
    icon: Lightbulb, 
    path: '/',
    description: 'Decisions awaiting review'
  },
  { 
    label: 'Monitoring', 
    icon: Activity, 
    path: '/monitoring',
    description: 'Active executions'
  },
  { 
    label: 'History', 
    icon: History, 
    path: '/history',
    description: 'Past decisions'
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

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Hexagon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <span className="font-semibold text-foreground tracking-tight text-lg">KORAVO</span>
            <p className="text-[10px] text-muted-foreground leading-none mt-0.5">Decision Intelligence</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/' && location.pathname.startsWith(item.path));
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                    'group hover:bg-sidebar-accent',
                    isActive && 'bg-sidebar-accent text-sidebar-accent-foreground'
                  )}
                >
                  <item.icon className={cn(
                    'w-5 h-5 transition-colors',
                    isActive ? 'text-primary' : 'text-sidebar-foreground group-hover:text-foreground'
                  )} />
                  <div className="flex-1 min-w-0">
                    <span className={cn(
                      'block text-sm font-medium transition-colors',
                      isActive ? 'text-foreground' : 'text-sidebar-foreground group-hover:text-foreground'
                    )}>
                      {item.label}
                    </span>
                  </div>
                  {item.path === '/' && (
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-medium flex items-center justify-center">
                      3
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium text-foreground">System Healthy</span>
          </div>
          <p className="text-xs text-muted-foreground">
            All services operational
          </p>
        </div>
      </div>
    </aside>
  );
}
