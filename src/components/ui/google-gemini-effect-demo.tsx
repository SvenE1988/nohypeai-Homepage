
"use client";
import React from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { useSequentialPathAnimation } from "./useSequentialPathAnimation";

/**
 * GoogleGeminiEffectDemo
 * - Section uses scroll-snap so it sticks in the viewport while animating
 * - Animations (SVG paths) animate sequentially when effect enters viewport
 * - While animating: scrolling is locked, unlocks after animation completes
 */
export function GoogleGeminiEffectDemo() {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  // Path sequence animation: returns framer-motion values for paths and a 'locked' scroll state
  const { pathLengths, isLocked } = useSequentialPathAnimation({
    pathCount: 5,
    duration: 700, // ms per path
  });

  // Lock/unlock scroll on body during animation
  React.useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocked]);

  return (
    <section
      ref={sectionRef}
      className="h-[120vh] w-full relative py-40 flex flex-col scroll-snap-align-center scroll-snap-stop bg-black"
      style={{ scrollSnapAlign: "center", scrollSnapStop: "always", scrollSnapType: "y mandatory" }}
    >
      <div className="h-[400vh] w-full relative overflow-clip flex items-stretch" style={{ scrollSnapType: "y mandatory" }}>
        <div className="w-full flex-1 flex flex-col scroll-snap-align-center" style={{ scrollSnapAlign: "center" }}>
          <GoogleGeminiEffect pathLengths={pathLengths} />
        </div>
      </div>
    </section>
  );
}
