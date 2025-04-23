
"use client";
import React from "react";
import { useScroll, useTransform } from "framer-motion";
import { GoogleGeminiEffect } from "./ui/GoogleGeminiEffect";

const GoogleGeminiSection = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Start, sobald der Sticky-Container unten erscheint, Ende, wenn er ganz weg ist
    offset: ["start end", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div className="w-full relative">
      {/* Sticky Container: transparent, sticky, h-screen, no bg */}
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
          // Optional: title/description könnten als Props verändert werden
        />
      </div>
      {/* Spacer darunter für ausreichend Scroll-Länge */}
      <div className="h-[300vh] md:h-[400vh]" aria-hidden="true" />
    </div>
  );
};

export default GoogleGeminiSection;
