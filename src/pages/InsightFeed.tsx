import { useState } from 'react';
import { AlertCircle, Lightbulb, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { DecisionCard } from '@/components/decisions/DecisionCard';
import { Button } from '@/components/ui/button';
import { getPendingDecisions, getCriticalDecisions } from '@/data/decisions';
import { cn } from '@/lib/utils';

export default function InsightFeed() {
  const [focusMode, setFocusMode] = useState(true); // Default to Focus Mode per PDFs
  const [showCollapsed, setShowCollapsed] = useState(false);
  
  const allPendingDecisions = getPendingDecisions();
  const criticalDecisions = getCriticalDecisions();
  
  // Focus mode: only critical (max 3), otherwise all pending
  const visibleDecisions = focusMode 
    ? criticalDecisions.slice(0, 3) 
    : allPendingDecisions;
  
  const collapsedCount = focusMode 
    ? allPendingDecisions.length - visibleDecisions.length 
    : 0;
  
  const criticalCount = criticalDecisions.length;

  return (
    <AppShell>
      {/* Page Header */}
      <header className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Insight Feed</h1>
                <p className="text-sm text-muted-foreground">What needs your attention right now?</p>
              </div>
            </div>
          </div>
          
          {/* Focus Mode Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFocusMode(!focusMode)}
            className={cn(
              'gap-2',
              focusMode && 'border-primary bg-primary/10 text-primary'
            )}
          >
            {focusMode ? (
              <>
                <Eye className="w-4 h-4" />
                Focus Mode
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4" />
                All Insights
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Context Banner */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-8">
            <div>
              <span className="text-3xl font-mono font-semibold text-foreground">{allPendingDecisions.length}</span>
              <p className="text-xs text-muted-foreground mt-0.5">Pending decisions</p>
            </div>
            {criticalCount > 0 && (
              <>
                <div className="h-12 w-px bg-border" />
                <div>
                  <span className="text-3xl font-mono font-semibold text-critical">{criticalCount}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">Critical priority</p>
                </div>
              </>
            )}
          </div>
          <div className="max-w-sm text-right">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {focusMode 
                ? 'Showing only critical insights requiring immediate attention.' 
                : 'These insights represent decisions the system has identified as needing human judgment.'}
              <span className="text-foreground font-medium"> You decide. The system executes.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Decision Cards */}
      <div className="space-y-4">
        {visibleDecisions.map((decision, index) => (
          <DecisionCard key={decision.id} decision={decision} index={index} />
        ))}
      </div>

      {/* Collapsed Insights (Focus Mode) */}
      {focusMode && collapsedCount > 0 && (
        <div className="mt-6">
          <Button
            variant="ghost"
            className="w-full justify-between text-muted-foreground hover:text-foreground"
            onClick={() => setShowCollapsed(!showCollapsed)}
          >
            <span>{collapsedCount} more insights collapsed (non-critical)</span>
            {showCollapsed ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
          
          {showCollapsed && (
            <div className="space-y-4 mt-4">
              {allPendingDecisions
                .filter(d => !criticalDecisions.find(c => c.id === d.id))
                .map((decision, index) => (
                  <DecisionCard key={decision.id} decision={decision} index={index} />
                ))}
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {allPendingDecisions.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-3xl bg-success/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-success" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No decisions require attention right now</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            The system is monitoring operations. New decisions will surface when attention is needed.
          </p>
        </div>
      )}
    </AppShell>
  );
}
