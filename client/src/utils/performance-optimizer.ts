// Modern browser performance utilities

type SchedulerPriority = "background" | "user-blocking" | "user-visible";

type Scheduler = {
  postTask?: (callback: () => void, options?: { priority?: SchedulerPriority }) => void;
};

type WindowWithScheduler = Window & { scheduler?: Scheduler };

type FetchPriority = "high" | "low" | "auto";

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
}

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

type PerformanceWithMemory = Performance & {
  memory?: {
    usedJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
};

type NetworkInformation = {
  effectiveType?: string;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation;
};

type BatteryManager = {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
};

type NavigatorWithBattery = Navigator & {
  getBattery?: () => Promise<BatteryManager>;
};

type ServiceWorkerRegistrationWithSync = ServiceWorkerRegistration & {
  sync: {
    register: (tag: string) => Promise<void>;
  };
};

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
      } catch {
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
        this.metrics.set("FID", (entry as PerformanceEventTiming).processingStart - entry.startTime);
        break;
      case "layout-shift":
        if (!(entry as LayoutShift).hadRecentInput) {
          const currentCLS = this.metrics.get("CLS") || 0;
          this.metrics.set("CLS", currentCLS + (entry as LayoutShift).value);
        }
        break;
    }
  }

  // Memory usage monitoring with Memory API
  private monitorMemoryUsage() {
    const memInfo = (performance as PerformanceWithMemory).memory;
    if (memInfo) {
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
    (img as HTMLImageElement & { fetchPriority?: FetchPriority }).fetchPriority = priority;
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
        const reg = registration as ServiceWorkerRegistrationWithSync;
        return reg.sync.register(tag);
      });
    }
  }

  // Modern scheduler API for task prioritization
  static scheduleTask(
    callback: () => void,
    priority: "background" | "user-blocking" | "user-visible" = "user-visible",
  ) {
    const scheduler = (window as WindowWithScheduler).scheduler;
    if (scheduler?.postTask) {
      scheduler.postTask(callback, { priority });
    } else if ("requestIdleCallback" in window) {
      requestIdleCallback(callback);
    } else {
      setTimeout(callback, 0);
    }
  }

  // Connection-aware loading
  static getConnectionSpeed(): "slow" | "fast" | "unknown" {
    const connection = (navigator as NavigatorWithConnection).connection;
    if (connection?.effectiveType === "4g") return "fast";
    if (connection?.effectiveType === "3g" || connection?.effectiveType === "2g") return "slow";
    return "unknown";
  }

  // Battery-aware optimizations
  static async getBatteryInfo() {
    const nav = navigator as NavigatorWithBattery;
    if (nav.getBattery) {
      try {
        const battery = await nav.getBattery();
        return {
          charging: battery.charging,
          level: battery.level,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
        };
      } catch {
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
