import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { SimulationProvider } from "@/contexts/SimulationContext";
import { ViewModeProvider } from "@/contexts/ViewModeContext";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TrackingPage from "./pages/TrackingPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SimulationProvider>
        <ViewModeProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/tracking" element={<TrackingPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </ViewModeProvider>
      </SimulationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
