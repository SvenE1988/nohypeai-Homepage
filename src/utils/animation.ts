
import { type MotionProps } from "framer-motion";

export const fadeInAnimation: MotionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { delay: 0.5, duration: 0.8, ease: "easeInOut" },
  viewport: { once: false, amount: 0.3 }
};

export const scaleAnimation: MotionProps = {
  initial: false,
  whileHover: { scale: 1.02 },
  style: { transformStyle: "preserve-3d" }
};
