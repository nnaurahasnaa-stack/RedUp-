import { createRoot } from "react-dom/client";
import { Router } from "wouter";
import App from "./App";
import "./index.css";

// Get base path from import.meta
const basePath = import.meta.env.BASE_URL || "/";

createRoot(document.getElementById("root")!).render(
  <Router base={basePath}>
    <App />
  </Router>
);
