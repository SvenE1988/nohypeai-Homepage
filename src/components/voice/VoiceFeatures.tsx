
import React from "react";
import { Clock, TrendingDown, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Clock,
    title: "24/7 Erreichbarkeit",
    description: "Automatische Anrufannahme ohne zusätzliches Personal rund um die Uhr"
  },
  {
    icon: TrendingDown,
    title: "Echtzeit-Qualifizierung",
    description: "Intelligente Bewertung von Leads direkt während des Gesprächs"
  },
  {
    icon: LinkIcon,
    title: "Nahtlose Integration",
    description: "Einfache Anbindung an bestehende CRM- und Kalender-Systeme"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const VoiceFeatures = () => {
  return (
    <div className="py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default VoiceFeatures;
