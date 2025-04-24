
import React from "react";
import { motion } from "framer-motion";
import { Clock, CheckCheck, Users, Scale, Coins, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BaseCard } from "../ui/base-card";

const benefits = [
  {
    icon: Clock,
    title: "Zeitersparnis",
    description: "Automatisiere wiederkehrende Aufgaben und spare wertvolle Zeit.",
  },
  {
    icon: CheckCheck,
    title: "Weniger Fehler",
    description: "Reduziere manuelle Fehler durch automatisierte Prozesse.",
  },
  {
    icon: Users,
    title: "Bessere Kundenerfahrung",
    description: "Schnellere Reaktionszeiten und effiziente Abläufe für deine Kunden.",
  },
  {
    icon: Scale,
    title: "Skalierbarkeit",
    description: "Wachse ohne zusätzliches Personal – Prozesse wachsen mit.",
  },
  {
    icon: Coins,
    title: "Kosteneffizienz",
    description: "Optimiere Prozesse und spare bares Geld im Alltag.",
  },
  {
    icon: LinkIcon,
    title: "Einfache Integration",
    description: "Automatisierungen lassen sich einfach in bestehende Systeme einbinden.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.10 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const AutomationBenefits = ({ className = "" }: { className?: string }) => (
  <section className={cn("py-6", className)}>
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {benefits.map((benefit, idx) => {
        const Icon = benefit.icon;
        return (
          <motion.div key={idx} variants={itemVariants}>
            <BaseCard className="flex flex-col items-center text-center p-4 h-full">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-xs text-gray-300">{benefit.description}</p>
            </BaseCard>
          </motion.div>
        );
      })}
    </motion.div>
  </section>
);

export default AutomationBenefits;
