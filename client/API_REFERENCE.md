# API Reference

## Complete API Reference for Pivotr Landing Page

This document provides a comprehensive reference for all public APIs, interfaces, types, and functions available in the Pivotr Landing Page application.

## Table of Contents

1. [Component APIs](#component-apis)
2. [Hook APIs](#hook-apis)
3. [Utility APIs](#utility-apis)
4. [Type Definitions](#type-definitions)
5. [Interface Specifications](#interface-specifications)
6. [Error Handling](#error-handling)
7. [Performance APIs](#performance-apis)

---

## Component APIs

### Core Components

#### Hero
```typescript
// File: src/components/Hero.tsx
export const Hero: React.FC = () => JSX.Element;
```
- **Props:** None
- **Returns:** JSX.Element
- **Description:** Main hero section with typewriter animation

#### Navbar
```typescript
// File: src/components/Navbar.tsx
interface NavbarProps {
  companion?: CompanionData;
}

export const Navbar: React.FC<NavbarProps> = ({ companion }) => JSX.Element;
```
- **Props:** `companion?: CompanionData`
- **Returns:** JSX.Element
- **Description:** Responsive navigation with progress tracking

#### About
```typescript
// File: src/components/About.tsx
export const About: React.FC = () => JSX.Element;
```
- **Props:** None
- **Returns:** JSX.Element
- **Description:** About section with animated text

#### Features
```typescript
// File: src/components/Features.tsx
export const Features: React.FC = () => JSX.Element;
```
- **Props:** None
- **Returns:** JSX.Element
- **Description:** Features showcase with cards

#### Services
```typescript
// File: src/components/Services.tsx
export const Services: React.FC = () => JSX.Element;
```
- **Props:** None
- **Returns:** JSX.Element
- **Description:** Services with interactive cards

#### Products
```typescript
// File: src/components/Products.tsx
export const Products: React.FC = () => JSX.Element;
```
- **Props:** None
- **Returns:** JSX.Element
- **Description:** Product showcase section

#### ContactForm
```typescript
// File: src/components/ContactForm.tsx
export const ContactForm: React.FC = () => JSX.Element;
```
- **Props:** None
- **Returns:** JSX.Element
- **Description:** Contact form with validation

#### ROICalculator
```typescript
// File: src/components/ROICalculator.tsx
export const ROICalculator: React.FC = () => JSX.Element;
```
- **Props:** None
- **Returns:** JSX.Element
- **Description:** Interactive ROI calculator

### Utility Components

#### TypewriterText
```typescript
// File: src/components/TypewriterText.tsx
interface TypewriterTextProps {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorClassName?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = (props) => JSX.Element;
```

#### ScrollFadeIn
```typescript
// File: src/components/ScrollFadeIn.tsx
interface ScrollFadeInProps {
  children: React.ReactNode;
  delay?: number;
}

export const ScrollFadeIn: React.FC<ScrollFadeInProps> = ({ children, delay }) => JSX.Element;
```

### UI Components

#### Button
```typescript
// File: src/components/ui/button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export const buttonVariants: (props: VariantProps<typeof buttonVariants>) => string;
```

#### Card Components
```typescript
// File: src/components/ui/card.tsx
export const Card: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export const CardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLParagraphElement>>;
export const CardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
export const CardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export const CardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
```

---

## Hook APIs

### useUserCompanion
```typescript
// File: src/hooks/use-user-companion.ts
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

export const useUserCompanion: () => CompanionState & CompanionActions;
```

### useTypewriter
```typescript
// File: src/hooks/use-typewriter.ts
interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
}

interface UseTypewriterReturn {
  text: string;
  isDeleting: boolean;
  isComplete: boolean;
}

export const useTypewriter: (options: UseTypewriterOptions) => UseTypewriterReturn;
```

### useToast
```typescript
// File: src/hooks/use-toast.ts
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

export const useToast: () => ToastReturn;
export const toast: (props: Toast) => { id: string; dismiss: () => void; update: (props: ToasterToast) => void };
```

### useOptimizedLoader
```typescript
// File: src/hooks/use-optimized-loader.ts
interface LoaderOptions {
  priority: "high" | "medium" | "low";
  preload?: boolean;
}

export function createOptimizedLoader<T>(
  importFn: () => Promise<{ default: T }>,
  options?: LoaderOptions
): (key?: string) => T;

export function preloadComponent<T>(
  importFn: () => Promise<{ default: T }>
): void;
```

---

## Utility APIs

### Performance Optimization

#### PerformanceOptimizer Class
```typescript
// File: src/utils/performance-optimizer.ts
class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private observer: PerformanceObserver | null;
  private metrics: Map<string, number>;

  // Static methods
  static getInstance(): PerformanceOptimizer;
  static preloadResource(href: string, type: "script" | "style" | "image" | "font"): void;
  static prefetchResource(href: string): void;
  static addImagePriorityHint(img: HTMLImageElement, priority: "high" | "low" | "auto"): void;
  static registerServiceWorker(): Promise<void>;
  static requestBackgroundSync(tag: string): void;
  static scheduleTask(callback: () => void, priority: "background" | "user-blocking" | "user-visible"): void;
  static getConnectionSpeed(): "slow" | "fast" | "unknown";
  static getBatteryInfo(): Promise<BatteryInfo | null>;

  // Instance methods
  getMetrics(): Map<string, number>;
  disconnect(): void;
}

interface BatteryInfo {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
}

export function usePerformanceOptimizations(): {
  scheduleBackgroundTask: (callback: () => void) => void;
  isSlowConnection: () => boolean;
  preloadResource: (href: string, type: string) => void;
  prefetchResource: (href: string) => void;
  metrics: Map<string, number>;
};
```

### React 19 Performance Utilities
```typescript
// File: src/utils/react19-performance.ts
export function useOptimizedDeferredValue<T>(
  value: T,
  options?: { priority?: "high" | "low" | "user-visible" }
): T;

export function useOptimizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList,
  options?: { stable?: boolean }
): T;

export function useOptimizedMemo<T>(
  factory: () => T,
  deps: React.DependencyList
): T;

export function useOptimizedTransition(): {
  isPending: boolean;
  startOptimizedTransition: (callback: () => void) => void;
};

export function preloadComponent(importFunc: () => Promise<any>): void;

export function createLazyComponent(
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
  options?: { priority?: "high" | "low" }
): React.LazyExoticComponent<React.ComponentType<any>>;

export function useOptimizedImage(
  src: string,
  options?: {
    priority?: "high" | "low";
    loading?: "lazy" | "eager";
    sizes?: string;
  }
): ImageProps;

export function useOptimizedIntersectionObserver(
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit
): {
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
};

export function usePerformanceMonitor(componentName: string): void;

export const createOptimizedBundle: {
  createChunk: (name: string, factory: () => Promise<any>) => Promise<any>;
  preloadCritical: (resources: Array<{ href: string; as: string; rel?: string }>) => void;
  loadAsset: (src: string, type: "script" | "style" | "image") => Promise<HTMLElement | undefined>;
};

export function createErrorBoundary(
  fallbackComponent: React.ComponentType<{ error: Error; resetError: () => void }>
): React.ComponentClass<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }>;
```

### General Utilities
```typescript
// File: src/lib/utils.ts
export function cn(...inputs: ClassValue[]): string;

// File: src/utils/performance-utils.ts
export function extractCriticalCSS(): string;
export function inlineCriticalCSS(): void;
export function analyzeResourceTiming(): ResourceAnalysis | null;
export function preloadNextSection(): void;

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

---

## Type Definitions

### Core Types
```typescript
// Companion types
interface CompanionData {
  scrollProgress: number;
  visitedSections: Set<string>;
  currentSection: string;
}

// Route types
interface RouteProps {
  href: string;
  label: string;
}

// Feature types
interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

// Service types
interface ServiceProps {
  title: string;
  description: string;
  icon: React.JSX.Element;
  details?: string;
}

// Stepper input types
type StepperInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value: string;
  onValueChange: (v: string) => void;
};

// Toast types
type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

// Performance types
interface BatteryInfo {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
}

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

### Component Props Types
```typescript
// Button props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

// Typewriter props
interface TypewriterTextProps {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorClassName?: string;
}

// Scroll fade in props
interface ScrollFadeInProps {
  children: React.ReactNode;
  delay?: number;
}

// Navbar props
interface NavbarProps {
  companion?: CompanionData;
}
```

---

## Interface Specifications

### Component Interfaces

#### Hero Component
- **Purpose:** Main landing section with call-to-action
- **Dependencies:** TypewriterText, HeroCards
- **Accessibility:** ARIA labels, keyboard navigation
- **Responsive:** Mobile-first design

#### Navbar Component
- **Purpose:** Navigation with progress tracking
- **Dependencies:** NavigationMenu, Sheet, ModeToggle
- **Accessibility:** ARIA navigation, keyboard support
- **Responsive:** Mobile hamburger menu

#### ContactForm Component
- **Purpose:** Contact form with validation
- **Dependencies:** Input, Textarea, Button, useToast
- **Accessibility:** Form labels, error messages
- **Validation:** Client-side and server-side

### Hook Interfaces

#### useUserCompanion Hook
- **Purpose:** User interaction tracking and guidance
- **State Management:** useState, useCallback
- **Side Effects:** IntersectionObserver, scroll listeners
- **Performance:** Debounced updates, cleanup

#### useTypewriter Hook
- **Purpose:** Typewriter animation effect
- **State Management:** useState, useEffect
- **Timing:** setTimeout-based animation
- **Performance:** Cleanup on unmount

### Utility Interfaces

#### PerformanceOptimizer Class
- **Purpose:** Performance monitoring and optimization
- **Pattern:** Singleton
- **APIs:** PerformanceObserver, ServiceWorker, Scheduler
- **Browser Support:** Modern browsers with fallbacks

---

## Error Handling

### Component Error Boundaries
```typescript
// Error boundary for components
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

// Error handling in hooks
const handleError = (error: Error) => {
  console.error('Hook error:', error);
  // Show user-friendly error message
};
```

### Form Validation Errors
```typescript
// Contact form error handling
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Toast error notifications
const showError = (message: string) => {
  toast({
    title: "Error",
    description: message,
    variant: "destructive"
  });
};
```

### Performance Error Handling
```typescript
// Performance monitoring errors
try {
  const metrics = optimizer.getMetrics();
} catch (error) {
  console.warn('Performance monitoring unavailable:', error);
}

// Resource loading errors
const handleResourceError = (error: Error) => {
  console.error('Resource loading failed:', error);
  // Fallback to alternative resource
};
```

---

## Performance APIs

### Web Vitals Monitoring
```typescript
// Core Web Vitals
interface WebVitals {
  LCP: number; // Largest Contentful Paint
  FID: number; // First Input Delay
  CLS: number; // Cumulative Layout Shift
}

// Performance metrics
const getWebVitals = (): WebVitals => {
  const metrics = optimizer.getMetrics();
  return {
    LCP: metrics.get('LCP') || 0,
    FID: metrics.get('FID') || 0,
    CLS: metrics.get('CLS') || 0
  };
};
```

### Resource Optimization
```typescript
// Resource preloading
const preloadCriticalResources = () => {
  PerformanceOptimizer.preloadResource('/critical.css', 'style');
  PerformanceOptimizer.preloadResource('/hero-image.jpg', 'image');
  PerformanceOptimizer.preloadResource('/main-font.woff2', 'font');
};

// Resource prefetching
const prefetchNextPage = () => {
  PerformanceOptimizer.prefetchResource('/next-page.js');
  PerformanceOptimizer.prefetchResource('/next-page.css');
};
```

### Memory Management
```typescript
// Memory monitoring
const monitorMemory = () => {
  const batteryInfo = await PerformanceOptimizer.getBatteryInfo();
  if (batteryInfo && batteryInfo.level < 0.2) {
    // Enable power saving mode
    enablePowerSavingMode();
  }
};

// Cleanup utilities
const cleanup = () => {
  optimizer.disconnect();
  // Clear intervals and timeouts
  // Remove event listeners
};
```

---

## Usage Examples

### Complete App Setup
```typescript
import React, { Suspense } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { ToastProvider } from './components/ui/toast';
import { useUserCompanion } from './hooks/use-user-companion';
import { PerformanceOptimizer } from './utils/performance-optimizer';

function App() {
  const companion = useUserCompanion();
  
  useEffect(() => {
    // Initialize performance monitoring
    PerformanceOptimizer.registerServiceWorker();
    PerformanceOptimizer.preloadResource('/critical.css', 'style');
  }, []);
  
  return (
    <ThemeProvider>
      <ToastProvider>
        <Navbar companion={companion} />
        <Suspense fallback={<LoadingFallback />}>
          <Hero />
          <About />
          <Features />
          <Services />
          <Products />
          <ContactForm />
          <ROICalculator />
        </Suspense>
      </ToastProvider>
    </ThemeProvider>
  );
}
```

### Custom Hook Integration
```typescript
function CustomComponent() {
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
      description: `Total: ${companion.interactionCount}`
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

---

This comprehensive API reference provides complete documentation for all public APIs, interfaces, types, and functions in the Pivotr Landing Page application. Each API is documented with its signature, parameters, return values, and usage examples.