
import { Clock, TrendingDown, Target } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Benefits-Props mit optionalem className
interface BenefitsProps {
  className?: string;
}

const Benefits = ({ className }: BenefitsProps) => {
  const benefits = [
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

  return (
    <section className={cn("py-12 md:py-16 bg-gradient-dark", className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center bg-black/20 p-6 md:p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300 h-full"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <div className="bg-[#6B7CFF33] p-4 rounded-2xl mb-5 md:mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-4">
                  {benefit.description}
                </p>
                <div className="mt-auto">
                  <span className="text-xl md:text-2xl font-bold text-primary">
                    {benefit.stat}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
