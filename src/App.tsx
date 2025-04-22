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
import { AuthProvider } from "./contexts/AuthContext";
import { NavigationProvider } from "./contexts/NavigationContext";

// Components that are always needed
import CookieConsent from "./components/CookieConsent";
import CustomChat from "./components/CustomChat";
import LegalDialog from "./components/legal/LegalDialog";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

// Lazy-loaded pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Karriere = lazy(() => import("./pages/Karriere"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const Pricing = lazy(() => import("./pages/Pricing"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LiveTests = lazy(() => import("./pages/LiveTests"));
const ProposalGenerator = lazy(() => import("./pages/ProposalGenerator"));
const Auth = lazy(() => import("./pages/Auth"));
const Archiv = lazy(() => import("./pages/Archiv"));
const UeberUns = lazy(() => import("./pages/UeberUns"));
const FAQPage = lazy(() => import("./pages/FAQPage"));

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
            <AuthProvider>
              <NavigationProvider>
                <Suspense fallback={<LoadingScreen text="Wird geladen..." />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/karriere" element={<Karriere />} />
                    <Route path="/karriere/:id" element={<JobDetails />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/live-tests" element={<LiveTests />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route 
                      path="/proposals" 
                      element={
                        <ProtectedRoute>
                          <ProposalGenerator />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="/archiv" element={<Archiv />} />
                    <Route path="/ueber-uns" element={<UeberUns />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </Routes>
                </Suspense>
              </NavigationProvider>
            </AuthProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </DialogProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
