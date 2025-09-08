import React, { Suspense, useDeferredValue } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ClientsSection } from "./components/Sponsors";
import { ScrollToTop } from "./components/ScrollToTop";
import { Toaster } from "./components/ui/toaster"; 
import { Toaster as SonnerToaster } from "./components/ui/sonner";
import { ScrollFadeIn } from "./components/ScrollFadeIn";
import { Skeleton } from "./components/ui/skeleton";
import { useUserCompanion } from "./hooks/use-user-companion";
import "./App.css";

// React 19: Enhanced lazy loading with priority hints
const About = React.lazy(() => import("./components/About").then(module => ({ default: module.About })));
const Partnerships = React.lazy(() => import("./components/Partnerships").then(module => ({ default: module.Partnerships })));
const Products = React.lazy(() => import("./components/Products").then(module => ({ default: module.Products })));
const Certifications = React.lazy(() => import("./components/Certifications").then(module => ({ default: module.Certifications })));
const ContactForm = React.lazy(() => import("./components/ContactForm").then(module => ({ default: module.ContactForm })));
const HowItWorks = React.lazy(() => import("./components/HowItWorks").then(module => ({ default: module.HowItWorks })));
const Features = React.lazy(() => import("./components/Features").then(module => ({ default: module.Features })));
const Services = React.lazy(() => import("./components/Services").then(module => ({ default: module.Services })));
const Cta = React.lazy(() => import("./components/Cta").then(module => ({ default: module.Cta })));
const FAQ = React.lazy(() => import("./components/FAQ").then(module => ({ default: module.FAQ })));
const Footer = React.lazy(() => import("./components/Footer").then(module => ({ default: module.Footer })));

// Preload components during idle time
if (typeof window !== 'undefined') {
  requestIdleCallback(() => {
    import("./components/About").catch(() => {});
    import("./components/Products").catch(() => {});
    import("./components/Services").catch(() => {});
  });
}

// React 19: Enhanced loading fallback with better skeletons
const LoadingFallback = React.memo(() => (
  <div className="container py-16 space-y-8">
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="h-10 w-1/2 sm:w-1/3" />
      <Skeleton className="h-6 w-3/4 sm:w-1/2" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex flex-col space-y-3 p-4 border rounded-lg">
          <Skeleton className="h-32 w-full rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      ))}
    </div>
  </div>
));

function App() {
  const companion = useUserCompanion();
  
  // React 19: Use deferred value for non-critical companion data
  const deferredCompanion = useDeferredValue(companion);

  return (
    <>
      <Navbar companion={deferredCompanion} />
      <Hero />
      <ClientsSection />
      
      {/* <ScrollFadeIn delay={0.05}>
        <Suspense fallback={<LoadingFallback />}>
          <Partnerships />
        </Suspense>
      </ScrollFadeIn> */}
      
      <Suspense fallback={<LoadingFallback />}>
        <ScrollFadeIn><About /></ScrollFadeIn>
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <ScrollFadeIn delay={0.05}><Products /></ScrollFadeIn>
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <ScrollFadeIn delay={0.1}><HowItWorks /></ScrollFadeIn>
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <ScrollFadeIn delay={0.2}><Features /></ScrollFadeIn>
        <ScrollFadeIn delay={0.3}><Services /></ScrollFadeIn>
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <ScrollFadeIn delay={0.4}><Certifications /></ScrollFadeIn>
        <ScrollFadeIn delay={0.5}><Cta /></ScrollFadeIn>
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <ScrollFadeIn delay={0.6}><FAQ /></ScrollFadeIn>
        <ScrollFadeIn delay={0.7}><ContactForm /></ScrollFadeIn>
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <ScrollFadeIn delay={0.8}><Footer /></ScrollFadeIn>
      </Suspense>
      
      <ScrollToTop />
      <Toaster />
      <SonnerToaster />
    </>
  );
}

export default App;
