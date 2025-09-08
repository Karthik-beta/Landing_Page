import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { ArrowUpToLine } from "lucide-react";

export const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    const shouldShow = window.scrollY > 400;
    setShowTopBtn(shouldShow);
  }, []);

  useEffect(() => {
    let ticking = false;

    // Throttled handler using requestAnimationFrame
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add event listener with passive flag for better performance
    window.addEventListener("scroll", throttledScrollHandler, { passive: true });

    // Cleanup function to prevent memory leaks
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
    };
  }, [handleScroll]);

  const goToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
    });
  };

  return (
    <>
      {showTopBtn && (
        <Button
          onClick={goToTop}
          className="fixed bottom-4 right-4 opacity-90 shadow-md"
          size="icon"
        >
          <ArrowUpToLine className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};
