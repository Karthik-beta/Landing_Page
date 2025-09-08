// components/ScrollFadeIn.tsx - Optimized CSS-based alternative
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  delay?: number;
};

export const ScrollFadeIn = ({ children, delay = 0 }: Props) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (inView) {
      // Apply delay before triggering animation
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [inView, delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        shouldAnimate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: shouldAnimate ? "0ms" : `${delay * 1000}ms`,
      }}
    >
      {children}
    </div>
  );
};
