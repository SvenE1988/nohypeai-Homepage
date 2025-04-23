
"use client";
import React from "react";
import { useScroll, useTransform } from "framer-motion";
import { GoogleGeminiEffect } from "./ui/GoogleGeminiEffect";

/**
 * This section is strictly viewport-high and sticky only while in the viewport.
 * No oversized scroll spacer – user continues on the next section as soon as animation is finished.
 */
const GoogleGeminiSection = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div className="w-full relative bg-transparent">
      {/* Sticky, only 100vh high */}
      <div
        ref={ref}
        className="sticky top-0 h-screen overflow-hidden bg-transparent z-20"
        style={{ background: "transparent" }}
      >
        <GoogleGeminiEffect
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
        />
      </div>
      {/* REMOVE big spacer – the next content follows directly */}
    </div>
  );
};

export default GoogleGeminiSection;
