import { Clock, TrendingDown, Target } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { memo } from "react";

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
    <section className={cn("py-12 md:py-16 bg-gradient-dark", className)}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
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
                <BaseCard className="flex flex-col items-center text-center h-full">
                  <div className="bg-primary/10 p-4 rounded-2xl mb-5 md:mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4">
                    {benefit.description}
                  </p>
                  <div className="mt-auto">
                    <span className="text-xl md:text-2xl font-bold text-primary">
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
