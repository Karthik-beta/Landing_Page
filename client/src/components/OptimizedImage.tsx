import { useState, useEffect, useRef, useCallback } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  quality?: number;
}

// Modern image component with WebP/AVIF support and lazy loading
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes = "100vw",
  placeholder = "empty",
  quality = 75,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>("");
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate modern format sources
  const generateSources = useCallback((originalSrc: string) => {
    const basePath = originalSrc.replace(/\.[^/.]+$/, "");
    return {
      avif: `${basePath}.avif`,
      webp: `${basePath}.webp`,
      original: originalSrc
    };
  }, []);

  // Check format support and load appropriate image
  const loadOptimalImage = useCallback(async (imageSrc: string) => {
    const sources = generateSources(imageSrc);
    
    // Check AVIF support
    if (await checkImageSupport('data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=')) {
      setCurrentSrc(sources.avif);
    }
    // Check WebP support
    else if (await checkImageSupport('data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA')) {
      setCurrentSrc(sources.webp);
    }
    // Fallback to original
    else {
      setCurrentSrc(sources.original);
    }
  }, [generateSources]);

  // Check if image format is supported
  const checkImageSupport = (dataURL: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = dataURL;
    });
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadOptimalImage(src);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => observerRef.current?.disconnect();
  }, [src, priority, loadOptimalImage]);

  // Load immediately if priority
  useEffect(() => {
    if (priority) {
      loadOptimalImage(src);
    }
  }, [src, priority, loadOptimalImage]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    // Fallback to original image
    if (currentSrc !== src) {
      setCurrentSrc(src);
    }
  }, [currentSrc, src]);

  return (
    <div className={`relative ${className}`}>
      {/* Placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{ width, height }}
        />
      )}
      
      {/* Main Image */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...props}
      />
      
      {/* Error fallback */}
      {hasError && (
        <div 
          className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400"
          style={{ width, height }}
        >
          <span className="text-sm">Image failed to load</span>
        </div>
      )}
    </div>
  );
};
