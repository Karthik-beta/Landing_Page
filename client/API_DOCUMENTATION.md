# Pivotr Landing Page - API Documentation

## Overview

This is a comprehensive documentation for the Pivotr Landing Page, a modern React 19 application built with TypeScript, Tailwind CSS, and shadcn/ui components. The application features a complete landing page with interactive components, performance optimizations, and enterprise-grade solutions showcase.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Main Components](#main-components)
3. [Custom Hooks](#custom-hooks)
4. [Utility Functions](#utility-functions)
5. [UI Components](#ui-components)
6. [Performance Optimizations](#performance-optimizations)
7. [Usage Examples](#usage-examples)
8. [API Reference](#api-reference)

## Project Structure

```
client/
├── src/
│   ├── components/          # Main React components
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── lib/                # Library utilities
│   └── assets/             # Static assets
├── public/                 # Public assets
└── package.json           # Dependencies and scripts
```

## Main Components

### Core Landing Page Components

#### `<Hero />`
The main hero section component with animated typewriter text and call-to-action buttons.

**Props:** None (stateless component)

**Features:**
- Animated typewriter effect with customizable words
- Gradient text styling
- Responsive design
- Smooth scroll navigation

**Usage:**
```tsx
import { Hero } from './components/Hero';

function App() {
  return <Hero />;
}
```

#### `<Navbar />`
Navigation bar component with responsive design and companion integration.

**Props:**
```typescript
interface NavbarProps {
  companion?: {
    scrollProgress: number;
    visitedSections: Set<string>;
    currentSection: string;
  };
}
```

**Features:**
- Responsive navigation menu
- Mobile hamburger menu
- Progress indicator
- Dark/light mode toggle
- Section tracking

**Usage:**
```tsx
import { Navbar } from './components/Navbar';

function App() {
  const companion = useUserCompanion();
  return <Navbar companion={companion} />;
}
```

#### `<About />`
About section with animated typewriter text and company statistics.

**Props:** None

**Features:**
- Typewriter animation for paragraph text
- Intersection observer for animation triggers
- Company statistics display
- Responsive image layout

**Usage:**
```tsx
import { About } from './components/About';

function App() {
  return <About />;
}
```

#### `<Features />`
Features showcase section with cards and badges.

**Props:** None

**Features:**
- Feature cards with hover effects
- Badge display for feature tags
- Responsive grid layout
- Icon integration

**Usage:**
```tsx
import { Features } from './components/Features';

function App() {
  return <Features />;
}
```

#### `<Services />`
Services section with interactive cards and detailed information.

**Props:** None

**Features:**
- Interactive service cards
- Hover effects with additional details
- Icon integration
- Responsive design

**Usage:**
```tsx
import { Services } from './components/Services';

function App() {
  return <Services />;
}
```

#### `<Products />`
Product showcase section highlighting the business operating system.

**Props:** None

**Features:**
- Product feature highlights
- Visual illustrations
- Call-to-action elements
- Responsive layout

**Usage:**
```tsx
import { Products } from './components/Products';

function App() {
  return <Products />;
}
```

#### `<ContactForm />`
Contact form with validation and submission handling.

**Props:** None

**Features:**
- Form validation
- Toast notifications
- Google Maps integration
- Optimized form handling with refs

**Usage:**
```tsx
import { ContactForm } from './components/ContactForm';

function App() {
  return <ContactForm />;
}
```

#### `<ROICalculator />`
Interactive ROI calculator with real-time calculations.

**Props:** None

**Features:**
- Real-time calculation updates
- Stepper input components
- Animated number displays
- Responsive design
- Indian Rupee formatting

**Usage:**
```tsx
import { ROICalculator } from './components/ROICalculator';

function App() {
  return <ROICalculator />;
}
```

### Utility Components

#### `<TypewriterText />`
Animated typewriter text component.

**Props:**
```typescript
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
```

**Usage:**
```tsx
import { TypewriterText } from './components/TypewriterText';

<TypewriterText
  words={["Business", "Teams", "Growth", "Success", "Future"]}
  typeSpeed={120}
  deleteSpeed={80}
  delayBetweenWords={2500}
  showCursor={true}
/>
```

#### `<ScrollFadeIn />`
Scroll-triggered fade-in animation component.

**Props:**
```typescript
interface ScrollFadeInProps {
  children: React.ReactNode;
  delay?: number;
}
```

**Usage:**
```tsx
import { ScrollFadeIn } from './components/ScrollFadeIn';

<ScrollFadeIn delay={0.1}>
  <YourComponent />
</ScrollFadeIn>
```

## Custom Hooks

### `useUserCompanion()`
Advanced user interaction tracking and contextual assistance hook.

**Returns:**
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

**Usage:**
```tsx
import { useUserCompanion } from './hooks/use-user-companion';

function MyComponent() {
  const companion = useUserCompanion();
  
  // Track user interactions
  companion.trackInteraction();
  
  // Show contextual hints
  companion.showContextualHint("Welcome to our platform!", "info");
  
  return <div>Progress: {companion.scrollProgress}%</div>;
}
```

### `useTypewriter()`
Typewriter animation hook for text effects.

**Parameters:**
```typescript
interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
}
```

**Returns:**
```typescript
{
  text: string;
  isDeleting: boolean;
  isComplete: boolean;
}
```

**Usage:**
```tsx
import { useTypewriter } from './hooks/use-typewriter';

function MyComponent() {
  const { text, isDeleting } = useTypewriter({
    words: ["Hello", "World", "React"],
    typeSpeed: 100,
    deleteSpeed: 50,
    delayBetweenWords: 2000,
    loop: true
  });
  
  return <span>{text}</span>;
}
```

### `useToast()`
Toast notification management hook.

**Returns:**
```typescript
{
  toasts: ToasterToast[];
  toast: (props: Toast) => { id: string; dismiss: () => void; update: (props: ToasterToast) => void };
  dismiss: (toastId?: string) => void;
}
```

**Usage:**
```tsx
import { useToast } from './hooks/use-toast';

function MyComponent() {
  const { toast } = useToast();
  
  const handleClick = () => {
    toast({
      title: "Success!",
      description: "Your action was completed successfully.",
      variant: "default"
    });
  };
  
  return <button onClick={handleClick}>Show Toast</button>;
}
```

### `useOptimizedLoader()`
React 19 optimized component loading hook.

**Usage:**
```tsx
import { createOptimizedLoader } from './hooks/use-optimized-loader';

const useOptimizedComponent = createOptimizedLoader(
  () => import('./HeavyComponent'),
  { priority: 'high' }
);

function MyComponent() {
  const Component = useOptimizedComponent('heavy-component');
  return <Component />;
}
```

## Utility Functions

### Performance Optimization

#### `PerformanceOptimizer`
Singleton class for performance monitoring and optimization.

**Methods:**
```typescript
class PerformanceOptimizer {
  static getInstance(): PerformanceOptimizer;
  static preloadResource(href: string, type: "script" | "style" | "image" | "font"): void;
  static prefetchResource(href: string): void;
  static addImagePriorityHint(img: HTMLImageElement, priority: "high" | "low" | "auto"): void;
  static registerServiceWorker(): Promise<void>;
  static requestBackgroundSync(tag: string): void;
  static scheduleTask(callback: () => void, priority: "background" | "user-blocking" | "user-visible"): void;
  static getConnectionSpeed(): "slow" | "fast" | "unknown";
  static getBatteryInfo(): Promise<BatteryInfo | null>;
  getMetrics(): Map<string, number>;
  disconnect(): void;
}
```

**Usage:**
```tsx
import { PerformanceOptimizer } from './utils/performance-optimizer';

// Preload critical resources
PerformanceOptimizer.preloadResource('/critical.css', 'style');

// Schedule background tasks
PerformanceOptimizer.scheduleTask(() => {
  // Background work
}, 'background');

// Get performance metrics
const optimizer = PerformanceOptimizer.getInstance();
const metrics = optimizer.getMetrics();
```

#### `usePerformanceOptimizations()`
React hook for performance optimization utilities.

**Returns:**
```typescript
{
  scheduleBackgroundTask: (callback: () => void) => void;
  isSlowConnection: () => boolean;
  preloadResource: (href: string, type: string) => void;
  prefetchResource: (href: string) => void;
  metrics: Map<string, number>;
}
```

**Usage:**
```tsx
import { usePerformanceOptimizations } from './utils/performance-optimizer';

function MyComponent() {
  const { scheduleBackgroundTask, isSlowConnection } = usePerformanceOptimizations();
  
  useEffect(() => {
    if (isSlowConnection()) {
      // Optimize for slow connections
    }
    
    scheduleBackgroundTask(() => {
      // Background work
    });
  }, []);
}
```

### React 19 Performance Utilities

#### `useOptimizedDeferredValue()`
Enhanced deferred value hook with priority hints.

**Usage:**
```tsx
import { useOptimizedDeferredValue } from './utils/react19-performance';

function MyComponent() {
  const [value, setValue] = useState(expensiveValue);
  const deferredValue = useOptimizedDeferredValue(value, { priority: 'low' });
  
  return <ExpensiveComponent data={deferredValue} />;
}
```

#### `useOptimizedTransition()`
Smart transition management hook.

**Usage:**
```tsx
import { useOptimizedTransition } from './utils/react19-performance';

function MyComponent() {
  const { isPending, startOptimizedTransition } = useOptimizedTransition();
  
  const handleUpdate = () => {
    startOptimizedTransition(() => {
      // Update state
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

### General Utilities

#### `cn()`
Class name utility function combining clsx and tailwind-merge.

**Usage:**
```tsx
import { cn } from './lib/utils';

const className = cn('base-class', 'conditional-class', {
  'active': isActive,
  'disabled': isDisabled
});
```

## UI Components

### Button Component

**Props:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}
```

**Usage:**
```tsx
import { Button } from './components/ui/button';

<Button variant="default" size="lg">
  Click me
</Button>

<Button variant="outline" asChild>
  <a href="/link">Link Button</a>
</Button>
```

### Card Components

**Components:**
- `Card` - Main card container
- `CardHeader` - Card header section
- `CardTitle` - Card title
- `CardDescription` - Card description
- `CardContent` - Card content area
- `CardFooter` - Card footer section

**Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

## Performance Optimizations

### React 19 Features
- **Concurrent Features**: Uses React 19's concurrent rendering
- **Suspense**: Lazy loading with Suspense boundaries
- **Deferred Values**: Non-critical updates are deferred
- **Transitions**: Smooth state transitions

### Bundle Optimization
- **Code Splitting**: Dynamic imports for route-based splitting
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image and font optimization
- **Service Worker**: Caching for offline functionality

### Runtime Optimizations
- **Intersection Observer**: Efficient scroll-based animations
- **Request Idle Callback**: Background task scheduling
- **Memory Management**: Proper cleanup and garbage collection
- **Connection Awareness**: Adaptive loading based on connection speed

## Usage Examples

### Complete App Setup
```tsx
import React, { Suspense } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { ToastProvider } from './components/ui/toast';
import { useUserCompanion } from './hooks/use-user-companion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Features } from './components/Features';
import { Services } from './components/Services';
import { Products } from './components/Products';
import { ContactForm } from './components/ContactForm';
import { ROICalculator } from './components/ROICalculator';
import { ScrollFadeIn } from './components/ScrollFadeIn';

function App() {
  const companion = useUserCompanion();

  return (
    <ThemeProvider>
      <ToastProvider>
        <Navbar companion={companion} />
        <Hero />
        
        <Suspense fallback={<div>Loading...</div>}>
          <ScrollFadeIn>
            <About />
          </ScrollFadeIn>
        </Suspense>
        
        <Suspense fallback={<div>Loading...</div>}>
          <ScrollFadeIn delay={0.1}>
            <Features />
          </ScrollFadeIn>
        </Suspense>
        
        <Suspense fallback={<div>Loading...</div>}>
          <ScrollFadeIn delay={0.2}>
            <Services />
          </ScrollFadeIn>
        </Suspense>
        
        <Suspense fallback={<div>Loading...</div>}>
          <ScrollFadeIn delay={0.3}>
            <Products />
          </ScrollFadeIn>
        </Suspense>
        
        <Suspense fallback={<div>Loading...</div>}>
          <ScrollFadeIn delay={0.4}>
            <ROICalculator />
          </ScrollFadeIn>
        </Suspense>
        
        <Suspense fallback={<div>Loading...</div>}>
          <ScrollFadeIn delay={0.5}>
            <ContactForm />
          </ScrollFadeIn>
        </Suspense>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
```

### Custom Hook Integration
```tsx
import { useUserCompanion } from './hooks/use-user-companion';
import { useTypewriter } from './hooks/use-typewriter';
import { useToast } from './hooks/use-toast';

function InteractiveComponent() {
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
      description: `You've interacted ${companion.interactionCount} times.`
    });
  };

  return (
    <div>
      <h1>{text}</h1>
      <button onClick={handleInteraction}>
        Track Interaction
      </button>
      <p>Scroll Progress: {companion.scrollProgress}%</p>
    </div>
  );
}
```

## API Reference

### Component Props Summary

| Component | Props | Description |
|-----------|-------|-------------|
| `Hero` | None | Main hero section |
| `Navbar` | `companion?: CompanionData` | Navigation with progress tracking |
| `About` | None | About section with animations |
| `Features` | None | Features showcase |
| `Services` | None | Services with interactive cards |
| `Products` | None | Product showcase |
| `ContactForm` | None | Contact form with validation |
| `ROICalculator` | None | Interactive ROI calculator |
| `TypewriterText` | `TypewriterTextProps` | Animated typewriter text |
| `ScrollFadeIn` | `{ children, delay? }` | Scroll-triggered animation |

### Hook Returns Summary

| Hook | Returns | Description |
|------|---------|-------------|
| `useUserCompanion` | `CompanionState & CompanionActions` | User interaction tracking |
| `useTypewriter` | `{ text, isDeleting, isComplete }` | Typewriter animation |
| `useToast` | `{ toasts, toast, dismiss }` | Toast notifications |
| `useOptimizedLoader` | Component loader | Optimized component loading |

### Utility Functions Summary

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `cn` | `...inputs: ClassValue[]` | `string` | Class name utility |
| `PerformanceOptimizer.getInstance` | None | `PerformanceOptimizer` | Performance monitoring |
| `usePerformanceOptimizations` | None | Performance utilities | Performance optimization hook |

---

This documentation provides a comprehensive overview of all public APIs, functions, and components in the Pivotr Landing Page application. For more specific implementation details, refer to the individual component files in the source code.