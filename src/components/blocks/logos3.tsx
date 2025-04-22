
import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import { cn } from "@/lib/utils";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos: Logo[];
  className?: string;
}

// Memoized Logos component for better performance
export const Logos3 = memo(({
  heading,
  logos,
  className
}: Logos3Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [duplicatedLogos, setDuplicatedLogos] = useState<Logo[]>([]);
  const [animationDuration, setAnimationDuration] = useState(30); // seconds
  
  // Effect to set up logos and animation duration
  useEffect(() => {
    // Only duplicate if we have logos to work with
    if (logos.length === 0) return;
    
    // Create duplicated array only once
    setDuplicatedLogos([...logos, ...logos]);

    // Adjust animation speed based on number of logos
    const speed = Math.max(30, logos.length * 4);
    setAnimationDuration(speed);
  }, [logos]);
  
  // Update animation speed when needed
  useEffect(() => {
    // Apply animation speed to DOM element
    if (scrollRef.current) {
      scrollRef.current.style.animationDuration = `${animationDuration}s`;
    }
  }, [animationDuration]);
  
  // Memoized rendering of logo items
  const renderLogoItems = useCallback(() => {
    return duplicatedLogos.map((logo, index) => (
      <div 
        key={`${logo.id}-${index}`} 
        className="flex items-center justify-center mx-8 md:mx-16"
      >
        <img 
          src={logo.image} 
          alt={logo.description} 
          loading="lazy"
          className={cn(
            "h-16 md:h-24 lg:h-28 w-auto object-contain opacity-100 transition-all duration-300 z-20", 
            logo.className
          )} 
        />
      </div>
    ));
  }, [duplicatedLogos]);
  
  return (
    <div className={cn("py-8 bg-black/20 relative", className)}>
      <div className="container px-4 mx-auto">
        {heading && heading.length > 0 && (
          <h2 className="text-center text-lg font-medium text-gray-300 mb-6">
            {heading}
          </h2>
        )}
        
        <div className="relative w-full overflow-hidden z-10">
          <div 
            ref={scrollRef} 
            className="flex items-center justify-center animate-marquee whitespace-nowrap" 
            style={{
              animationDuration: `${animationDuration}s`
            }}
          >
            {renderLogoItems()}
          </div>
        </div>
      </div>
    </div>
  );
});

Logos3.displayName = 'Logos3';
