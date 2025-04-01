
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page imports
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Karriere from "./pages/Karriere";
import JobDetails from "./pages/JobDetails";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

// Component imports
import CookieConsent from "./components/CookieConsent";
import { DialogProvider } from "./components/providers/DialogProvider";
import CustomChat from "./components/CustomChat";

// Create query client instance outside component to prevent recreation on renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DialogProvider>
        <div className="glow-overlay" />
        <Toaster />
        <Sonner />
        <CookieConsent />
        <CustomChat />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/karriere" element={<Karriere />} />
            <Route path="/karriere/:id" element={<JobDetails />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DialogProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
