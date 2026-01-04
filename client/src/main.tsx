import { createRoot } from "react-dom/client";
import { Router } from "wouter";
import App from "./App";
import "./index.css";

// Register PWA service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(
      new URL('./sw.ts', import.meta.url),
      { scope: import.meta.env.BASE_URL || '/' }
    ).then((registration) => {
      console.log('Service Worker registered:', registration);
      
      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, 60000); // Check every minute
    }).catch((error) => {
      console.log('Service Worker registration failed:', error);
    });
  });
}

// Get base path from import.meta
const basePath = import.meta.env.BASE_URL || "/";

createRoot(document.getElementById("root")!).render(
  <Router base={basePath}>
    <App />
  </Router>
);
