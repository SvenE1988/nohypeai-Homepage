
"use client";
import React, { useRef, useState, useEffect } from "react";
import { useTransform, useSpring, motion } from "framer-motion";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export function GoogleGeminiEffectDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Use spring for smooth animation
  const springScrollProgress = useSpring(scrollProgress, {
    damping: 40,
    stiffness: 90,
    mass: 0.5
  });

  // Transform the scroll progress to path lengths
  const pathLengthFirst = useTransform(springScrollProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(springScrollProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(springScrollProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(springScrollProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(springScrollProgress, [0, 0.8], [0, 1.2]);

  // Handle wheel events to control animation progress
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // If animation is complete (progress > 1) and scrolling down, allow normal scrolling
      if (scrollProgress >= 1 && e.deltaY > 0) {
        return;
      }
      
      // If at the start (progress < 0) and scrolling up, allow normal scrolling
      if (scrollProgress <= 0 && e.deltaY < 0) {
        return;
      }
      
      e.preventDefault();
      
      // Update progress based on wheel delta
      // Dividing by a larger number makes the scrolling more granular
      setScrollProgress(prev => {
        const newProgress = prev + e.deltaY / 2000;
        // Clamp values between 0 and 1
        return Math.min(Math.max(newProgress, 0), 1);
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [scrollProgress]);

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full bg-black sticky top-0 z-10 overflow-hidden rounded-md relative pt-40"
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        title="Build with AI"
        description="Scroll to reveal the power of AI-driven development"
      />
    </div>
  );
}
