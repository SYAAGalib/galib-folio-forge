import { useState, useEffect, useRef, useCallback } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  skeletonClassName?: string;
  /** Optional WebP source - will use picture element with fallback */
  webpSrc?: string;
  /** Blur placeholder - low quality base64 image */
  blurPlaceholder?: string;
  /** Priority loading - skip lazy loading for above-the-fold images */
  priority?: boolean;
}

/**
 * Converts image URL to WebP URL if possible
 * Works with common image CDNs and Unsplash
 */
const getWebPUrl = (src: string): string | null => {
  try {
    // Unsplash images - add fm=webp parameter
    if (src.includes('unsplash.com')) {
      const url = new URL(src);
      url.searchParams.set('fm', 'webp');
      url.searchParams.set('q', '80');
      return url.toString();
    }
    
    // For local images, check if webp version might exist
    if (src.match(/\.(jpg|jpeg|png)$/i)) {
      return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    
    return null;
  } catch {
    return null;
  }
};

/**
 * Optimized image sizes for responsive loading
 */
const getOptimizedSrc = (src: string, width: number): string => {
  try {
    // Unsplash images - optimize with width parameter
    if (src.includes('unsplash.com')) {
      const url = new URL(src);
      url.searchParams.set('w', width.toString());
      url.searchParams.set('q', '80');
      url.searchParams.set('auto', 'format');
      return url.toString();
    }
    return src;
  } catch {
    return src;
  }
};

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  skeletonClassName,
  webpSrc,
  blurPlaceholder,
  priority = false,
  ...props 
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate WebP source if not provided
  const computedWebpSrc = webpSrc || getWebPUrl(src);
  
  // Generate responsive srcset for Unsplash images
  const getSrcSet = useCallback((baseSrc: string) => {
    if (baseSrc.includes('unsplash.com')) {
      return [400, 800, 1200, 1600]
        .map(w => `${getOptimizedSrc(baseSrc, w)} ${w}w`)
        .join(', ');
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (priority || isInView) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      { 
        rootMargin: '200px', // Start loading 200px before entering viewport
        threshold: 0.01 
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [priority, isInView]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  return (
    <div 
      className={cn("relative overflow-hidden bg-muted", className)} 
      ref={imgRef}
    >
      {/* Blur placeholder background */}
      {blurPlaceholder && !isLoaded && (
        <img 
          src={blurPlaceholder}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-lg"
        />
      )}
      
      {/* Loading skeleton */}
      {!isLoaded && !blurPlaceholder && (
        <Skeleton 
          className={cn(
            "absolute inset-0 w-full h-full",
            skeletonClassName
          )} 
        />
      )}
      
      {/* Main image with picture element for WebP support */}
      {isInView && !hasError && (
        <picture>
          {computedWebpSrc && (
            <source 
              srcSet={getSrcSet(computedWebpSrc) || computedWebpSrc} 
              type="image/webp"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
          <source 
            srcSet={getSrcSet(src) || src}
            type={src.includes('.png') ? 'image/png' : 'image/jpeg'}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'auto'}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-500",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
        </picture>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
