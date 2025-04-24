
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/neon-button";
import { useCallToAction } from "@/hooks/useCallToAction";

const AutomationCTA = () => {
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
        Automatisierung für dein Unternehmen
      </h2>
      <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
        Erlebe die Vorteile intelligenter Automatisierung und buche jetzt eine kostenlose Beratung!
      </p>
      <Button
        onClick={openCalendarBooking}
        size="lg"
        variant="solid"
      >
        Persönliche Beratung buchen
      </Button>
    </motion.section>
  );
};

export default AutomationCTA;
