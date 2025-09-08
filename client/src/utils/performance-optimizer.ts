// Modern browser performance utilities
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private observer: PerformanceObserver | null = null;
  private metrics: Map<string, number> = new Map();

  private constructor() {
    this.initializePerformanceMonitoring();
  }

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Initialize performance monitoring with modern APIs
  private initializePerformanceMonitoring() {
    if (typeof window === "undefined") return;

    // Web Vitals monitoring
    if ("PerformanceObserver" in window) {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.handlePerformanceEntry(entry);
        }
      });

      // Observe multiple performance metrics
      try {
        this.observer.observe({
          entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"],
        });
      } catch (e) {
        console.warn("Performance monitoring not fully supported");
      }
    }

    // Memory usage monitoring
    this.monitorMemoryUsage();
  }

  private handlePerformanceEntry(entry: PerformanceEntry) {
    switch (entry.entryType) {
      case "largest-contentful-paint":
        this.metrics.set("LCP", entry.startTime);
        break;
      case "first-input":
        this.metrics.set("FID", (entry as any).processingStart - entry.startTime);
        break;
      case "layout-shift":
        if (!(entry as any).hadRecentInput) {
          const currentCLS = this.metrics.get("CLS") || 0;
          this.metrics.set("CLS", currentCLS + (entry as any).value);
        }
        break;
    }
  }

  // Memory usage monitoring with Memory API
  private monitorMemoryUsage() {
    if ("memory" in performance) {
      const memInfo = (performance as any).memory;
      this.metrics.set("JSHeapSize", memInfo.usedJSHeapSize);
      this.metrics.set("JSHeapLimit", memInfo.jsHeapSizeLimit);
    }
  }

  // Resource hints for critical resources
  static preloadResource(href: string, type: "script" | "style" | "image" | "font") {
    if (typeof document === "undefined") return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.href = href;
    link.as = type;

    if (type === "font") {
      link.crossOrigin = "anonymous";
    }

    document.head.appendChild(link);
  }

  // Prefetch for likely navigation
  static prefetchResource(href: string) {
    if (typeof document === "undefined") return;

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.head.appendChild(link);
  }

  // Priority hints for images
  static addImagePriorityHint(img: HTMLImageElement, priority: "high" | "low" | "auto") {
    if ("fetchPriority" in img) {
      (img as any).fetchPriority = priority;
    }
  }

  // Service Worker for caching
  static async registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        console.log("Service Worker registered:", registration);
      } catch (error) {
        console.log("Service Worker registration failed:", error);
      }
    }
  }

  // Background sync for offline form submissions
  static requestBackgroundSync(tag: string) {
    if ("serviceWorker" in navigator && "sync" in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then((registration) => {
        return (registration as any).sync.register(tag);
      });
    }
  }

  // Modern scheduler API for task prioritization
  static scheduleTask(
    callback: () => void,
    priority: "background" | "user-blocking" | "user-visible" = "user-visible",
  ) {
    if ("scheduler" in window && "postTask" in (window as any).scheduler) {
      (window as any).scheduler.postTask(callback, { priority });
    } else if ("requestIdleCallback" in window) {
      requestIdleCallback(callback);
    } else {
      setTimeout(callback, 0);
    }
  }

  // Connection-aware loading
  static getConnectionSpeed(): "slow" | "fast" | "unknown" {
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      if (connection.effectiveType === "4g") return "fast";
      if (connection.effectiveType === "3g" || connection.effectiveType === "2g") return "slow";
    }
    return "unknown";
  }

  // Battery-aware optimizations
  static async getBatteryInfo() {
    if ("getBattery" in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        return {
          charging: battery.charging,
          level: battery.level,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
        };
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  // Get performance metrics
  getMetrics() {
    return new Map(this.metrics);
  }

  // Clean up
  disconnect() {
    this.observer?.disconnect();
  }
}

// React hook for performance optimization
export function usePerformanceOptimizations() {
  const optimizer = PerformanceOptimizer.getInstance();

  const scheduleBackgroundTask = (callback: () => void) => {
    PerformanceOptimizer.scheduleTask(callback, "background");
  };

  const isSlowConnection = () => {
    return PerformanceOptimizer.getConnectionSpeed() === "slow";
  };

  return {
    scheduleBackgroundTask,
    isSlowConnection,
    preloadResource: PerformanceOptimizer.preloadResource,
    prefetchResource: PerformanceOptimizer.prefetchResource,
    metrics: optimizer.getMetrics(),
  };
}
