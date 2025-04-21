import React, { Suspense } from "react";
// import { About } from "./components/About";
// import { Cta } from "./components/Cta";
// import { FAQ } from "./components/FAQ";
// import { Features } from "./components/Features";
// import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import { Partnerships } from "./components/Partnerships";
import { Certifications } from "./components/Certifications";
// import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
// import { Services } from "./components/Services";
import { ClientsSection } from "./components/Sponsors";
// import { Team } from "./components/Team";
// import { Testimonials } from "./components/Testimonials";
import { ScrollFadeIn } from "./components/ScrollFadeIn";
import { Skeleton } from "./components/ui/skeleton"; 
import "./App.css";

// Lazy load components
const About = React.lazy(() => import("./components/About").then(module => ({ default: module.About })));
const HowItWorks = React.lazy(() => import("./components/HowItWorks").then(module => ({ default: module.HowItWorks })));
const Features = React.lazy(() => import("./components/Features").then(module => ({ default: module.Features })));
const Services = React.lazy(() => import("./components/Services").then(module => ({ default: module.Services })));
const Cta = React.lazy(() => import("./components/Cta").then(module => ({ default: module.Cta })));
const FAQ = React.lazy(() => import("./components/FAQ").then(module => ({ default: module.FAQ })));
const Footer = React.lazy(() => import("./components/Footer").then(module => ({ default: module.Footer })));

// Define a loading component
const LoadingFallback = () => (
  <div className="container py-16 space-y-8"> {/* Added space-y for vertical spacing */}
    {/* Section Title Skeleton */}
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="h-10 w-1/2 sm:w-1/3" /> {/* Centered title */}
      <Skeleton className="h-6 w-3/4 sm:w-1/2" /> {/* Centered subtitle */}
    </div>

    {/* Content Skeleton (e.g., mimicking cards or feature lists) */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Repeat a card-like skeleton structure */}
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex flex-col space-y-3 p-4 border rounded-lg"> {/* Added border and padding */}
          <Skeleton className="h-32 w-full rounded-md" /> {/* Image/Icon placeholder */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" /> {/* Card title */}
            <Skeleton className="h-4 w-full" /> {/* Card description line 1 */}
            <Skeleton className="h-4 w-5/6" /> {/* Card description line 2 */}
          </div>
        </div>
      ))}
    </div>
  </div>
);

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <ClientsSection />
      <ScrollFadeIn delay={0.05}><Partnerships /></ScrollFadeIn>
      {/* Wrap lazy-loaded components in Suspense */}
      <Suspense fallback={<LoadingFallback />}>
        <ScrollFadeIn><About /></ScrollFadeIn>
        <ScrollFadeIn delay={0.1}><Products /></ScrollFadeIn>
        <ScrollFadeIn delay={0.2}><HowItWorks /></ScrollFadeIn>
        <ScrollFadeIn delay={0.3}><Features /></ScrollFadeIn>
        <ScrollFadeIn delay={0.4}><Services /></ScrollFadeIn>
        <ScrollFadeIn delay={0.45}><Certifications /></ScrollFadeIn>
        <ScrollFadeIn delay={0.5}><Cta /></ScrollFadeIn>
        <ScrollFadeIn delay={0.6}><FAQ /></ScrollFadeIn>
        <ScrollFadeIn delay={0.7}><Footer /></ScrollFadeIn>
      </Suspense>
      {/* <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <FAQ /> 
      <Footer /> */}
      <ScrollToTop />
    </>
  );
}

export default App;
