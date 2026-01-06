import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import reportWebVitals from "./lib/web-vitals";
import { ThemeProvider } from "@/components/theme-provider";

// Set up theme on HTML element before React renders
if (typeof window !== 'undefined') {
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('vite-ui-theme');

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  html.classList.remove('light', 'dark');

  if (savedTheme && savedTheme !== 'system') {
    html.classList.add(savedTheme);
  } else {
    html.classList.add(systemTheme);
  }
}

reportWebVitals((metric) => {
  if (process.env.NODE_ENV === 'development') {
    // Only log in development for debugging
    console.log(metric);
  }
  // In production, send to analytics service
  // analytics.track('web-vitals', metric);
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme" enableSystem attribute="class">
    <App />
  </ThemeProvider>
);
