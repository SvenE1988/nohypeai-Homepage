
import React from "react";
import { motion } from "framer-motion";
import { Headphones } from "lucide-react";

const VoiceHeroSection = () => {
  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center p-2 rounded-full bg-primary/10 mb-4">
          <Headphones className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Intelligente Sprach-KI für dein Unternehmen
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Unser Voice-Agent nimmt Anrufe entgegen, qualifiziert Leads und vereinbart Termine – 
          rund um die Uhr, ohne Wartezeiten.
        </p>
      </motion.div>
    </div>
  );
};

export default VoiceHeroSection;
