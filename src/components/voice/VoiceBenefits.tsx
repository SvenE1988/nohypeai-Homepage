
import React from "react";
import { motion } from "framer-motion";
import { Clock, TrendingDown, Link as LinkIcon, Phone, Globe, Shield } from "lucide-react";
import { BaseCard } from "../ui/base-card";

const benefits = [
  {
    icon: Clock,
    title: "24/7 Erreichbarkeit",
    description: "Ohne zusätzliches Personal"
  },
  {
    icon: TrendingDown,
    title: "Lead-Qualifizierung",
    description: "In Echtzeit während des Gesprächs"
  },
  {
    icon: LinkIcon,
    title: "Nahtlose Integration",
    description: "Mit deinen bestehenden Systemen"
  },
  {
    icon: Phone,
    title: "Keine verpassten Anrufe",
    description: "Und keine verlorenen Leads mehr"
  },
  {
    icon: Globe,
    title: "Multilingual",
    description: "Unterstützt mehrere Sprachen"
  },
  {
    icon: Shield,
    title: "Datenschutzkonform",
    description: "Deine Daten bleiben sicher"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const VoiceBenefits = () => {
  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Alle Vorteile auf einen Blick
        </h2>
        <p className="text-gray-300 mb-4 max-w-2xl mx-auto">
          Unsere Voice-Agenten bieten zahlreiche Vorteile für dein Unternehmen
        </p>
        <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.div key={index} variants={itemVariants}>
              <BaseCard className="h-full p-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{benefit.title}</h3>
                    <p className="text-gray-300 text-sm">{benefit.description}</p>
                  </div>
                </div>
              </BaseCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default VoiceBenefits;
