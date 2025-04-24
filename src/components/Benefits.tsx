import { Clock, TrendingDown, Target } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { BaseCard } from "@/components/ui/base-card";

interface BenefitsProps {
  className?: string;
}

const benefitsData = [
  {
    icon: Clock,
    title: "Zeitersparnis",
    description: "Bis zu 40 Stunden pro Woche sparen",
    stat: "40h/Woche",
  },
  {
    icon: TrendingDown,
    title: "Kostenreduktion",
    description: "Mitarbeiter- und Betriebskosten signifikant reduzieren",
    stat: "-40% Kosten",
  },
  {
    icon: Target,
    title: "Präzisere Ergebnisse",
    description: "Maximale Präzision durch minimierte Fehlerquoten",
    stat: "99.9% Genauigkeit",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};

const Benefits = ({ className }: BenefitsProps) => {
  return (
    <section className={cn("py-8 sm:py-12 md:py-16 bg-gradient-dark", className)}>
      <div className="container mx-auto px-2 sm:px-4">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {benefitsData.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="h-full"
              >
                <BaseCard className="flex flex-col items-center text-center h-full px-2 py-6 sm:p-6">
                  <div className="bg-primary/10 p-4 rounded-2xl mb-3 sm:mb-5 md:mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 sm:mb-2 md:mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed mb-2 sm:mb-4">
                    {benefit.description}
                  </p>
                  <div className="mt-auto">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                      {benefit.stat}
                    </span>
                  </div>
                </BaseCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Benefits);
