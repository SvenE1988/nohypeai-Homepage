
"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

// Import your logo if you want to use the 'import' method. If it's in public/, an <img> with '/yourfile.png' suffices.
// import noHypeLogo from "/public/no-hype-logo.png";

export function GoogleGeminiEffectDemo() {
  // Nutzt window-scrollYProgress für globale Seite
  const { scrollYProgress } = useScroll();

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.5], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.5], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.5], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.5], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.5], [0, 1.2]);

  return (
    <div
      className="w-full h-[420px] flex items-center justify-center relative overflow-hidden"
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        position: 'relative',
        background: 'transparent'
      }}
    >
      {/* Animated Lines */}
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        className="w-full h-full"
      />
      {/* Centered no-hype logo overlay */}
      <div
        className="absolute left-1/2 top-1/2 z-20 flex items-center justify-center"
        style={{
          transform: "translate(-50%, -50%)"
        }}
      >
        {/* Update src="/no-hype-logo.png" to your actual logo path */}
        <img
          src="/no-hype-logo.png"
          alt="no-hype-Logo"
          className="w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-2xl"
          style={{
            pointerEvents: "none",
            userSelect: "none"
          }}
        />
      </div>
    </div>
  );
}
