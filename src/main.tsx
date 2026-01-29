import { createRoot } from "react-dom/client";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import "./index.css";
import App from "./App";
import { initPerformanceMonitoring } from "./utils/performanceMonitoring";

// Initialize performance monitoring
initPerformanceMonitoring();

// Performance optimization: Preconnect to external domains
if (typeof window !== "undefined") {
  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = import.meta.env.VITE_CONVEX_URL as string;
  document.head.appendChild(link);
  
  // Add DNS prefetch for better performance
  const dnsPrefetch = document.createElement("link");
  dnsPrefetch.rel = "dns-prefetch";
  dnsPrefetch.href = import.meta.env.VITE_CONVEX_URL as string;
  document.head.appendChild(dnsPrefetch);
}

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

// Render app
createRoot(document.getElementById("root")!).render(
  <ConvexAuthProvider client={convex}>
    <App />
  </ConvexAuthProvider>,
);

// Performance: Register service worker for offline support
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      console.log("Service worker registration failed");
    });
  });
}
