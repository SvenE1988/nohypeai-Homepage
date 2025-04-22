
import { type MotionProps } from "framer-motion";

/**
 * Performance-optimized animation presets
 * These presets use transform properties for GPU acceleration
 * and avoid properties that cause layout thrashing
 */

/**
 * Optimized fade-in animation that uses transform instead of position changes
 * for better performance
 */
export const fadeInAnimation: MotionProps = {
  initial: { opacity: 0, transform: "translateY(20px)" },
  whileInView: { opacity: 1, transform: "translateY(0px)" },
  transition: { 
    delay: 0.3, 
    duration: 0.5, 
    ease: [0.25, 0.1, 0.25, 1.0] // Optimized easing curve
  },
  viewport: { once: false, amount: 0.3, margin: "100px" }
};

/**
 * GPU-accelerated scale animation
 */
export const scaleAnimation: MotionProps = {
  initial: false,
  whileHover: { scale: 1.02 },
  transition: { 
    duration: 0.2, 
    ease: [0.25, 0.1, 0.25, 1.0] 
  },
  style: { 
    transformStyle: "preserve-3d", 
    willChange: "transform" // Hint to browser for optimization
  }
};

/**
 * Optimized staggered children animation
 */
export const staggerContainerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

/**
 * Optimized child item animation for staggered lists
 */
export const staggerItemAnimation = {
  hidden: { opacity: 0, transform: "translateY(20px)" },
  show: { 
    opacity: 1, 
    transform: "translateY(0px)",
    transition: {
      type: "spring",
      stiffness: 260, 
      damping: 20
    }
  }
};

/**
 * GPU-accelerated rotation animation
 */
export const rotateAnimation: MotionProps = {
  initial: { transform: "rotate(0deg)" },
  animate: { transform: "rotate(360deg)" },
  transition: { 
    repeat: Infinity, 
    duration: 8, 
    ease: "linear",
    repeastType: "loop"
  },
  style: { 
    transformOrigin: "center center",
    willChange: "transform" 
  }
};
