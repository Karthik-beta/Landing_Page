import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

interface CompanionState {
  visitedSections: Set<string>;
  currentSection: string;
  scrollProgress: number;
  interactionCount: number;
  showHelp: boolean;
  hasInteracted: boolean;
  lastInteraction: number;
  lastToastTime: number;
  shownMessages: Set<string>;
}

interface CompanionActions {
  trackSectionVisit: (sectionId: string) => void;
  trackInteraction: () => void;
  updateScrollProgress: (progress: number) => void;
  setCurrentSection: (section: string) => void;
  toggleHelp: () => void;
  showContextualHint: (message: string, type?: 'info' | 'success' | 'warning') => void;
}

const SECTIONS = [
  'hero',
  'about', 
  'services',
  'products',
  'features',
  'how-it-works',
  'partnerships',
  'certifications',
  'cta',
  'faq',
  'contact'
];

const HELPFUL_MESSAGES = {
  welcome: ["👋 Welcome! Explore our solutions at your own pace.", "🌟 Welcome to Pivotr! Discover how we can transform your business."],
  services: ["🚀 Hover over service cards for detailed information.", "💡 Each service card reveals more details on hover."],
  products: ["💼 Explore our comprehensive product portfolio.", "🎯 Discover solutions tailored for your business needs."],
  cta: ["✨ Ready to transform your business? Let's get started!", "🚀 Take the next step towards digital transformation."],
  contact: ["📞 Let's connect! We'll respond within 24 hours.", "🤝 Fill out the form and we'll be in touch soon."],
  milestone: ["🎯 Great progress exploring our offerings!", "🌟 You're getting a comprehensive view of our solutions!"]
};

const getRandomMessage = (messageArray: string[]): string => {
  return messageArray[Math.floor(Math.random() * messageArray.length)];
};

const shouldShowToast = (messageKey: string, lastToastTime: number, shownMessages: Set<string>): boolean => {
  const now = Date.now();
  const timeSinceLastToast = now - lastToastTime;
  
  // Don't show duplicate messages
  if (shownMessages.has(messageKey)) return false;
  
  // Minimum 12 seconds between any toasts
  if (timeSinceLastToast < 12000) return false;
  
  return true;
};

export const useUserCompanion = (): CompanionState & CompanionActions => {
  const [state, setState] = useState<CompanionState>({
    visitedSections: new Set(),
    currentSection: 'hero',
    scrollProgress: 0,
    interactionCount: 0,
    showHelp: false,
    hasInteracted: false,
    lastInteraction: Date.now(),
    lastToastTime: 0,
    shownMessages: new Set(),
  });

  const showContextualHint = useCallback((message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const icons = {
      info: '💡',
      success: '✨', 
      warning: '⚠️'
    };
    
    toast(message, {
      icon: icons[type],
      duration: 4000,
      position: 'bottom-right',
      className: 'companion-toast',
    });

    setState(prev => ({
      ...prev,
      lastToastTime: Date.now()
    }));
  }, []);

  const trackSectionVisit = useCallback((sectionId: string) => {
    setState(prev => {
      const newVisited = new Set(prev.visitedSections);
      const wasNew = !newVisited.has(sectionId);
      newVisited.add(sectionId);
      
      // Show contextual hints for key sections (only once and with timing)
      if (wasNew && shouldShowToast(sectionId, prev.lastToastTime, prev.shownMessages)) {
        const newShownMessages = new Set(prev.shownMessages);
        newShownMessages.add(sectionId);
        
        setTimeout(() => {
          let message = '';
          switch (sectionId) {
            case 'services':
              message = getRandomMessage(HELPFUL_MESSAGES.services);
              break;
            case 'products':
              message = getRandomMessage(HELPFUL_MESSAGES.products);
              break;
            case 'cta':
              message = getRandomMessage(HELPFUL_MESSAGES.cta);
              break;
            case 'contact':
              message = getRandomMessage(HELPFUL_MESSAGES.contact);
              break;
          }
          
          if (message) {
            showContextualHint(message, sectionId === 'cta' || sectionId === 'contact' ? 'success' : 'info');
          }
        }, 1000);

        return {
          ...prev,
          visitedSections: newVisited,
          currentSection: sectionId,
          shownMessages: newShownMessages,
        };
      }

      return {
        ...prev,
        visitedSections: newVisited,
        currentSection: sectionId,
      };
    });
  }, [showContextualHint]);

  const trackInteraction = useCallback(() => {
    setState(prev => ({
      ...prev,
      interactionCount: prev.interactionCount + 1,
      hasInteracted: true,
      lastInteraction: Date.now(),
    }));
  }, []);

  const updateScrollProgress = useCallback((progress: number) => {
    setState(prev => {
      const newProgress = Math.max(0, Math.min(100, progress));
      
      // Show milestone toasts at key progress points (but not too frequently)
      const milestoneKey = `milestone-${Math.floor(progress / 33)}`;
      if (progress > 33 && progress < 90 && prev.visitedSections.size >= 3 && 
          shouldShowToast(milestoneKey, prev.lastToastTime, prev.shownMessages)) {
        
        const newShownMessages = new Set(prev.shownMessages);
        newShownMessages.add(milestoneKey);
        
        setTimeout(() => {
          showContextualHint(getRandomMessage(HELPFUL_MESSAGES.milestone), 'info');
        }, 500);

        return {
          ...prev,
          scrollProgress: newProgress,
          shownMessages: newShownMessages,
        };
      }

      return {
        ...prev,
        scrollProgress: newProgress,
      };
    });
  }, [showContextualHint]);

  const setCurrentSection = useCallback((section: string) => {
    setState(prev => ({ ...prev, currentSection: section }));
  }, []);

  const toggleHelp = useCallback(() => {
    setState(prev => ({ ...prev, showHelp: !prev.showHelp }));
  }, []);

  // Welcome message on mount (only once)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (shouldShowToast('welcome', 0, new Set())) {
        setState(prev => {
          const newShownMessages = new Set(prev.shownMessages);
          newShownMessages.add('welcome');
          return {
            ...prev,
            shownMessages: newShownMessages,
          };
        });
        showContextualHint(getRandomMessage(HELPFUL_MESSAGES.welcome), 'info');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [showContextualHint]);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      updateScrollProgress(progress);
    };

    // Section intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const sectionId = entry.target.id;
            if (SECTIONS.includes(sectionId)) {
              trackSectionVisit(sectionId);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px' }
    );

    // Observe all sections
    SECTIONS.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [trackSectionVisit, updateScrollProgress]);

  return {
    ...state,
    trackSectionVisit,
    trackInteraction,
    updateScrollProgress,
    setCurrentSection,
    toggleHelp,
    showContextualHint,
  };
};
