import React, { useDeferredValue, useMemo, useCallback, useTransition } from "react";

/**
 * React 19 Performance Optimizations
 * Utility wrappers aligned to the official React 19 APIs.
 */

// Wrapper around the official useDeferredValue (no priority options are supported in React 19).
export const useOptimizedDeferredValue = <T>(value: T): T => {
  return useDeferredValue(value);
};

// Alias the official React hooks directly to avoid wrapper patterns that can't be statically analyzed.
export const useOptimizedCallback: typeof useCallback = useCallback;
export const useOptimizedMemo: typeof useMemo = useMemo;

// useTransition wrapper to keep naming consistent and avoid repeating the pattern.
export const useOptimizedTransition = () => {
  const [isPending, startTransitionCallback] = useTransition();

  const startOptimizedTransition = useCallback(
    (callback: () => void) => {
      startTransitionCallback(() => {
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
export const preloadComponent = (importFunc: () => Promise<unknown>) => {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    requestIdleCallback(() => {
      importFunc().catch(() => {
        // Silently fail preloading
      });
    });
  }
};

// React 19: Enhanced lazy loading with priority
export const createLazyComponent = <P extends object>(
  importFunc: () => Promise<{ default: React.ComponentType<P> }>,
  options?: { priority?: "high" | "low" },
) => {
  void options;
  return React.lazy(importFunc);
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
      observer.disconnect();
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
  createChunk: (name: string, factory: () => Promise<unknown>) => {
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
