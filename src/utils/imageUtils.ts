
/**
 * Optimized image loading utilities
 */

/**
 * Determines appropriate loading strategy based on image position
 * - 'eager' for above-the-fold images
 * - 'lazy' for below-the-fold images
 */
export const getImageLoadingStrategy = (isAboveTheFold: boolean = false): 'eager' | 'lazy' => {
  return isAboveTheFold ? 'eager' : 'lazy';
};

/**
 * Generates proper sizes attribute for responsive images based on container width
 */
export const getSizesAttribute = (
  options: {
    mobile?: string;  // e.g. "100vw"
    tablet?: string;  // e.g. "50vw" 
    desktop?: string; // e.g. "33vw"
  } = {}
): string => {
  const { 
    mobile = '100vw', 
    tablet = '50vw', 
    desktop = '33vw' 
  } = options;
  
  return `(max-width: 640px) ${mobile}, (max-width: 1024px) ${tablet}, ${desktop}`;
};

/**
 * Calculates optimal aspect ratio sizing based on desired ratio
 */
export const getAspectRatioStyles = (
  aspectRatio: number = 16/9
): React.CSSProperties => {
  return {
    aspectRatio: String(aspectRatio),
    objectFit: 'cover',
    width: '100%'
  };
};

/**
 * Creates blur hash placeholder URL (placeholder implementation)
 */
export const getPlaceholderImage = (width: number = 10, height: number = 10): string => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3C/svg%3E`;
};
