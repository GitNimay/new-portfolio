import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MusicProvider } from "./context/MusicContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Analytics } from "@vercel/analytics/react";
import { MagicBackgroundProvider } from "./context/MagicBackgroundContext";
import { MagicThemeHandler } from "./components/MagicThemeHandler";
import LazyLoadingFallback from "./components/LazyLoadingFallback";

const Index = lazy(() => import("./pages/Index"));
const BlogListing = lazy(() => import("./pages/BlogListing"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ChatBot = lazy(() => import("./components/ChatBot"));

const IdleMount = ({ children }: { children: ReactNode }) => {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const requestIdle = window.requestIdleCallback ?? ((callback: IdleRequestCallback) => window.setTimeout(callback, 1200));
        const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
        const idleId = requestIdle(() => setShouldRender(true));

        return () => cancelIdle(idleId);
    }, []);

    return shouldRender ? children : null;
};

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
                                <Suspense fallback={<LazyLoadingFallback />}>
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
                            <IdleMount>
                                <Suspense fallback={null}>
                                    <ChatBot />
                                </Suspense>
                            </IdleMount>
                        </TooltipProvider>
                    </MagicBackgroundProvider>
                </MusicProvider>
            </HelmetProvider>
        </QueryClientProvider>
    </ErrorBoundary>
);

export default App;
