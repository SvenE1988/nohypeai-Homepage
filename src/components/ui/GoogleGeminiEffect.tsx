
import { cn } from "@/lib/utils";
import { motion, useMotionValue } from "framer-motion";
import React from "react";

const transition = {
  duration: 0,
  ease: "linear",
};

type GoogleGeminiEffectProps = {
  pathLengths?: any[]; // simplifying for now; can extend for richer animation
  title?: string;
  description?: string;
  className?: string;
};

export const GoogleGeminiEffect: React.FC<GoogleGeminiEffectProps> = ({
  pathLengths = [],
  title,
  description,
  className,
}) => {
  return (
    <div className={cn("sticky top-80", className)}>
      <p className="text-lg md:text-7xl font-normal pb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300">
        {title || `Build with Aceternity UI`}
      </p>
      <p className="text-xs md:text-xl font-normal text-center text-neutral-400 mt-4 max-w-lg mx-auto">
        {description ||
          `Scroll this component and see the bottom SVG come to life – wow this works!`}
      </p>
      <div className="w-full h-[890px] -top-60 md:-top-40  flex items-center justify-center bg-red-transparent absolute ">
        <button className="font-bold bg-white rounded-full md:px-4 md:py-2 px-2 py-1 md:mt-24 mt-8 z-30 md:text-base text-black text-xs  w-fit mx-auto ">
          ui.aceternity.com
        </button>
      </div>
      <svg
        width="1440"
        height="890"
        viewBox="0 0 1440 890"
        xmlns="http://www.w3.org/2000/svg"
        className=" absolute -top-60  md:-top-40 w-full"
      >
        {/* Sample motion.path */}
        <motion.path
          d="M100,400 Q400,50 800,400 T1440,400"
          stroke="url(#paint0_linear_240_423)"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.4 }}
        />

        <defs>
          <linearGradient id="paint0_linear_240_423" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF0099" />
            <stop offset="1" stopColor="#6B46C1" />
          </linearGradient>
          {/* Example blur filter */}
          <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default GoogleGeminiEffect;

