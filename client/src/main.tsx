import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { ToastProvider } from "./components/ui/toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider swipeDirection="right">
        <App />
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);
