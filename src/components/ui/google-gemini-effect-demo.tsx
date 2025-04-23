
"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useSpring, MotionValue } from "framer-motion";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { fadeInAnimation } from "@/utils/animation";

export function GoogleGeminiEffectDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Create spring-animated motion values for smoother path animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const animatedProgress = useSpring(scrollProgress, springConfig);
  
  const pathLengthFirst = useSpring(mapRange(scrollProgress, 0, 1, 0.2, 1.2), springConfig);
  const pathLengthSecond = useSpring(mapRange(scrollProgress, 0, 1, 0.15, 1.2), springConfig);
  const pathLengthThird = useSpring(mapRange(scrollProgress, 0, 1, 0.1, 1.2), springConfig);
  const pathLengthFourth = useSpring(mapRange(scrollProgress, 0, 1, 0.05, 1.2), springConfig);
  const pathLengthFifth = useSpring(mapRange(scrollProgress, 0, 1, 0, 1.2), springConfig);

  // Handle wheel events to control animation progress
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (scrollProgress >= 1 && e.deltaY > 0) {
        // Animation complete, allow normal scrolling
        setIsAnimating(false);
        return;
      }
      
      // Start animating
      setIsAnimating(true);
      e.preventDefault();
      
      // Update scroll progress based on wheel delta
      setScrollProgress(prev => {
        const newProgress = Math.max(0, Math.min(1, prev + e.deltaY * 0.001));
        
        // Once we reach 1, allow normal scrolling again after a short delay
        if (newProgress >= 1) {
          setTimeout(() => setIsAnimating(false), 500);
        }
        
        return newProgress;
      });
    };

    const preventScroll = (e: WheelEvent) => {
      if (isAnimating) {
        e.preventDefault();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('wheel', preventScroll, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      window.addEventListener('wheel', preventScroll);
    };
  }, [scrollProgress, isAnimating]);

  // Reset animation when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setScrollProgress(0);
          setIsAnimating(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="h-screen w-full relative overflow-hidden rounded-md bg-transparent flex flex-col items-center justify-center"
      ref={containerRef}
    >
      <motion.div 
        className="absolute inset-0 z-10 flex items-center justify-center"
        {...fadeInAnimation}
      >
        <h2 className="text-2xl md:text-4xl font-semibold text-center text-white mb-4">
          Scroll zum Animieren
        </h2>
      </motion.div>
      
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        title="KI-Transformation in der Praxis"
        description="Scrolle, um zu sehen, wie wir komplexe Daten in intuitive Visualisierungen umwandeln."
      />
    </div>
  );
}

// Helper function to map progress value to path length range
function mapRange(value: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number) {
  return outputMin + ((outputMax - outputMin) * (value - inputMin)) / (inputMax - inputMin);
}
