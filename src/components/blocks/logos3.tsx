
import React, { useEffect, useRef, useState } from "react";
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

export function Logos3({
  heading,
  logos,
  className
}: Logos3Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [duplicatedLogos, setDuplicatedLogos] = useState<Logo[]>([]);
  const [animationDuration, setAnimationDuration] = useState(30); // seconds

  // Duplicate logos for seamless infinite scroll
  useEffect(() => {
    setDuplicatedLogos([...logos, ...logos]);

    // Adjust animation speed based on number of logos
    const speed = Math.max(30, logos.length * 4);
    setAnimationDuration(speed);

    // Update animation speed inline style
    if (scrollRef.current) {
      scrollRef.current.style.animationDuration = `${speed}s`;
    }
  }, [logos]);
  
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
            {duplicatedLogos.map((logo, index) => (
              <div 
                key={`${logo.id}-${index}`} 
                className="flex items-center justify-center mx-8 md:mx-16"
              >
                <img 
                  src={logo.image} 
                  alt={logo.description} 
                  className={cn(
                    "h-16 md:h-24 lg:h-28 w-auto object-contain opacity-100 transition-all duration-300 z-20", 
                    logo.className
                  )} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
