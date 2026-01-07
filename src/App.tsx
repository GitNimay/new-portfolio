import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MusicProvider } from "./context/MusicContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import { Analytics } from "@vercel/analytics/react";
import { MagicBackgroundProvider } from "./context/MagicBackgroundContext";
import { MagicThemeHandler } from "./components/MagicThemeHandler";

const Index = lazy(() => import("./pages/Index"));
const BlogListing = lazy(() => import("./pages/BlogListing"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
import ChatBot from "./components/ChatBot";

const PageSkeleton = () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-6xl w-full px-6">
            <Skeleton className="h-screen w-full" />
        </div>
    </div>
);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

const App = () => (
    <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
            <HelmetProvider>
                <MusicProvider>
                    <MagicBackgroundProvider>
                        <MagicThemeHandler />
                        <TooltipProvider>
                            <Toaster />
                            <Sonner />
                            <BrowserRouter>
                                <Suspense fallback={<PageSkeleton />}>
                                    <Routes>
                                        <Route path="/" element={<Index />} />
                                        <Route path="/blogs" element={<BlogListing />} />
                                        <Route path="/blogs/:slug" element={<BlogDetail />} />
                                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                                        <Route path="*" element={<NotFound />} />
                                    </Routes>
                                </Suspense>
                            </BrowserRouter>
                            <Analytics />
                            <ChatBot />
                        </TooltipProvider>
                    </MagicBackgroundProvider>
                </MusicProvider>
            </HelmetProvider>
        </QueryClientProvider>
    </ErrorBoundary>
);

export default App;
