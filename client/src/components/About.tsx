import { Statistics } from "./Statistics";
import aboutUs from "../assets/undraw_team-work_i1f3.svg";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const About = () => {

  const paragraphText = `Transforming Enterprises Through Technology.\n\nPivotr delivers innovative solutions, seamlessly integrating hardware and software for comprehensive business transformation.  We specialize in optimizing operations and streamlining workflows across enterprise operations, scalable cloud storage and advanced automation.`;
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < paragraphText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prevText) => prevText + paragraphText[charIndex]);
        setCharIndex(charIndex + 1);
      }, 10); // Adjust the timeout for typing speed
      return () => clearTimeout(timeout); // Clear timeout on unmount or text change
    }
  }, [charIndex, paragraphText]);

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
              <motion.p
                className="text-xl text-muted-foreground mt-4"
                initial={{ opacity: 0 }} // Optionally fade-in the whole paragraph
                animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }} // Optional fade-in animation
              >
                {displayedText}
                {charIndex < paragraphText.length && (
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0, transition: { duration: 0.7, repeat: Infinity, repeatType: "reverse", repeatDelay: 0 } }}
                    style={{ display: 'inline-block' }} // Keep cursor inline
                  >
                    |
                  </motion.span>
                )}
              </motion.p>
              {/* <Typewriter text="At Pivotr, we lead the way in delivering innovative enterprise systems that seamlessly integrate hardware and software for comprehensive business solutions. Our expertise in digital transformation and advanced automation positions us as key enablers of operational excellence and business process optimization across a wide range of industries." /> */}
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};