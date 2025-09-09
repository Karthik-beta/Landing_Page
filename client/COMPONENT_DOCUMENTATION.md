# Component Documentation

## Detailed Component Reference

### Core Landing Page Components

## Hero Component

**File:** `src/components/Hero.tsx`

The main hero section component featuring animated typewriter text and call-to-action buttons.

### Props
```typescript
// No props - stateless component
```

### Features
- Animated typewriter effect with customizable words
- Gradient text styling with shimmer effect
- Responsive design for all screen sizes
- Smooth scroll navigation to about section
- Hero cards integration

### Usage
```tsx
import { Hero } from './components/Hero';

function App() {
  return <Hero />;
}
```

### Implementation Details
- Uses `TypewriterText` component for animated text
- Integrates `HeroCards` component for visual elements
- Implements smooth scroll behavior for navigation
- Responsive grid layout with `lg:grid-cols-2`

---

## Navbar Component

**File:** `src/components/Navbar.tsx`

Responsive navigation bar with mobile menu, progress tracking, and theme toggle.

### Props
```typescript
interface NavbarProps {
  companion?: {
    scrollProgress: number;
    visitedSections: Set<string>;
    currentSection: string;
  };
}
```

### Features
- Responsive navigation menu
- Mobile hamburger menu with sheet component
- Progress indicator integration
- Dark/light mode toggle
- Section tracking and navigation
- Sticky header positioning

### Usage
```tsx
import { Navbar } from './components/Navbar';
import { useUserCompanion } from './hooks/use-user-companion';

function App() {
  const companion = useUserCompanion();
  return <Navbar companion={companion} />;
}
```

### Implementation Details
- Uses Radix UI NavigationMenu for accessibility
- Implements Sheet component for mobile menu
- Integrates with companion hook for progress tracking
- Responsive design with `hidden md:flex` patterns

---

## About Component

**File:** `src/components/About.tsx`

About section with animated typewriter text and company statistics.

### Props
```typescript
// No props - stateless component
```

### Features
- Typewriter animation for paragraph text
- Intersection observer for animation triggers
- Company statistics display
- Responsive image layout
- Optimized animation performance

### Usage
```tsx
import { About } from './components/About';

function App() {
  return <About />;
}
```

### Implementation Details
- Custom typewriter animation with 40 FPS timing
- Intersection observer with 0.3 threshold
- Statistics component integration
- Responsive flex layout with `flex-col-reverse md:flex-row`

---

## Features Component

**File:** `src/components/Features.tsx`

Features showcase section with interactive cards and feature badges.

### Props
```typescript
// No props - stateless component
```

### Features
- Feature cards with hover effects
- Badge display for feature tags
- Responsive grid layout
- Icon integration
- Card-based design system

### Usage
```tsx
import { Features } from './components/Features';

function App() {
  return <Features />;
}
```

### Implementation Details
- Uses shadcn/ui Card components
- Implements feature list with badges
- Responsive grid with `md:grid-cols-2 lg:grid-cols-3`
- Static feature data with TypeScript interfaces

---

## Services Component

**File:** `src/components/Services.tsx`

Services section with interactive cards and detailed information on hover.

### Props
```typescript
// No props - stateless component
```

### Features
- Interactive service cards with hover effects
- Detailed information reveal on hover
- Icon integration with custom icons
- Responsive design
- Smooth animations and transitions

### Usage
```tsx
import { Services } from './components/Services';

function App() {
  return <Services />;
}
```

### Implementation Details
- Custom hover effects with CSS transitions
- Icon components for visual elements
- Responsive grid layout
- Card-based design with detailed information panels

---

## Products Component

**File:** `src/components/Products.tsx`

Product showcase section highlighting the business operating system.

### Props
```typescript
// No props - stateless component
```

### Features
- Product feature highlights
- Visual illustrations
- Call-to-action elements
- Responsive layout
- Feature cards with icons

### Usage
```tsx
import { Products } from './components/Products';

function App() {
  return <Products />;
}
```

### Implementation Details
- Multi-section layout with feature cards
- Icon integration with Lucide React
- Responsive grid system
- Card-based design with hover effects

---

## ContactForm Component

**File:** `src/components/ContactForm.tsx`

Contact form with validation, submission handling, and Google Maps integration.

### Props
```typescript
// No props - stateless component
```

### Features
- Form validation and error handling
- Toast notifications for feedback
- Google Maps iframe integration
- Optimized form handling with refs
- Responsive layout

### Usage
```tsx
import { ContactForm } from './components/ContactForm';

function App() {
  return <ContactForm />;
}
```

### Implementation Details
- Uses Formspree for form submission
- Implements useRef for form data to avoid re-renders
- Toast integration for user feedback
- Google Maps embed with proper attributes
- Responsive grid layout

---

## ROICalculator Component

**File:** `src/components/ROICalculator.tsx`

Interactive ROI calculator with real-time calculations and animated displays.

### Props
```typescript
// No props - stateless component
```

### Features
- Real-time calculation updates
- Custom stepper input components
- Animated number displays with count-up effect
- Responsive design
- Indian Rupee formatting
- Range calculations with scenario bands

### Usage
```tsx
import { ROICalculator } from './components/ROICalculator';

function App() {
  return <ROICalculator />;
}
```

### Implementation Details
- Custom StepperInput component for number inputs
- useCountUp hook for animated number displays
- Intersection observer for animation triggers
- Real-time calculation with useEffect
- Indian Rupee formatting utilities

---

## Utility Components

## TypewriterText Component

**File:** `src/components/TypewriterText.tsx`

Animated typewriter text component with customizable timing and cursor effects.

### Props
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

### Features
- Configurable typing and deleting speeds
- Customizable delay between words
- Loop functionality
- Animated cursor with different states
- Custom styling support

### Usage
```tsx
import { TypewriterText } from './components/TypewriterText';

<TypewriterText
  words={["Business", "Teams", "Growth", "Success", "Future"]}
  className="text-2xl font-bold"
  typeSpeed={120}
  deleteSpeed={80}
  delayBetweenWords={2500}
  showCursor={true}
  cursorClassName="bg-blue-500"
/>
```

### Implementation Details
- Uses `useTypewriter` hook for animation logic
- Customizable cursor with different colors for typing/deleting
- CSS classes for styling integration
- Smooth animation timing

---

## ScrollFadeIn Component

**File:** `src/components/ScrollFadeIn.tsx`

Scroll-triggered fade-in animation component with configurable delay.

### Props
```typescript
interface ScrollFadeInProps {
  children: React.ReactNode;
  delay?: number;
}
```

### Features
- Intersection observer for scroll detection
- Configurable animation delay
- Smooth CSS transitions
- One-time animation trigger
- Responsive design

### Usage
```tsx
import { ScrollFadeIn } from './components/ScrollFadeIn';

<ScrollFadeIn delay={0.1}>
  <YourComponent />
</ScrollFadeIn>
```

### Implementation Details
- Uses `react-intersection-observer` for performance
- CSS transitions for smooth animations
- Configurable delay with setTimeout
- One-time trigger with `triggerOnce: true`

---

## UI Components

## Button Component

**File:** `src/components/ui/button.tsx`

Versatile button component with multiple variants and sizes.

### Props
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}
```

### Variants
- `default`: Primary button with solid background
- `destructive`: Destructive action button (red)
- `outline`: Outlined button with border
- `secondary`: Secondary button with muted background
- `ghost`: Ghost button with hover effects
- `link`: Link-style button with underline

### Sizes
- `default`: Standard button height (h-10)
- `sm`: Small button height (h-9)
- `lg`: Large button height (h-11)
- `icon`: Square icon button (h-10 w-10)

### Usage
```tsx
import { Button } from './components/ui/button';

// Basic usage
<Button>Click me</Button>

// With variants and sizes
<Button variant="outline" size="lg">
  Large Outline Button
</Button>

// As child element
<Button asChild>
  <a href="/link">Link Button</a>
</Button>
```

---

## Card Components

**File:** `src/components/ui/card.tsx`

Card component system with header, content, and footer sections.

### Components
- `Card`: Main card container
- `CardHeader`: Card header section
- `CardTitle`: Card title element
- `CardDescription`: Card description text
- `CardContent`: Card content area
- `CardFooter`: Card footer section

### Usage
```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from './components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

## Additional Components

## ProgressIndicator Component

**File:** `src/components/ProgressIndicator.tsx`

Progress indicator showing scroll progress and section tracking.

### Props
```typescript
interface ProgressIndicatorProps {
  progress: number;
  visitedSections: Set<string>;
  currentSection: string;
}
```

### Features
- Visual progress bar
- Section tracking display
- Smooth animations
- Responsive design

---

## Statistics Component

**File:** `src/components/Statistics.tsx`

Company statistics display with animated counters.

### Props
```typescript
// No props - stateless component
```

### Features
- Animated number counters
- Company metrics display
- Responsive grid layout
- Smooth animations

---

## HeroCards Component

**File:** `src/components/HeroCards.tsx`

Hero section visual cards with animations.

### Props
```typescript
// No props - stateless component
```

### Features
- Animated card elements
- Visual hierarchy
- Responsive design
- Smooth transitions

---

## Component Integration Patterns

### Suspense Integration
```tsx
import { Suspense } from 'react';
import { ScrollFadeIn } from './components/ScrollFadeIn';

<Suspense fallback={<LoadingFallback />}>
  <ScrollFadeIn delay={0.1}>
    <YourComponent />
  </ScrollFadeIn>
</Suspense>
```

### Companion Integration
```tsx
import { useUserCompanion } from './hooks/use-user-companion';
import { Navbar } from './components/Navbar';

function App() {
  const companion = useUserCompanion();
  
  return (
    <div>
      <Navbar companion={companion} />
      {/* Other components */}
    </div>
  );
}
```

### Toast Integration
```tsx
import { useToast } from './hooks/use-toast';
import { Button } from './components/ui/button';

function MyComponent() {
  const { toast } = useToast();
  
  const handleClick = () => {
    toast({
      title: "Success!",
      description: "Action completed successfully."
    });
  };
  
  return <Button onClick={handleClick}>Show Toast</Button>;
}
```

---

This comprehensive component documentation provides detailed information about each component's props, features, usage patterns, and implementation details. Each component is designed to be reusable, accessible, and performant within the Pivotr Landing Page application.