
import * as React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface GoogleGeminiEffectProps {
  pathLengths: any[];
}

export const GoogleGeminiEffect: React.FC<GoogleGeminiEffectProps> = ({
  pathLengths,
}) => {
  // Gemini-style SVG animation, minimal for effect
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center w-full h-full">
      <svg width="800" height="400" viewBox="0 0 800 400" fill="none" className="w-full h-80">
        <motion.path
          d="M 50 200 Q 200 50 400 200 Q 600 350 750 200"
          stroke="url(#gemini-a)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="1000"
          strokeDashoffset={0}
          style={{ pathLength: pathLengths?.[0] || 1 }}
        />
        <motion.path
          d="M 50 220 Q 200 80 400 220 Q 600 360 750 220"
          stroke="url(#gemini-b)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="1000"
          strokeDashoffset={0}
          style={{ pathLength: pathLengths?.[1] || 1 }}
        />
        <motion.path
          d="M 50 180 Q 200 30 400 180 Q 600 330 750 180"
          stroke="url(#gemini-c)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="1000"
          strokeDashoffset={0}
          style={{ pathLength: pathLengths?.[2] || 1 }}
        />
        <defs>
          <linearGradient id="gemini-a" x1="0" y1="200" x2="800" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#a21caf" />
          </linearGradient>
          <linearGradient id="gemini-b" x1="0" y1="220" x2="800" y2="220" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a21caf"/>
            <stop offset="1" stopColor="#f59e42"/>
          </linearGradient>
          <linearGradient id="gemini-c" x1="0" y1="180" x2="800" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f59e42"/>
            <stop offset="1" stopColor="#3b82f6"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
