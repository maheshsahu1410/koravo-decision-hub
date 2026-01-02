import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { DecisionProvider } from '@/context/DecisionContext';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <DecisionProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <main className="flex-1 overflow-auto">
            <div className="p-6 lg:p-8 max-w-5xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </DecisionProvider>
  );
}
