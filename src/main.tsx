import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import reportWebVitals from "./lib/web-vitals";

reportWebVitals((metric) => {
  if (process.env.NODE_ENV === 'development') {
    // Only log in development for debugging
    console.log(metric);
  }
  // In production, send to analytics service
  // analytics.track('web-vitals', metric);
});

createRoot(document.getElementById("root")!).render(<App />);
