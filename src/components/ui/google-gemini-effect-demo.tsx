
"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export function GoogleGeminiEffectDemo() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.5], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.5], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.5], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.5], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.5], [0, 1.2]);

  return (
    <div
      ref={ref}
      className="w-screen max-w-none h-[420px] flex items-center justify-center bg-black relative overflow-hidden"
      style={{
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        position: 'relative',
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
  );
}
