
import React from "react";
import { BaseCard } from "../ui/base-card";
import { Users, Mail, Workflow, FileText, DatabaseZap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const useCases = [
  {
    icon: Users,
    title: "Bewerber-Onboarding automatisch abwickeln",
    description: "Neues Teammitglied? Die Automatisierung versendet alle Formulare, Welcome-Mails und Zugangsdaten – komplett selbstständig.",
  },
  {
    icon: Mail,
    title: "Schnelle Beantwortung von Kundenanfragen",
    description: "Alle eingehenden E-Mails zu Angeboten, Support oder Service werden vollautomatisch beantwortet oder vorkategorisiert.",
  },
  {
    icon: FileText,
    title: "Dokumente automatisch verarbeiten",
    description: "Formulare, PDFs oder Verträge aus dem Posteingang werden automatisch ausgelesen, klassifiziert und weitergeleitet.",
  },
  {
    icon: Workflow,
    title: "Aufträge & Anfragen automatisch weiterleiten",
    description: "Bei Eingang eines Online-Auftrags laufen alle Folgeprozesse automatisch an: Info an Vertrieb, Termin im Kalender, Aufgaben im Teamtool.",
  },
  {
    icon: DatabaseZap,
    title: "Systeme ohne Schnittstelle verbinden",
    description: "ERP, CRM & andere Tools können über smarte Automation synchronisiert werden, ohne manuell Daten zu pflegen.",
  },
];

const AutomationUseCases = ({ className = "" }: { className?: string }) => (
  <section className={cn("py-10", className)}>
    <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
      Greifbare Usecases
    </h2>
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.10 } }
      }}
    >
      {useCases.map((uc, idx) => {
        const Icon = uc.icon;
        return (
          <motion.div 
            key={idx}
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.38 } } }}
          >
            <BaseCard className="flex flex-col items-center text-center p-8 h-full">
              <div className="bg-primary/10 p-4 rounded-2xl mb-5">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{uc.title}</h3>
              <p className="text-gray-300">{uc.description}</p>
            </BaseCard>
          </motion.div>
        );
      })}
    </motion.div>
  </section>
);

export default AutomationUseCases;
