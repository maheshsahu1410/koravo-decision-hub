import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InsightFeed from "./pages/InsightFeed";
import InsightDetail from "./pages/InsightDetail";
import RecommendedAction from "./pages/RecommendedAction";
import ActionConfirmation from "./pages/ActionConfirmation";
import Monitoring from "./pages/Monitoring";
import MonitoringList from "./pages/MonitoringList";
import History from "./pages/History";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Insight Flow */}
          <Route path="/" element={<InsightFeed />} />
          <Route path="/insight/:id" element={<InsightDetail />} />
          <Route path="/action/:insightId" element={<RecommendedAction />} />
          <Route path="/confirm/:insightId" element={<ActionConfirmation />} />
          
          {/* Monitoring */}
          <Route path="/monitoring" element={<MonitoringList />} />
          <Route path="/monitoring/:insightId" element={<Monitoring />} />
          
          {/* Other */}
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
