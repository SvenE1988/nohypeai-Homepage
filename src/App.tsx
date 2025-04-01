
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Karriere from "./pages/Karriere";
import JobDetails from "./pages/JobDetails";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";
import { DialogProvider } from "./components/providers/DialogProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DialogProvider>
        <div className="glow-overlay" />
        <Toaster />
        <Sonner />
        <CookieConsent />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/karriere" element={<Karriere />} />
            <Route path="/karriere/:id" element={<JobDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DialogProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
