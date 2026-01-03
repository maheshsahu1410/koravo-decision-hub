import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DecisionProvider } from "./context/DecisionContext";
import InsightFeed from "./pages/InsightFeed";
import DecisionDetail from "./pages/DecisionDetail";
import RecommendedAction from "./pages/RecommendedAction";
import ActionConfirmation from "./pages/ActionConfirmation";
import MonitoringList from "./pages/MonitoringList";
import MonitoringDetail from "./pages/MonitoringDetail";
import Deferred from "./pages/Deferred";
import History from "./pages/History";
import Learning from "./pages/Learning";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DecisionProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Decision Lifecycle Flow */}
            <Route path="/" element={<InsightFeed />} />
            <Route path="/decision/:id" element={<DecisionDetail />} />
            <Route path="/decision/:id/action" element={<RecommendedAction />} />
            <Route path="/decision/:id/confirm" element={<ActionConfirmation />} />
            
            {/* Monitoring */}
            <Route path="/monitoring" element={<MonitoringList />} />
            <Route path="/monitoring/:id" element={<MonitoringDetail />} />
            
            {/* Other */}
            <Route path="/deferred" element={<Deferred />} />
            <Route path="/history" element={<History />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DecisionProvider>
  </QueryClientProvider>
);

export default App;
