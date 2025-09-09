# Custom Hooks Documentation

## Overview

This document provides comprehensive documentation for all custom React hooks used in the Pivotr Landing Page application. These hooks provide reusable logic for user interaction tracking, animations, notifications, and performance optimization.

## Table of Contents

1. [useUserCompanion](#useusercompanion)
2. [useTypewriter](#usetypewriter)
3. [useToast](#usetoast)
4. [useOptimizedLoader](#useoptimizedloader)
5. [Performance Hooks](#performance-hooks)

---

## useUserCompanion

**File:** `src/hooks/use-user-companion.ts`

Advanced user interaction tracking and contextual assistance hook that provides intelligent user guidance and progress tracking.

### Interface

```typescript
interface CompanionState {
  visitedSections: Set<string>;
  currentSection: string;
  scrollProgress: number;
  interactionCount: number;
  showHelp: boolean;
  hasInteracted: boolean;
  lastInteraction: number;
  lastToastTime: number;
  shownMessages: Set<string>;
}

interface CompanionActions {
  trackSectionVisit: (sectionId: string) => void;
  trackInteraction: () => void;
  updateScrollProgress: (progress: number) => void;
  setCurrentSection: (section: string) => void;
  toggleHelp: () => void;
  showContextualHint: (message: string, type?: "info" | "success" | "warning") => void;
}
```

### Return Value

```typescript
CompanionState & CompanionActions
```

### Features

- **Section Tracking**: Monitors which sections the user has visited
- **Scroll Progress**: Tracks overall scroll progress as a percentage
- **Interaction Counting**: Counts user interactions (clicks, hovers, etc.)
- **Contextual Hints**: Shows helpful messages based on user behavior
- **Toast Management**: Prevents spam with intelligent timing controls
- **Help System**: Toggle help mode for additional guidance

### Usage

```tsx
import { useUserCompanion } from './hooks/use-user-companion';

function MyComponent() {
  const companion = useUserCompanion();
  
  // Track user interactions
  const handleClick = () => {
    companion.trackInteraction();
    // Your click logic here
  };
  
  // Show contextual hints
  const showHint = () => {
    companion.showContextualHint("This feature helps you save time!", "info");
  };
  
  // Track section visits
  useEffect(() => {
    companion.trackSectionVisit('my-section');
  }, []);
  
  return (
    <div>
      <p>Progress: {companion.scrollProgress}%</p>
      <p>Interactions: {companion.interactionCount}</p>
      <p>Current Section: {companion.currentSection}</p>
      <button onClick={handleClick}>Track Interaction</button>
      <button onClick={showHint}>Show Hint</button>
    </div>
  );
}
```

### Implementation Details

- Uses `useState` and `useCallback` for state management
- Implements intersection observer for section tracking
- Uses `sonner` for toast notifications
- Includes intelligent timing controls to prevent spam
- Tracks scroll progress with passive event listeners

---

## useTypewriter

**File:** `src/hooks/use-typewriter.ts`

Typewriter animation hook for creating realistic typing effects with customizable timing and behavior.

### Interface

```typescript
interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
}
```

### Return Value

```typescript
{
  text: string;
  isDeleting: boolean;
  isComplete: boolean;
}
```

### Parameters

- `words`: Array of strings to cycle through
- `typeSpeed`: Speed of typing in milliseconds (default: 150)
- `deleteSpeed`: Speed of deleting in milliseconds (default: 100)
- `delayBetweenWords`: Delay between words in milliseconds (default: 2000)
- `loop`: Whether to loop through words continuously (default: true)

### Features

- **Realistic Typing**: Simulates human typing patterns
- **Configurable Speed**: Separate speeds for typing and deleting
- **Loop Control**: Option to loop continuously or stop after one cycle
- **State Tracking**: Provides current state information
- **Performance Optimized**: Uses efficient timing mechanisms

### Usage

```tsx
import { useTypewriter } from './hooks/use-typewriter';

function TypewriterComponent() {
  const { text, isDeleting, isComplete } = useTypewriter({
    words: ["Hello", "World", "React", "TypeScript"],
    typeSpeed: 100,
    deleteSpeed: 50,
    delayBetweenWords: 2000,
    loop: true
  });
  
  return (
    <div>
      <span>{text}</span>
      {isDeleting && <span className="cursor-blink">|</span>}
      {isComplete && !loop && <span>✓</span>}
    </div>
  );
}
```

### Advanced Usage

```tsx
function AdvancedTypewriter() {
  const [isPlaying, setIsPlaying] = useState(true);
  
  const { text, isDeleting } = useTypewriter({
    words: ["Welcome", "to", "Pivotr"],
    typeSpeed: isPlaying ? 100 : 0, // Pause when not playing
    deleteSpeed: 50,
    delayBetweenWords: 1500,
    loop: true
  });
  
  return (
    <div>
      <h1>{text}</h1>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Resume'}
      </button>
    </div>
  );
}
```

### Implementation Details

- Uses `useState` for text and animation state
- Implements `useEffect` with `setTimeout` for timing
- Handles cleanup to prevent memory leaks
- Supports pausing and resuming animations
- Optimized for performance with proper dependency arrays

---

## useToast

**File:** `src/hooks/use-toast.ts`

Toast notification management hook inspired by react-hot-toast, providing a clean API for showing notifications.

### Interface

```typescript
interface Toast {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ToastReturn {
  toasts: ToasterToast[];
  toast: (props: Toast) => { id: string; dismiss: () => void; update: (props: ToasterToast) => void };
  dismiss: (toastId?: string) => void;
}
```

### Return Value

```typescript
{
  toasts: ToasterToast[];
  toast: (props: Toast) => ToastControl;
  dismiss: (toastId?: string) => void;
}
```

### Features

- **Multiple Toast Support**: Show multiple toasts simultaneously
- **Auto Dismiss**: Configurable auto-dismiss timing
- **Action Support**: Add action buttons to toasts
- **Variants**: Different toast styles (default, destructive)
- **Manual Control**: Dismiss and update toasts programmatically
- **Memory Management**: Automatic cleanup of dismissed toasts

### Usage

```tsx
import { useToast } from './hooks/use-toast';

function MyComponent() {
  const { toast, dismiss } = useToast();
  
  const showSuccessToast = () => {
    toast({
      title: "Success!",
      description: "Your action was completed successfully.",
      variant: "default"
    });
  };
  
  const showErrorToast = () => {
    toast({
      title: "Error!",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
      action: (
        <ToastAction altText="Retry" onClick={handleRetry}>
          Retry
        </ToastAction>
      )
    });
  };
  
  const showPersistentToast = () => {
    const { id } = toast({
      title: "Processing...",
      description: "This may take a few moments.",
      open: true
    });
    
    // Dismiss after 5 seconds
    setTimeout(() => dismiss(id), 5000);
  };
  
  return (
    <div>
      <button onClick={showSuccessToast}>Success Toast</button>
      <button onClick={showErrorToast}>Error Toast</button>
      <button onClick={showPersistentToast}>Persistent Toast</button>
    </div>
  );
}
```

### Advanced Usage

```tsx
function AdvancedToastExample() {
  const { toast } = useToast();
  
  const showUpdatableToast = () => {
    const { id, update } = toast({
      title: "Uploading...",
      description: "Starting upload...",
      open: true
    });
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      update({
        title: "Uploading...",
        description: `Progress: ${progress}%`,
        open: progress < 100
      });
      
      if (progress >= 100) {
        clearInterval(interval);
        update({
          title: "Upload Complete!",
          description: "Your file has been uploaded successfully.",
          variant: "default"
        });
      }
    }, 500);
  };
  
  return (
    <button onClick={showUpdatableToast}>
      Show Progress Toast
    </button>
  );
}
```

### Implementation Details

- Uses reducer pattern for state management
- Implements timeout-based auto-dismiss
- Uses refs for stable function references
- Includes memory cleanup for dismissed toasts
- Supports both controlled and uncontrolled usage

---

## useOptimizedLoader

**File:** `src/hooks/use-optimized-loader.ts`

React 19 optimized component loading hook with priority-based loading and caching.

### Interface

```typescript
interface LoaderOptions {
  priority: "high" | "medium" | "low";
  preload?: boolean;
}

function createOptimizedLoader<T>(
  importFn: () => Promise<{ default: T }>,
  options: LoaderOptions = { priority: "medium" }
): (key?: string) => T
```

### Features

- **Priority-Based Loading**: Different loading strategies based on priority
- **Promise Caching**: Prevents duplicate imports
- **React 19 Integration**: Uses new `use()` hook for better suspense
- **Background Loading**: Low priority components load in background
- **Preloading Support**: Optional preloading for critical components

### Usage

```tsx
import { createOptimizedLoader } from './hooks/use-optimized-loader';

// Create loader for high priority component
const useHeavyComponent = createOptimizedLoader(
  () => import('./HeavyComponent'),
  { priority: 'high' }
);

// Create loader for low priority component
const useLazyComponent = createOptimizedLoader(
  () => import('./LazyComponent'),
  { priority: 'low' }
);

function MyApp() {
  // High priority - loads immediately
  const HeavyComponent = useHeavyComponent('heavy');
  
  // Low priority - loads in background
  const LazyComponent = useLazyComponent('lazy');
  
  return (
    <div>
      <HeavyComponent />
      <LazyComponent />
    </div>
  );
}
```

### Advanced Usage

```tsx
// Preload critical components
import { preloadComponent } from './hooks/use-optimized-loader';

// Preload during idle time
useEffect(() => {
  preloadComponent(() => import('./CriticalComponent'));
}, []);

// Create multiple loaders for different priorities
const useCriticalComponent = createOptimizedLoader(
  () => import('./CriticalComponent'),
  { priority: 'high', preload: true }
);

const useOptionalComponent = createOptimizedLoader(
  () => import('./OptionalComponent'),
  { priority: 'low' }
);
```

### Implementation Details

- Uses `useMemo` for promise caching
- Implements `requestIdleCallback` for background loading
- Uses React 19's `use()` hook for suspense integration
- Supports different loading strategies based on priority
- Includes error handling for failed imports

---

## Performance Hooks

### usePerformanceOptimizations

**File:** `src/utils/performance-optimizer.ts`

React hook for performance optimization utilities.

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

### Usage

```tsx
import { usePerformanceOptimizations } from './utils/performance-optimizer';

function OptimizedComponent() {
  const { scheduleBackgroundTask, isSlowConnection, preloadResource } = usePerformanceOptimizations();
  
  useEffect(() => {
    // Schedule background work
    scheduleBackgroundTask(() => {
      // Heavy computation
    });
    
    // Preload critical resources
    preloadResource('/critical.css', 'style');
    
    // Adapt to connection speed
    if (isSlowConnection()) {
      // Use lighter assets
    }
  }, []);
  
  return <div>Optimized Component</div>;
}
```

### useOptimizedDeferredValue

**File:** `src/utils/react19-performance.ts`

Enhanced deferred value hook with priority hints.

```typescript
function useOptimizedDeferredValue<T>(
  value: T,
  options?: { priority?: "high" | "low" | "user-visible" }
): T;
```

### Usage

```tsx
import { useOptimizedDeferredValue } from './utils/react19-performance';

function ExpensiveComponent({ data }) {
  const deferredData = useOptimizedDeferredValue(data, { priority: 'low' });
  
  return <ExpensiveChildComponent data={deferredData} />;
}
```

### useOptimizedTransition

**File:** `src/utils/react19-performance.ts`

Smart transition management hook.

```typescript
function useOptimizedTransition() {
  return {
    isPending: boolean;
    startOptimizedTransition: (callback: () => void) => void;
  };
}
```

### Usage

```tsx
import { useOptimizedTransition } from './utils/react19-performance';

function TransitionComponent() {
  const { isPending, startOptimizedTransition } = useOptimizedTransition();
  
  const handleUpdate = () => {
    startOptimizedTransition(() => {
      // Update state
      setState(newState);
    });
  };
  
  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
```

---

## Hook Integration Patterns

### Combining Hooks

```tsx
function AdvancedComponent() {
  const companion = useUserCompanion();
  const { toast } = useToast();
  const { text } = useTypewriter({
    words: ['Welcome', 'to', 'Pivotr'],
    typeSpeed: 100
  });
  
  const handleInteraction = () => {
    companion.trackInteraction();
    toast({
      title: 'Interaction tracked!',
      description: `Total interactions: ${companion.interactionCount}`
    });
  };
  
  return (
    <div>
      <h1>{text}</h1>
      <button onClick={handleInteraction}>
        Track Interaction
      </button>
    </div>
  );
}
```

### Performance Optimization

```tsx
function OptimizedComponent() {
  const companion = useUserCompanion();
  const { scheduleBackgroundTask } = usePerformanceOptimizations();
  
  useEffect(() => {
    // Schedule background work
    scheduleBackgroundTask(() => {
      // Heavy computation
      processData();
    });
  }, []);
  
  return <div>Optimized Component</div>;
}
```

### Error Handling

```tsx
function RobustComponent() {
  const { toast } = useToast();
  
  const handleError = (error: Error) => {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive',
      action: (
        <ToastAction altText="Retry" onClick={handleRetry}>
          Retry
        </ToastAction>
      )
    });
  };
  
  return <div>Robust Component</div>;
}
```

---

This comprehensive hooks documentation provides detailed information about each custom hook's interface, features, usage patterns, and implementation details. Each hook is designed to be reusable, performant, and easy to integrate into React components.