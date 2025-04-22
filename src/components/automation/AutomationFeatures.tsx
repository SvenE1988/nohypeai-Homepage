
import React from "react";
import { motion } from "framer-motion";
import { Mail, FileText, Workflow, DatabaseZap } from "lucide-react";
import { BaseCard } from "../ui/base-card";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Mail,
    title: "Automatisierte E-Mail-Sequenzen",
    description: "Personalisierte E-Mail-Kampagnen, die automatisch anhand von Kundenaktionen versendet werden.",
  },
  {
    icon: FileText,
    title: "Intelligente Formularverarbeitung",
    description: "Extrahiere und verarbeite Daten aus Formularen, PDFs und Dokumenten – vollautomatisch.",
  },
  {
    icon: Workflow,
    title: "Workflow-Automatisierung",
    description: "Automatisiere komplexe Geschäftsprozesse durch intelligente Workflows.",
  },
  {
    icon: DatabaseZap,
    title: "Datenintegration",
    description: "Vernetze verschiedene Systeme für reibungslosen Datenaustausch – ohne manuellen Aufwand.",
  },
];

const AutomationFeatures = ({ className = "" }: { className?: string }) => (
  <section className={cn("py-10", className)}>
    <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
      Unsere Automatisierungslösungen
    </h2>
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.10 } }
      }}
    >
      {features.map((feature, idx) => {
        const Icon = feature.icon;
        return (
          <motion.div 
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 22 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.42 } }
            }}
          >
            <BaseCard className="flex flex-col items-center text-center h-full p-6">
              <div className="bg-primary/10 p-4 rounded-2xl mb-4">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </BaseCard>
          </motion.div>
        );
      })}
    </motion.div>
  </section>
);

export default AutomationFeatures;
