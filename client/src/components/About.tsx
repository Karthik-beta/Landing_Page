import { Statistics } from "./Statistics";
import aboutUs from "../assets/undraw_team-work_i1f3.svg";
import { useState, useEffect, useRef } from "react";

export const About = () => {
  const paragraphText = `Transforming Enterprises Through Technology.\n\nPivotr delivers innovative solutions, seamlessly integrating hardware and software for comprehensive business transformation.  We specialize in optimizing operations and streamlining workflows across enterprise operations, scalable cloud storage and advanced automation.`;
  
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Start animation when component becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => observer.disconnect();
  }, []);

  // Typewriter animation with optimized intervals
  useEffect(() => {
    if (!isVisible) return;

    if (currentIndex < paragraphText.length) {
      intervalRef.current = setTimeout(() => {
        setDisplayedText((prev) => prev + paragraphText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 25); // 25ms = 40 FPS, much better than 10ms = 100 FPS
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [currentIndex, paragraphText, isVisible]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={aboutUs}
            alt=""
            className="w-[300px] object-contain rounded-lg mx-auto md:mx-0"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                Us
              </h2>
              {/* <p className="text-xl text-muted-foreground mt-4">
                At Pivotr, we lead the way in delivering innovative enterprise systems that seamlessly integrate hardware and software for comprehensive business solutions. Our expertise in digital transformation and advanced automation positions us as key enablers of operational excellence and business process optimization across a wide range of industries. 
              </p> */}
              <p className="text-xl text-muted-foreground mt-4">
                {displayedText}
                {currentIndex < paragraphText.length && (
                  <span 
                    className="inline-block w-0.5 h-[1em] ml-1 bg-gradient-to-b from-[#61DAFB] to-[#03a3d7] animate-pulse"
                    style={{ animationDuration: '1s' }}
                  />
                )}
              </p>
              {/* <Typewriter text="At Pivotr, we lead the way in delivering innovative enterprise systems that seamlessly integrate hardware and software for comprehensive business solutions. Our expertise in digital transformation and advanced automation positions us as key enablers of operational excellence and business process optimization across a wide range of industries." /> */}
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};