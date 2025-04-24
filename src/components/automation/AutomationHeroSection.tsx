
import React from "react";
import { motion } from "framer-motion";
import { Zap, Users, Clock, CheckCheck } from "lucide-react";

const topBenefits = [
  {
    icon: <Clock className="w-5 h-5 text-primary" />,
    title: "bis zu 40h/Woche gespart"
  },
  {
    icon: <Users className="w-5 h-5 text-primary" />,
    title: "zufriedenere Teams & Kunden"
  },
  {
    icon: <CheckCheck className="w-5 h-5 text-primary" />,
    title: "weniger Fehler"
  }
];

const AutomationHeroSection = () => {
  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-11"
      >
        <div className="inline-flex items-center justify-center p-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 mb-4 border border-primary/20">
          <Zap className="h-7 w-7 text-primary mr-2" />
          <span className="uppercase text-xs font-semibold tracking-widest text-primary">Automation ✦ Vorteil</span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Geschäftsprozesse intelligent automatisieren
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-7">
          Entlaste dein Team von manuellen, zeitraubenden Aufgaben und konzentriere dich auf das, was wirklich wichtig ist: dein Kerngeschäft.
        </p>
        <div className="flex flex-row flex-wrap justify-center gap-3 mt-3">
          {topBenefits.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-black/30 border border-gray-700 rounded-full px-4 py-1.5 min-w-[180px] justify-center animate-fade-in"
            >
              {b.icon}
              <span className="text-sm text-white font-medium">{b.title}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AutomationHeroSection;
