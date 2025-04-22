
/**
 * Generates optimized image props for better Core Web Vitals and performance
 */
export const getOptimizedImageProps = (
  options: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    loading?: 'lazy' | 'eager';
    className?: string;
    priority?: boolean;
    decoding?: 'async' | 'sync' | 'auto';
  }
) => {
  const {
    src,
    alt,
    width,
    height,
    loading = 'lazy',
    className = '',
    priority = false,
    decoding = 'async'
  } = options;

  // Determine if this is an above-the-fold image that should load eagerly
  const loadingStrategy = priority ? 'eager' : loading;
  
  // Prioritize important images with fetchpriority
  const fetchPriority = priority ? 'high' : 'auto';
  
  return {
    src,
    alt,
    width,
    height,
    loading: loadingStrategy,
    decoding,
    className,
    style: {
      display: 'block',
      maxWidth: '100%',
      height: 'auto'
    },
    // Use modern fetchpriority attribute for critical images
    fetchPriority
  } as const;
};

/**
 * Creates a responsive srcset for different screen sizes (simplified version)
 */
export const getResponsiveSrcSet = (
  baseSrc: string,
  sizes: number[] = [320, 640, 768, 1024, 1280]
): string => {
  // This is a simplified implementation
  // In a real app, you would generate actual different sized images
  return sizes.map(size => `${baseSrc} ${size}w`).join(', ');
};

/**
 * Determines if image should be preloaded based on priority
 */
export const shouldPreloadImage = (src: string, priority: boolean): boolean => {
  return priority && src.length > 0;
};
