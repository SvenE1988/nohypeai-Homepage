"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

/**
 * Target aspect ratio is based on SVG viewBox:
 * width 1440, height 890. However, the visible curves are only within
 * a specific band in the vertical area (roughly from y=364 to y=662; height ≈ 298).
 * We'll use an aspect ratio of 1440:298 for a tight fit.
 *
 * For responsiveness, scale the width to 100% and set the height
 * dynamically via aspect ratio.
 */

export function GoogleGeminiEffectDemo() {
  // Nutzt window-scrollYProgress für globale Seite
  const { scrollYProgress } = useScroll();

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.5], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.5], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.5], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.5], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.5], [0, 1.2]);

  // Manually define the SVG band height (from y1 to y2 in the viewBox)
  // Lower and upper bounds of SVG visible content, roughly y = 364 to y = 663
  // So our aspect ratio is 1440:299 = 4.815 (rounded).
  // We'll use "aspect-[1440/299]" as per Tailwind syntax, or inline.

  return (
    <div
      className={`
        flex items-center justify-center w-full 
        relative overflow-visible
        mx-auto
        `}
      style={{
        // For modern browsers, use aspect-ratio property for responsiveness.
        aspectRatio: "1440 / 299",
        width: "100vw", // fill horizontally; auto scales down
        maxWidth: "100vw",
        minHeight: 0,
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        position: "relative",
        // No vertical padding or forced height!
        background: "transparent",
        // Remove any padding to avoid extra space
        padding: 0,
      }}
    >
      <div
        // SVG layer itself, fills container, keeps correct ratio
        className="w-full h-full flex items-center justify-center"
        style={{
          // By using both width/height 100% and aspect-ratio,
          // child SVG keeps perfectly centered and tight above/below.
          aspectRatio: "1440 / 299",
          maxWidth: "1440px",
        }}
      >
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
      </div>
    </div>
  );
}
