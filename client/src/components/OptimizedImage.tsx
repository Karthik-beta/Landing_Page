import React, { useState, useCallback, memo } from "react";
import {
  useOptimizedIntersectionObserver,
  usePerformanceMonitor,
} from "@/utils/react19-performance";

/**
 * Props for the OptimizedImage component.
 * @interface OptimizedImageProps
 */
interface OptimizedImageProps {
  /** The source URL of the image. */
  src: string;
  /** The alternative text for the image. */
  alt: string;
  /** The width of the image. */
  width?: number;
  /** The height of the image. */
  height?: number;
  /** Additional CSS classes for the component. */
  className?: string;
  /** Whether the image should be loaded with high priority. */
  priority?: boolean;
  /** The type of placeholder to display while the image is loading. */
  placeholder?: "blur-sm" | "empty";
  /** The data URL for the blur-up placeholder. */
  blurDataURL?: string;
  /** The sizes attribute for the image. */
  sizes?: string;
  /** The quality of the image (0-100). */
  quality?: number;
  /** The loading strategy for the image. */
  loading?: "lazy" | "eager";
  /** A callback function to be called when the image has loaded. */
  onLoad?: () => void;
  /** A callback function to be called if the image fails to load. */
  onError?: () => void;
  /** Additional inline styles for the component. */
  style?: React.CSSProperties;
}

/**
 * An optimized image component for React 19.
 *
 * This component provides enhanced image loading with modern performance
 * features, including lazy loading, placeholders, and error handling. It also
 * includes utilities for preloading images.
 *
 * @param {OptimizedImageProps} props The props for the component.
 * @returns {JSX.Element} The rendered image component.
 */
const OptimizedImageComponent: React.FC<OptimizedImageProps> = memo(
  ({
    src,
    alt,
    width,
    height,
    className = "",
    priority = false,
    placeholder = "empty",
    blurDataURL,
    sizes,
    quality,
    loading = "lazy",
    onLoad,
    onError,
    style,
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState<string>("");

    // React 19: Performance monitoring
    usePerformanceMonitor("OptimizedImage");

    // React 19: Optimized intersection observer
    const imgRef = React.useRef<HTMLImageElement>(null);
    const { isIntersecting } = useOptimizedIntersectionObserver(
      imgRef as React.RefObject<Element>,
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );

    // React 19: Enhanced image loading logic
    const handleImageLoad = useCallback(() => {
      setIsLoaded(true);
      onLoad?.();
    }, [onLoad]);

    const handleImageError = useCallback(() => {
      setHasError(true);
      onError?.();
    }, [onError]);

    // React 19: Smart image source management with quality optimization
    React.useEffect(() => {
      if (priority || isIntersecting) {
        // Add quality parameter to URL if supported (for services like Cloudinary, etc.)
        let optimizedSrc = src;
        if (quality && typeof quality === "number" && quality > 0 && quality <= 100) {
          const separator = src.includes("?") ? "&" : "?";
          optimizedSrc = `${src}${separator}q=${quality}`;
        }
        setCurrentSrc(optimizedSrc);
      }
    }, [src, priority, isIntersecting, quality]);

    // React 19: Optimized placeholder logic
    const placeholderStyle = React.useMemo(() => {
      if (placeholder === "blur-sm" && blurDataURL) {
        return {
          backgroundImage: `url(${blurDataURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px)",
        };
      }
      return {};
    }, [placeholder, blurDataURL]);

    // React 19: Enhanced loading states
    const imageStyle = React.useMemo(
      () => ({
        opacity: isLoaded ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
        ...placeholderStyle,
        ...style,
      }),
      [isLoaded, placeholderStyle, style],
    );

    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{
          width: width || "auto",
          height: height || "auto",
          aspectRatio: width && height ? `${width} / ${height}` : undefined,
        }}
      >
        {/* Placeholder */}
        {!isLoaded && !hasError && placeholder === "blur-sm" && blurDataURL && (
          <div
            className="absolute inset-0 animate-pulse"
            style={placeholderStyle}
            aria-hidden="true"
          />
        )}

        {/* Loading skeleton */}
        {!isLoaded && !hasError && placeholder === "empty" && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" aria-hidden="true">
            <div className="w-full h-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
          </div>
        )}

        {/* Main image */}
        {currentSrc && (
          <img
            ref={imgRef}
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : loading}
            decoding="async"
            crossOrigin="anonymous"
            sizes={sizes}
            style={imageStyle}
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-500">
              <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm">Failed to load image</p>
            </div>
          </div>
        )}
      </div>
    );
  },
);

// React 19: Enhanced component with display name
OptimizedImageComponent.displayName = "OptimizedImage";

export const OptimizedImage = OptimizedImageComponent;

/**
 * Preloads a single image.
 *
 * This utility function can be used to preload critical images before they are
 * displayed, improving perceived performance.
 *
 * @param {string} src The source URL of the image to preload.
 * @returns {Promise<void>} A promise that resolves when the image has loaded.
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Preloads multiple images in batch.
 *
 * This utility function can be used to preload an array of images, which is
 * useful for improving the performance of image-heavy sections of the site.
 *
 * @param {string[]} srcs An array of image source URLs to preload.
 * @returns {Promise<void[]>} A promise that resolves when all images have loaded.
 */
export const preloadImages = (srcs: string[]): Promise<void[]> => {
  return Promise.all(srcs.map(preloadImage));
};
