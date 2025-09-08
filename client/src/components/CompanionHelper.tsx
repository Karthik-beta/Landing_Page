import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { HelpCircle, X, ChevronUp, Lightbulb, ArrowDown } from "lucide-react";

interface CompanionHelperProps {
  currentSection: string;
  visitedSections: Set<string>;
  interactionCount: number;
  onInteraction: () => void;
  className?: string;
}

const SECTION_HINTS = {
  hero: {
    title: "Welcome to Pivotr! 👋",
    content: "Start by clicking 'Get Started' or scroll to explore our solutions.",
    action: "Scroll to explore",
    actionTarget: "about",
  },
  about: {
    title: "Learn About Us 🏢",
    content: "Discover how we transform businesses with cutting-edge technology.",
    action: "See our services",
    actionTarget: "services",
  },
  services: {
    title: "Our Services 🚀",
    content: "Hover over each service card to see detailed descriptions.",
    action: "View products",
    actionTarget: "products",
  },
  products: {
    title: "Product Portfolio 💼",
    content: "Explore our comprehensive product offerings and solutions.",
    action: "See features",
    actionTarget: "features",
  },
  features: {
    title: "Key Features ⭐",
    content: "Discover what makes our solutions stand out from the competition.",
    action: "Learn how it works",
    actionTarget: "how-it-works",
  },
  cta: {
    title: "Ready to Start? ✨",
    content: "Take the next step and get started with our solutions today.",
    action: "Get in touch",
    actionTarget: "contact",
  },
  contact: {
    title: "Let's Connect 📞",
    content: "Fill out the form and we'll get back to you within 24 hours.",
    action: "Complete journey",
    actionTarget: "hero",
  },
};

export const CompanionHelper: React.FC<CompanionHelperProps> = ({
  currentSection,
  visitedSections,
  interactionCount,
  onInteraction,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(false);

  const currentHint = SECTION_HINTS[currentSection as keyof typeof SECTION_HINTS];

  // Show helper after user has been in a section for a few seconds without interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      if (interactionCount === 0 || Date.now() - interactionCount > 10000) {
        setIsVisible(true);
        setShouldPulse(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentSection, interactionCount]);

  // Pulse animation control
  useEffect(() => {
    if (shouldPulse) {
      const timer = setTimeout(() => setShouldPulse(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [shouldPulse]);

  const handleAction = () => {
    onInteraction();
    const targetElement = document.getElementById(currentHint?.actionTarget || "");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    onInteraction();
    setShouldPulse(false);
  };

  const dismiss = () => {
    setIsVisible(false);
    onInteraction();
  };

  if (!isVisible || !currentHint) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-40 transition-all duration-300 ease-in-out",
        className,
      )}
    >
      {!isExpanded ? (
        // Collapsed state - floating help button
        <Button
          size="lg"
          className={cn(
            "rounded-full w-14 h-14 shadow-lg border-2 border-primary/20",
            "bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary",
            "transition-all duration-300 ease-in-out transform hover:scale-110",
            shouldPulse && "animate-pulse shadow-primary/25 shadow-2xl",
          )}
          onClick={toggleExpanded}
        >
          <HelpCircle className="w-6 h-6" />
          <span className="sr-only">Get help</span>
        </Button>
      ) : (
        // Expanded state - helper card
        <Card
          className={cn(
            "w-80 shadow-xl border-primary/20 bg-linear-to-br from-background to-background/95",
            "backdrop-blur-xs animate-in slide-in-from-bottom-2 duration-300",
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-sm">{currentHint.title}</h4>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-muted"
                  onClick={toggleExpanded}
                >
                  <ChevronUp className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-muted"
                  onClick={dismiss}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {currentHint.content}
            </p>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1 text-xs" onClick={handleAction}>
                <ArrowDown className="w-3 h-3 mr-1" />
                {currentHint.action}
              </Button>
              <Button variant="outline" size="sm" className="text-xs" onClick={dismiss}>
                Dismiss
              </Button>
            </div>

            {/* Progress indicator */}
            <div className="mt-3 pt-3 border-t border-border/40">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Journey Progress</span>
                <span>{visitedSections.size}/11 sections</span>
              </div>
              <div className="w-full h-1 bg-muted rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-primary to-primary/80 transition-all duration-500"
                  style={{ width: `${(visitedSections.size / 11) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
