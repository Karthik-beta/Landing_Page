// React 19: Enhanced loader hook with use() for better suspense
import { use, useMemo } from "react";

interface LoaderOptions {
  priority: "high" | "medium" | "low";
  preload?: boolean;
}

// Create a smart component loader that uses React 19's use() hook
export function createOptimizedLoader<T>(
  importFn: () => Promise<{ default: T }>,
  options: LoaderOptions = { priority: "medium" },
) {
  // Cache promises to avoid duplicate requests
  const promiseCache = new Map<string, Promise<{ default: T }>>();

  return function useOptimizedComponent(key: string = "default") {
    const promise = useMemo(() => {
      if (!promiseCache.has(key)) {
        const componentPromise = importFn();

        // React 19: Use scheduler priority hints
        if (options.priority === "high") {
          // High priority components load immediately
          promiseCache.set(key, componentPromise);
        } else {
          // Lower priority components can be deferred
          const deferredPromise = new Promise<{ default: T }>((resolve) => {
            if (options.priority === "low") {
              // Use scheduler.postTask for low priority loads
              if ("scheduler" in window && "postTask" in (window as any).scheduler) {
                (window as any).scheduler.postTask(
                  () => {
                    componentPromise.then(resolve);
                  },
                  { priority: "background" },
                );
              } else {
                // Fallback to requestIdleCallback
                requestIdleCallback(() => {
                  componentPromise.then(resolve);
                });
              }
            } else {
              componentPromise.then(resolve);
            }
          });
          promiseCache.set(key, deferredPromise);
        }
      }

      return promiseCache.get(key)!;
    }, [key]);

    // React 19: Use the new use() hook for better suspense
    return use(promise).default;
  };
}

// Preload components during idle time
export function preloadComponent<T>(importFn: () => Promise<{ default: T }>) {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => {
      importFn().catch(() => {
        // Silently fail preloads
      });
    });
  }
}
