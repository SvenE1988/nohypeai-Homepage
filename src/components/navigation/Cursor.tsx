
import React from "react";
import { motion } from "framer-motion";

interface CursorProps {
  position: {
    left: number;
    width: number;
    opacity: number;
  };
}

export const Cursor = ({ position }: CursorProps) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-8 rounded-full bg-white/10 md:h-10"
    />
  );
};
