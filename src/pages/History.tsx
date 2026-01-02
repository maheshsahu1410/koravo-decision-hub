import { History as HistoryIcon, CheckCircle2 } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent } from '@/components/ui/card';

export default function History() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <HistoryIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">History</h1>
              <p className="text-sm text-muted-foreground">Past decisions and their outcomes</p>
            </div>
          </div>
        </header>

        {/* Empty State */}
        <Card className="bg-card border-border">
          <CardContent className="py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">History will appear here</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Completed executions and their outcomes will be recorded here for audit and learning purposes.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
