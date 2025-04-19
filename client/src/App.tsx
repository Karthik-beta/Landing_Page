import React, { Suspense } from "react";
// import { About } from "./components/About";
// import { Cta } from "./components/Cta";
// import { FAQ } from "./components/FAQ";
// import { Features } from "./components/Features";
// import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
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
  <div className="container py-16 flex flex-col items-center gap-4">
    <Skeleton className="h-12 w-1/2" />
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-8 w-3/4" />
  </div>
);

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <ClientsSection />
      {/* Wrap lazy-loaded components in Suspense */}
      <Suspense fallback={<LoadingFallback />}>
        <ScrollFadeIn><About /></ScrollFadeIn>
        <ScrollFadeIn delay={0.1}><HowItWorks /></ScrollFadeIn>
        <ScrollFadeIn delay={0.2}><Features /></ScrollFadeIn>
        <ScrollFadeIn delay={0.3}><Services /></ScrollFadeIn>
        <ScrollFadeIn delay={0.4}><Cta /></ScrollFadeIn>
        <ScrollFadeIn delay={0.4}><FAQ /></ScrollFadeIn>
        <ScrollFadeIn delay={0.5}><Footer /></ScrollFadeIn>
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
