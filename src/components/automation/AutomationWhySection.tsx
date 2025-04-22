
import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  CheckCheck,
  Users,
  Scale,
  Coins,
  Link as LinkIcon,
  Mail,
  FileText,
  Workflow,
  DatabaseZap
} from "lucide-react";
import { BaseCard } from "../ui/base-card";
import { cn } from "@/lib/utils";

const automations = [
  {
    icon: Clock,
    title: "Zeitersparnis",
    description: "Wiederkehrende Aufgaben laufen automatisch im Hintergrund – spare Dutzende Stunden pro Monat.",
  },
  {
    icon: CheckCheck,
    title: "Weniger Fehler",
    description: "Automatisierte Prozesse reduzieren Fehlerquellen und Aufwand für Korrekturen.",
  },
  {
    icon: Users,
    title: "Bessere Kundenerfahrung",
    description: "Schnellere Reaktionen und 24/7 Service – biete deinen Kunden erstklassige Erlebnisse.",
  },
  {
    icon: Scale,
    title: "Skalierbarkeit",
    description: "Setze beliebig viele Prozesse auf – ohne zusätzliches Personal einstellen zu müssen.",
  },
  {
    icon: Coins,
    title: "Kosteneffizienz",
    description: "Reduziere Betriebskosten und investiere eingesparte Ressourcen in Wachstum.",
  },
  {
    icon: LinkIcon,
    title: "Einfache Integration",
    description: "Automatisierungen lassen sich problemlos in deine bestehenden Systeme einbinden.",
  },
  {
    icon: Mail,
    title: "Automatisierte E-Mail-Kampagnen",
    description: "Intelligente, datenbasierte E-Mail-Flows je nach Kundenverhalten.",
  },
  {
    icon: FileText,
    title: "Intelligente Dokumentverarbeitung",
    description: "Formulare, PDFs & Verträge werden automatisch ausgelesen und den Workflows zugeführt.",
  },
  {
    icon: Workflow,
    title: "Workflow-Automatisierung",
    description: "Komplexe Geschäftsprozesse laufen automatisch nach definierten Regeln ab.",
  },
  {
    icon: DatabaseZap,
    title: "Datenintegration",
    description: "Vernetze deine Systeme, sorge für reibungslosen Datenaustausch ohne händische Übertragung.",
  }
];

const AnimationVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.44 } },
};

interface AutomationWhySectionProps {
  className?: string;
}

const AutomationWhySection = ({ className = "" }: AutomationWhySectionProps) => (
  <section className={cn("py-10", className)}>
    <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
      Warum Automatisierung?
    </h2>
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.11 } }
      }}
    >
      {automations.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div key={idx} variants={AnimationVariants}>
            <BaseCard className="flex flex-col items-center text-center p-6 h-full min-h-[200px]">
              <div className="bg-primary/10 p-4 rounded-2xl mb-4">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-300">{item.description}</p>
            </BaseCard>
          </motion.div>
        );
      })}
    </motion.div>
  </section>
);

export default AutomationWhySection;
