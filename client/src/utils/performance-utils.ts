// Critical CSS extraction utility
export function extractCriticalCSS() {
  if (typeof window === "undefined") return "";

  // Get viewport dimensions
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  // Find all elements in the initial viewport
  const criticalElements = Array.from(document.querySelectorAll("*")).filter((el) => {
    const rect = el.getBoundingClientRect();
    return rect.top < viewportHeight && rect.left < viewportWidth;
  });

  // Extract CSS rules for critical elements
  const criticalRules = new Set<string>();

  Array.from(document.styleSheets).forEach((sheet) => {
    try {
      Array.from(sheet.cssRules || []).forEach((rule) => {
        if (rule instanceof CSSStyleRule) {
          // Check if rule applies to any critical element
          criticalElements.forEach((el) => {
            if (el.matches(rule.selectorText)) {
              criticalRules.add(rule.cssText);
            }
          });
        }
      });
    } catch (e) {
      // Cross-origin stylesheets may throw errors
    }
  });

  return Array.from(criticalRules).join("\n");
}

// Inline critical CSS
export function inlineCriticalCSS() {
  if (typeof document === "undefined") return;

  const criticalCSS = extractCriticalCSS();
  if (!criticalCSS) return;

  const style = document.createElement("style");
  style.textContent = criticalCSS;
  style.setAttribute("data-critical", "true");
  document.head.insertBefore(style, document.head.firstChild);
}

// Resource timing analysis
export function analyzeResourceTiming() {
  if (!("performance" in window)) return null;

  const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];

  const analysis = {
    totalRequests: resources.length,
    totalBytes: 0,
    slowestResources: [] as any[],
    largestResources: [] as any[],
    byType: {} as Record<string, number>,
  };

  resources.forEach((resource) => {
    // Calculate transfer size
    const transferSize = resource.transferSize || 0;
    analysis.totalBytes += transferSize;

    // Categorize by type
    const type = getResourceType(resource.name);
    analysis.byType[type] = (analysis.byType[type] || 0) + 1;

    // Track slow resources (>1 second)
    if (resource.duration > 1000) {
      analysis.slowestResources.push({
        name: resource.name,
        duration: resource.duration,
        type,
      });
    }

    // Track large resources (>100KB)
    if (transferSize > 100000) {
      analysis.largestResources.push({
        name: resource.name,
        size: transferSize,
        type,
      });
    }
  });

  // Sort by duration and size
  analysis.slowestResources.sort((a, b) => b.duration - a.duration);
  analysis.largestResources.sort((a, b) => b.size - a.size);

  return analysis;
}

function getResourceType(url: string): string {
  if (url.includes(".js")) return "script";
  if (url.includes(".css")) return "stylesheet";
  if (url.match(/\.(png|jpg|jpeg|gif|svg|webp|avif)$/)) return "image";
  if (url.match(/\.(woff|woff2|ttf|eot)$/)) return "font";
  return "other";
}

// Preload next section resources
export function preloadNextSection() {
  if (typeof window === "undefined") return;

  const currentSection = getCurrentSection();
  const nextSection = getNextSection(currentSection);

  if (nextSection) {
    // Preload next section's resources
    preloadSectionResources(nextSection);
  }
}

function getCurrentSection(): string {
  const sections = ["hero", "about", "services", "products", "features"];
  const windowHeight = window.innerHeight;

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
        return sectionId;
      }
    }
  }

  return "hero";
}

function getNextSection(current: string): string | null {
  const sections = ["hero", "about", "services", "products", "features", "contact"];
  const currentIndex = sections.indexOf(current);
  return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
}

function preloadSectionResources(section: string) {
  // Define resources needed for each section
  const sectionResources: Record<string, string[]> = {
    about: ["/assets/undraw_team-work_i1f3.svg"],
    services: ["/assets/undraw_services_dhxj.svg"],
    products: ["/assets/undraw_visionary-technology_6ouq.svg"],
    features: ["/assets/undraw_all-the-data_5lil.svg"],
  };

  const resources = sectionResources[section] || [];

  resources.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url;
    document.head.appendChild(link);
  });
}
