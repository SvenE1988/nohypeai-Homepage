
import React, { memo } from "react";
import { getImageLoadingStrategy, getSizesAttribute, getAspectRatioStyles } from "@/utils/imageUtils";

interface OptimizedFAQImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

// Using memo to prevent unnecessary re-renders
export const OptimizedFAQImage = memo(({
  src,
  alt,
  priority = false,
  className = "",
  width,
  height
}: OptimizedFAQImageProps) => {
  // Configure optimal loading strategy based on image position
  const loadingStrategy = getImageLoadingStrategy(priority);
  
  // Set responsive sizes attribute for different viewports
  const sizes = getSizesAttribute({
    mobile: "100vw",
    tablet: "100vw",
    desktop: "50vw",
  });
  
  // Calculate optimal aspect ratio CSS
  const aspectRatioStyles = getAspectRatioStyles(16/9);
  
  return (
    <img
      src={src}
      alt={alt}
      loading={loadingStrategy}
      sizes={sizes}
      style={aspectRatioStyles}
      className={`w-full ${className}`}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      width={width}
      height={height}
    />
  );
});

OptimizedFAQImage.displayName = "OptimizedFAQImage";

export default OptimizedFAQImage;
