
import React from "react";
import { motion } from "framer-motion";
import { Mic, Calendar, Users } from "lucide-react";
import { BaseCard } from "../ui/base-card";

const useCases = [
  {
    icon: Mic,
    title: "Kundenanfragen bearbeiten",
    description: "Der Voice-Agent beantwortet häufig gestellte Fragen sofort und leitet komplexe Anfragen an dein Team weiter."
  },
  {
    icon: Calendar,
    title: "Termine vereinbaren",
    description: "Automatische Terminvereinbarung mit direkter Integration in deinen Kalender."
  },
  {
    icon: Users,
    title: "Leads qualifizieren",
    description: "Der Agent stellt die wichtigsten Fragen und bewertet das Potenzial jedes Leads."
  }
];

const VoiceUseCases = () => {
  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Anwendungsfälle</h2>
        <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {useCases.map((useCase, index) => {
          const Icon = useCase.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BaseCard className="h-full flex flex-col items-center text-center p-6">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-gray-300">{useCase.description}</p>
              </BaseCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default VoiceUseCases;
