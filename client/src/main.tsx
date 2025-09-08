import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { ToastProvider } from "./components/ui/toast";
import "./index.css";

// React 19: Enable modern features
const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider swipeDirection="right">
        <App />
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
