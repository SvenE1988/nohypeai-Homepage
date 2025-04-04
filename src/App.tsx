
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "./components/ui/error-boundary";
import { LoadingScreen } from "./components/ui/loading-spinner";

// Providers
import { DialogProvider } from "./components/providers/DialogProvider";

// Components that are always needed
import CookieConsent from "./components/CookieConsent";
import CustomChat from "./components/CustomChat";

// Lazy-loaded pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Karriere = lazy(() => import("./pages/Karriere"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const Pricing = lazy(() => import("./pages/Pricing"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LiveTests = lazy(() => import("./pages/LiveTests"));

// Create query client instance outside component to prevent recreation on renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false, // Disable refetching when window regains focus
    },
  },
});

// App version for cache busting if needed
const APP_VERSION = "1.0.0";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DialogProvider>
        <ErrorBoundary>
          <div className="glow-overlay" />
          <Toaster />
          <Sonner />
          <CookieConsent />
          <CustomChat />
          
          <BrowserRouter>
            <Suspense fallback={<LoadingScreen text="Wird geladen..." />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/karriere" element={<Karriere />} />
                <Route path="/karriere/:id" element={<JobDetails />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/live-tests" element={<LiveTests />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ErrorBoundary>
      </DialogProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
