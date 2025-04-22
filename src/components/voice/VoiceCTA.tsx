
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/neon-button";
import { useCallToAction } from "@/hooks/useCallToAction";

const VoiceCTA = () => {
  const { openCalendarBooking } = useCallToAction();
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center py-12 my-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Teste unseren Voice-Agent
      </h2>
      <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
        Erlebe selbst, wie unser Voice-Agent funktioniert und vereinbare jetzt eine persönliche Demo
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          size="lg" 
          variant="default"
        >
          Demo ausprobieren
        </Button>
        <Button 
          onClick={openCalendarBooking}
          size="lg" 
          variant="solid"
        >
          Persönliche Demo buchen
        </Button>
      </div>
    </motion.section>
  );
};

export default VoiceCTA;
