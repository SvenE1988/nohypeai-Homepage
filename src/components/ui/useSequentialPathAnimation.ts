
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, animate, useInView } from "framer-motion";

/** 
 * useSequentialPathAnimation
 * Triggers path animations sequentially (left to right) when section enters viewport.
 * Returns: pathLengths (framer-motion values), isLocked (true = animation running)
 *
 * Options:
 * - pathCount: total number of paths to animate
 * - duration: ms for each path's animation
 */
export function useSequentialPathAnimation(
  opts: { pathCount: number; duration?: number } = { pathCount: 5, duration: 700 }
) {
  const { pathCount, duration = 700 } = opts;
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isLocked, setIsLocked] = useState(false); // lock scroll while animating
  
  // Create a ref for inView detection
  const ref = React.useRef<HTMLDivElement>(null);
  // Use the useInView hook correctly
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  // Array of pathLength motion values for SVG
  const [pathLengths] = useState(() =>
    Array(pathCount)
      .fill(0)
      .map(() => useMotionValue(0))
  );

  useEffect(() => {
    // Already animated? Do nothing
    if (!inView || hasAnimated) return;
    setIsLocked(true);

    // Animate each path, one after another
    async function runAnimation() {
      for (let i = 0; i < pathCount; i++) {
        await animate(pathLengths[i], 1, {
          duration: duration / 1000,
          ease: "easeInOut"
        });
      }
      setIsLocked(false);
      setHasAnimated(true);
    }

    runAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  // Return motion values and ref to assign to the scroll section
  return {
    pathLengths,
    isLocked,
    ref, // Return the ref to be attached to the section
  };
}
