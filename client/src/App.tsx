import { About } from "./components/About";
import { Cta } from "./components/Cta";
import { FAQ } from "./components/FAQ";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import { Services } from "./components/Services";
import { ClientsSection } from "./components/Sponsors";
// import { Team } from "./components/Team";
// import { Testimonials } from "./components/Testimonials";
import { ScrollFadeIn } from "./components/ScrollFadeIn";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <ClientsSection />
      <ScrollFadeIn><About /></ScrollFadeIn>
      <ScrollFadeIn delay={0.1}><HowItWorks /></ScrollFadeIn>
      <ScrollFadeIn delay={0.2}><Features /></ScrollFadeIn>
      <ScrollFadeIn delay={0.3}><Services /></ScrollFadeIn>
      <ScrollFadeIn delay={0.4}><Cta /></ScrollFadeIn>
      <ScrollFadeIn delay={0.4}><FAQ /></ScrollFadeIn>
      <ScrollFadeIn delay={0.5}><Footer /></ScrollFadeIn>
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
