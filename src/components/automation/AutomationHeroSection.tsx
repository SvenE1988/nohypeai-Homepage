
import React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const AutomationHeroSection = () => {
  return (
    <section className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center p-2 rounded-full bg-primary/10 mb-4">
          <Zap className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Geschäftsprozesse intelligent automatisieren
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Entlaste dein Team von manuellen, zeitraubenden Aufgaben und konzentriere dich auf das, was wirklich wichtig ist: dein Kerngeschäft.
        </p>
      </motion.div>
    </section>
  );
};

export default AutomationHeroSection;
