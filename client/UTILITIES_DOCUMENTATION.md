# Utilities Documentation

## Overview

This document provides comprehensive documentation for all utility functions, performance optimizers, and helper functions used in the Pivotr Landing Page application. These utilities provide essential functionality for performance optimization, styling, and React 19 features.

## Table of Contents

1. [Performance Optimization](#performance-optimization)
2. [React 19 Performance Utilities](#react-19-performance-utilities)
3. [General Utilities](#general-utilities)
4. [CSS and Styling Utilities](#css-and-styling-utilities)
5. [Browser API Utilities](#browser-api-utilities)

---

## Performance Optimization

### PerformanceOptimizer Class

**File:** `src/utils/performance-optimizer.ts`

Singleton class for comprehensive performance monitoring and optimization using modern browser APIs.

#### Class Definition

```typescript
class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private observer: PerformanceObserver | null = null;
  private metrics: Map<string, number> = new Map();
}
```

#### Static Methods

##### `getInstance()`
Returns the singleton instance of PerformanceOptimizer.

```typescript
static getInstance(): PerformanceOptimizer
```

**Usage:**
```tsx
const optimizer = PerformanceOptimizer.getInstance();
```

##### `preloadResource(href, type)`
Preloads critical resources for faster loading.

```typescript
static preloadResource(
  href: string, 
  type: "script" | "style" | "image" | "font"
): void
```

**Parameters:**
- `href`: URL of the resource to preload
- `type`: Type of resource (script, style, image, font)

**Usage:**
```tsx
// Preload critical CSS
PerformanceOptimizer.preloadResource('/critical.css', 'style');

// Preload important images
PerformanceOptimizer.preloadResource('/hero-image.jpg', 'image');

// Preload fonts
PerformanceOptimizer.preloadResource('/fonts/main.woff2', 'font');
```

##### `prefetchResource(href)`
Prefetches resources for likely navigation.

```typescript
static prefetchResource(href: string): void
```

**Parameters:**
- `href`: URL of the resource to prefetch

**Usage:**
```tsx
// Prefetch next page resources
PerformanceOptimizer.prefetchResource('/next-page.js');
```

##### `addImagePriorityHint(img, priority)`
Adds priority hints to images for better loading performance.

```typescript
static addImagePriorityHint(
  img: HTMLImageElement, 
  priority: "high" | "low" | "auto"
): void
```

**Parameters:**
- `img`: HTMLImageElement to add priority hint to
- `priority`: Loading priority (high, low, auto)

**Usage:**
```tsx
const img = document.querySelector('img.hero-image');
PerformanceOptimizer.addImagePriorityHint(img, 'high');
```

##### `registerServiceWorker()`
Registers a service worker for caching and offline functionality.

```typescript
static registerServiceWorker(): Promise<void>
```

**Usage:**
```tsx
// Register service worker on app initialization
PerformanceOptimizer.registerServiceWorker()
  .then(() => console.log('Service Worker registered'))
  .catch(err => console.error('Service Worker registration failed:', err));
```

##### `requestBackgroundSync(tag)`
Requests background sync for offline form submissions.

```typescript
static requestBackgroundSync(tag: string): void
```

**Parameters:**
- `tag`: Unique tag for the background sync request

**Usage:**
```tsx
// Request background sync for form submission
PerformanceOptimizer.requestBackgroundSync('contact-form');
```

##### `scheduleTask(callback, priority)`
Schedules tasks with different priorities using modern scheduler APIs.

```typescript
static scheduleTask(
  callback: () => void,
  priority: "background" | "user-blocking" | "user-visible" = "user-visible"
): void
```

**Parameters:**
- `callback`: Function to execute
- `priority`: Task priority (background, user-blocking, user-visible)

**Usage:**
```tsx
// Schedule high priority task
PerformanceOptimizer.scheduleTask(() => {
  // Critical UI update
}, 'user-blocking');

// Schedule background task
PerformanceOptimizer.scheduleTask(() => {
  // Analytics or cleanup
}, 'background');
```

##### `getConnectionSpeed()`
Detects user's connection speed for adaptive loading.

```typescript
static getConnectionSpeed(): "slow" | "fast" | "unknown"
```

**Returns:**
- `"slow"`: 2G or 3G connection
- `"fast"`: 4G connection
- `"unknown"`: Connection info not available

**Usage:**
```tsx
const connectionSpeed = PerformanceOptimizer.getConnectionSpeed();

if (connectionSpeed === 'slow') {
  // Load lighter assets
  loadLightVersion();
} else if (connectionSpeed === 'fast') {
  // Load full assets
  loadFullVersion();
}
```

##### `getBatteryInfo()`
Gets battery information for power-aware optimizations.

```typescript
static getBatteryInfo(): Promise<BatteryInfo | null>
```

**Returns:**
```typescript
interface BatteryInfo {
  charging: boolean;
  level: number; // 0-1
  chargingTime: number;
  dischargingTime: number;
}
```

**Usage:**
```tsx
const batteryInfo = await PerformanceOptimizer.getBatteryInfo();

if (batteryInfo && batteryInfo.level < 0.2) {
  // Reduce animations and background tasks
  enablePowerSavingMode();
}
```

#### Instance Methods

##### `getMetrics()`
Returns current performance metrics.

```typescript
getMetrics(): Map<string, number>
```

**Usage:**
```tsx
const optimizer = PerformanceOptimizer.getInstance();
const metrics = optimizer.getMetrics();

console.log('LCP:', metrics.get('LCP'));
console.log('FID:', metrics.get('FID'));
console.log('CLS:', metrics.get('CLS'));
```

##### `disconnect()`
Disconnects performance observer and cleans up resources.

```typescript
disconnect(): void
```

**Usage:**
```tsx
// Clean up on component unmount
useEffect(() => {
  const optimizer = PerformanceOptimizer.getInstance();
  return () => optimizer.disconnect();
}, []);
```

### usePerformanceOptimizations Hook

**File:** `src/utils/performance-optimizer.ts`

React hook providing easy access to performance optimization utilities.

#### Interface

```typescript
function usePerformanceOptimizations() {
  return {
    scheduleBackgroundTask: (callback: () => void) => void;
    isSlowConnection: () => boolean;
    preloadResource: (href: string, type: string) => void;
    prefetchResource: (href: string) => void;
    metrics: Map<string, number>;
  };
}
```

#### Usage

```tsx
import { usePerformanceOptimizations } from './utils/performance-optimizer';

function OptimizedComponent() {
  const { 
    scheduleBackgroundTask, 
    isSlowConnection, 
    preloadResource,
    metrics 
  } = usePerformanceOptimizations();
  
  useEffect(() => {
    // Schedule background work
    scheduleBackgroundTask(() => {
      // Heavy computation
      processData();
    });
    
    // Preload critical resources
    preloadResource('/critical.css', 'style');
    
    // Adapt to connection speed
    if (isSlowConnection()) {
      // Use lighter assets
      loadLightVersion();
    }
  }, []);
  
  return <div>Optimized Component</div>;
}
```

---

## React 19 Performance Utilities

**File:** `src/utils/react19-performance.ts`

Enhanced utilities leveraging React 19's new features for better performance.

### useOptimizedDeferredValue

Enhanced deferred value hook with priority hints.

```typescript
function useOptimizedDeferredValue<T>(
  value: T,
  options?: { priority?: "high" | "low" | "user-visible" }
): T
```

**Usage:**
```tsx
import { useOptimizedDeferredValue } from './utils/react19-performance';

function ExpensiveComponent({ data }) {
  const deferredData = useOptimizedDeferredValue(data, { priority: 'low' });
  
  return <ExpensiveChildComponent data={deferredData} />;
}
```

### useOptimizedCallback

Optimized useCallback with automatic dependency tracking.

```typescript
function useOptimizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList,
  options?: { stable?: boolean }
): T
```

**Usage:**
```tsx
import { useOptimizedCallback } from './utils/react19-performance';

function MyComponent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useOptimizedCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  return <button onClick={handleClick}>Count: {count}</button>;
}
```

### useOptimizedMemo

Enhanced useMemo with better caching.

```typescript
function useOptimizedMemo<T>(
  factory: () => T, 
  deps: React.DependencyList
): T
```

**Usage:**
```tsx
import { useOptimizedMemo } from './utils/react19-performance';

function ExpensiveComponent({ items }) {
  const processedItems = useOptimizedMemo(() => {
    return items.map(item => processItem(item));
  }, [items]);
  
  return <div>{processedItems.map(item => <Item key={item.id} data={item} />)}</div>;
}
```

### useOptimizedTransition

Smart transition management hook.

```typescript
function useOptimizedTransition() {
  return {
    isPending: boolean;
    startOptimizedTransition: (callback: () => void) => void;
  };
}
```

**Usage:**
```tsx
import { useOptimizedTransition } from './utils/react19-performance';

function TransitionComponent() {
  const { isPending, startOptimizedTransition } = useOptimizedTransition();
  const [data, setData] = useState(null);
  
  const handleUpdate = () => {
    startOptimizedTransition(() => {
      // This update will be treated as a transition
      setData(fetchNewData());
    });
  };
  
  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleUpdate}>Update Data</button>
      {data && <DataDisplay data={data} />}
    </div>
  );
}
```

### preloadComponent

Component preloading utility for better performance.

```typescript
function preloadComponent(importFunc: () => Promise<any>): void
```

**Usage:**
```tsx
import { preloadComponent } from './utils/react19-performance';

// Preload components during idle time
useEffect(() => {
  preloadComponent(() => import('./HeavyComponent'));
  preloadComponent(() => import('./LazyComponent'));
}, []);
```

### createLazyComponent

Enhanced lazy loading with priority.

```typescript
function createLazyComponent(
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
  options?: { priority?: "high" | "low" }
): React.LazyExoticComponent<React.ComponentType<any>>
```

**Usage:**
```tsx
import { createLazyComponent } from './utils/react19-performance';

// High priority lazy component
const CriticalComponent = createLazyComponent(
  () => import('./CriticalComponent'),
  { priority: 'high' }
);

// Low priority lazy component
const OptionalComponent = createLazyComponent(
  () => import('./OptionalComponent'),
  { priority: 'low' }
);
```

### useOptimizedImage

Optimized image loading with priority hints.

```typescript
function useOptimizedImage(
  src: string,
  options?: {
    priority?: "high" | "low";
    loading?: "lazy" | "eager";
    sizes?: string;
  }
): ImageProps
```

**Usage:**
```tsx
import { useOptimizedImage } from './utils/react19-performance';

function ImageComponent() {
  const imageProps = useOptimizedImage('/hero-image.jpg', {
    priority: 'high',
    loading: 'eager',
    sizes: '(max-width: 768px) 100vw, 50vw'
  });
  
  return <img {...imageProps} alt="Hero image" />;
}
```

### useOptimizedIntersectionObserver

Enhanced intersection observer with better performance.

```typescript
function useOptimizedIntersectionObserver(
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit
): {
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}
```

**Usage:**
```tsx
import { useOptimizedIntersectionObserver } from './utils/react19-performance';

function ScrollComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting, entry } = useOptimizedIntersectionObserver(ref, {
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  return (
    <div ref={ref}>
      {isIntersecting ? 'Visible' : 'Hidden'}
    </div>
  );
}
```

### usePerformanceMonitor

Performance monitoring hook for components.

```typescript
function usePerformanceMonitor(componentName: string): void
```

**Usage:**
```tsx
import { usePerformanceMonitor } from './utils/react19-performance';

function MonitoredComponent() {
  usePerformanceMonitor('MonitoredComponent');
  
  // Component logic here
  return <div>Monitored Component</div>;
}
```

---

## General Utilities

### cn Function

**File:** `src/lib/utils.ts`

Class name utility function combining clsx and tailwind-merge for optimal class handling.

```typescript
function cn(...inputs: ClassValue[]): string
```

**Features:**
- Combines multiple class names
- Handles conditional classes
- Merges Tailwind CSS classes intelligently
- Removes duplicate classes
- Optimizes class strings

**Usage:**
```tsx
import { cn } from './lib/utils';

// Basic usage
const className = cn('base-class', 'additional-class');

// Conditional classes
const buttonClass = cn(
  'btn',
  'btn-primary',
  {
    'btn-active': isActive,
    'btn-disabled': isDisabled
  }
);

// With Tailwind classes
const cardClass = cn(
  'p-4 rounded-lg shadow-md',
  'hover:shadow-lg transition-shadow',
  isSelected && 'ring-2 ring-blue-500'
);
```

**Advanced Usage:**
```tsx
// Dynamic classes based on props
function Button({ variant, size, className, ...props }) {
  return (
    <button
      className={cn(
        'btn',
        {
          'btn-primary': variant === 'primary',
          'btn-secondary': variant === 'secondary',
          'btn-sm': size === 'sm',
          'btn-lg': size === 'lg'
        },
        className
      )}
      {...props}
    />
  );
}
```

---

## CSS and Styling Utilities

### extractCriticalCSS

**File:** `src/utils/performance-utils.ts`

Extracts critical CSS for above-the-fold content.

```typescript
function extractCriticalCSS(): string
```

**Usage:**
```tsx
import { extractCriticalCSS } from './utils/performance-utils';

// Extract critical CSS
const criticalCSS = extractCriticalCSS();

// Inline critical CSS
const style = document.createElement('style');
style.textContent = criticalCSS;
document.head.appendChild(style);
```

### inlineCriticalCSS

**File:** `src/utils/performance-utils.ts`

Automatically inlines critical CSS.

```typescript
function inlineCriticalCSS(): void
```

**Usage:**
```tsx
import { inlineCriticalCSS } from './utils/performance-utils';

// Call on page load
inlineCriticalCSS();
```

---

## Browser API Utilities

### analyzeResourceTiming

**File:** `src/utils/performance-utils.ts`

Analyzes resource loading performance.

```typescript
function analyzeResourceTiming(): ResourceAnalysis | null
```

**Returns:**
```typescript
interface ResourceAnalysis {
  totalRequests: number;
  totalBytes: number;
  slowestResources: Array<{
    name: string;
    duration: number;
    type: string;
  }>;
  largestResources: Array<{
    name: string;
    size: number;
    type: string;
  }>;
  byType: Record<string, number>;
}
```

**Usage:**
```tsx
import { analyzeResourceTiming } from './utils/performance-utils';

// Analyze resource performance
const analysis = analyzeResourceTiming();

if (analysis) {
  console.log('Total requests:', analysis.totalRequests);
  console.log('Total bytes:', analysis.totalBytes);
  console.log('Slowest resources:', analysis.slowestResources);
}
```

### preloadNextSection

**File:** `src/utils/performance-utils.ts`

Preloads resources for the next section.

```typescript
function preloadNextSection(): void
```

**Usage:**
```tsx
import { preloadNextSection } from './utils/performance-utils';

// Preload next section on scroll
useEffect(() => {
  const handleScroll = () => {
    preloadNextSection();
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

## Utility Integration Patterns

### Performance Optimization Setup

```tsx
import { PerformanceOptimizer } from './utils/performance-optimizer';
import { usePerformanceOptimizations } from './utils/performance-optimizer';

function App() {
  const { scheduleBackgroundTask, preloadResource } = usePerformanceOptimizations();
  
  useEffect(() => {
    // Initialize performance monitoring
    const optimizer = PerformanceOptimizer.getInstance();
    
    // Preload critical resources
    preloadResource('/critical.css', 'style');
    preloadResource('/hero-image.jpg', 'image');
    
    // Schedule background tasks
    scheduleBackgroundTask(() => {
      // Analytics or cleanup
    });
    
    return () => optimizer.disconnect();
  }, []);
  
  return <div>App</div>;
}
```

### React 19 Performance Integration

```tsx
import { 
  useOptimizedDeferredValue, 
  useOptimizedTransition,
  useOptimizedImage 
} from './utils/react19-performance';

function OptimizedComponent({ data }) {
  const { isPending, startOptimizedTransition } = useOptimizedTransition();
  const deferredData = useOptimizedDeferredValue(data, { priority: 'low' });
  
  const handleUpdate = () => {
    startOptimizedTransition(() => {
      // Update state
    });
  };
  
  return (
    <div>
      {isPending && <Spinner />}
      <ExpensiveComponent data={deferredData} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
```

### Styling Utilities Integration

```tsx
import { cn } from './lib/utils';

function ResponsiveCard({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'p-4 rounded-lg shadow-md',
        'hover:shadow-lg transition-shadow',
        'sm:p-6 md:p-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

---

This comprehensive utilities documentation provides detailed information about all utility functions, their interfaces, usage patterns, and integration examples. Each utility is designed to enhance performance, provide better developer experience, and leverage modern browser APIs effectively.