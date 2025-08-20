import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  progress: number;
  visitedSections: Set<string>;
  currentSection: string;
  className?: string;
  showDetails?: boolean;
}

const SECTION_LABELS = {
  hero: 'Welcome',
  about: 'About Us',
  services: 'Services', 
  products: 'Products',
  features: 'Features',
  'how-it-works': 'How It Works',
  partnerships: 'Partners',
  certifications: 'Certifications',
  cta: 'Get Started',
  faq: 'FAQ',
  contact: 'Contact'
};

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  visitedSections,
  currentSection,
  className,
  showDetails = false
}) => {
  return (
    <div className={cn("w-full", className)}>
      {/* Main progress bar */}
      <div className="h-1 bg-muted/30 relative overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
        {/* Shimmer effect */}
        <div 
          className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ 
            left: `${Math.max(0, progress - 10)}%`,
            animation: progress > 5 ? 'progress-shimmer 2s infinite' : 'none',
            opacity: progress > 5 ? 1 : 0
          }}
        />
      </div>

      {/* Optional section indicator */}
      {showDetails && progress > 5 && (
        <div className="px-4 py-1 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-medium">
                {SECTION_LABELS[currentSection as keyof typeof SECTION_LABELS] || 'Exploring'}
              </span>
            </div>
            
            <span>{visitedSections.size}/{Object.keys(SECTION_LABELS).length}</span>
          </div>
        </div>
      )}
    </div>
  );
};
