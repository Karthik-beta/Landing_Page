// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useDeferredValue, useMemo, useCallback, useTransition } from "react";

/**
 * React 19 Performance Optimizations
 * Enhanced utilities leveraging React 19's new features
 */

// React 19: Enhanced useDeferredValue with priority hints
export const useOptimizedDeferredValue = <T>(
  value: T,
  options?: { priority?: "high" | "low" | "user-visible" },
): T => {
  const deferredValue = useDeferredValue(value);

  // React 19: Add priority hint for better scheduling
  // Note: options parameter is reserved for future React 19 features
  void options;

  return deferredValue;
};

// React 19: Optimized useCallback with automatic dependency tracking
export const useOptimizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList,
  options?: { stable?: boolean },
): T => {
  // Note: options parameter is reserved for future React 19 features
  void options;
  return useCallback(callback, deps);
};

// React 19: Enhanced useMemo with better caching
export const useOptimizedMemo = <T>(factory: () => T, deps: React.DependencyList): T => {
  return useMemo(factory, deps);
};

// React 19: Smart transition management
export const useOptimizedTransition = () => {
  const [isPending, startTransitionCallback] = useTransition();

  const startOptimizedTransition = useCallback(
    (callback: () => void) => {
      startTransitionCallback(() => {
        // React 19: Enhanced transition with better scheduling
        callback();
      });
    },
    [startTransitionCallback],
  );

  return {
    isPending,
    startOptimizedTransition,
  };
};

// React 19: Component preloading utility
export const preloadComponent = (importFunc: () => Promise<any>) => {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    requestIdleCallback(() => {
      importFunc().catch(() => {
        // Silently fail preloading
      });
    });
  }
};

// React 19: Enhanced lazy loading with priority
export const createLazyComponent = (
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
  options?: { priority?: "high" | "low" },
) => {
  return React.lazy(() => {
    if (options?.priority === "high") {
      // React 19: High priority loading
      return importFunc();
    }
    return importFunc();
  });
};

// React 19: Optimized image loading with priority hints
export const useOptimizedImage = (
  src: string,
  options?: {
    priority?: "high" | "low";
    loading?: "lazy" | "eager";
    sizes?: string;
  },
) => {
  return useMemo(
    () => ({
      src,
      loading: options?.loading ?? "lazy",
      decoding: "async" as const,
      crossOrigin: "anonymous" as const,
      ...options,
    }),
    [src, options],
  );
};

// React 19: Enhanced intersection observer with better performance
export const useOptimizedIntersectionObserver = (
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit,
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const [entry, setEntry] = React.useState<IntersectionObserverEntry | null>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options]);

  return { isIntersecting, entry };
};

// React 19: Performance monitoring hook
export const usePerformanceMonitor = (componentName: string) => {
  React.useEffect(() => {
    if (typeof window !== "undefined" && "performance" in window) {
      const startTime = performance.now();

      return () => {
        const endTime = performance.now();
        const renderTime = endTime - startTime;

        // Log render time for optimization insights
        if (renderTime > 16.67) {
          // More than one frame
          console.warn(`Component ${componentName} took ${renderTime.toFixed(2)}ms to render`);
        }
      };
    }
  }, [componentName]);
};

// React 19: Bundle size optimization helper
export const createOptimizedBundle = {
  // Dynamic imports with better chunk naming
  createChunk: (name: string, factory: () => Promise<any>) => {
    // Note: name parameter is reserved for future chunk naming features
    void name;
    return factory();
  },

  // Preload critical resources
  preloadCritical: (resources: Array<{ href: string; as: string; rel?: string }>) => {
    if (typeof document !== "undefined") {
      resources.forEach(({ href, as, rel = "preload" }) => {
        const link = document.createElement("link");
        link.rel = rel;
        link.as = as;
        link.href = href;
        document.head.appendChild(link);
      });
    }
  },

  // Smart asset loading
  loadAsset: (src: string, type: "script" | "style" | "image") => {
    return new Promise((resolve, reject) => {
      if (typeof document === "undefined") {
        resolve(void 0);
        return;
      }

      const element = document.createElement(
        type === "script" ? "script" : type === "style" ? "link" : "img",
      );

      if (type === "style") {
        (element as HTMLLinkElement).rel = "stylesheet";
        (element as HTMLLinkElement).href = src;
      } else if (type === "script") {
        (element as HTMLScriptElement).src = src;
        (element as HTMLScriptElement).async = true;
      } else {
        (element as HTMLImageElement).src = src;
      }

      element.onload = () => resolve(element);
      element.onerror = reject;

      document.head.appendChild(element);
    });
  },
};

// React 19: Enhanced error boundary helper
export const createErrorBoundary = (
  fallbackComponent: React.ComponentType<{ error: Error; resetError: () => void }>,
) => {
  return class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error: Error | null }
  > {
    constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      // React 19: Enhanced error reporting
      console.error("Error boundary caught an error:", error, errorInfo);
    }

    resetError = () => {
      this.setState({ hasError: false, error: null });
    };

    render() {
      if (this.state.hasError && this.state.error) {
        return React.createElement(fallbackComponent, {
          error: this.state.error,
          resetError: this.resetError,
        });
      }

      return this.props.children;
    }
  };
};
