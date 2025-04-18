
import { motion } from "framer-motion";
import { Button } from "@/components/ui/neon-button";
import { ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FeatureCardProps {
  title: string;
  subtitle: string;
  benefits: string[];
  targetAudience: string;
}

const FeatureCard = ({ title, subtitle, benefits, targetAudience }: FeatureCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      className="w-full"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative w-full h-full bg-gradient-to-br from-black/60 to-black/40 hover:from-primary/10 hover:to-secondary/10 border border-gray-800 hover:border-primary/50 transition-all duration-300">
        <CardHeader className="p-6">
          <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-300">{subtitle}</p>
          
          <Button
            variant="ghost"
            className="w-full justify-between mt-4"
            onClick={() => setIsExpanded(!isExpanded)}
            neon={true}
          >
            <span>Mehr erfahren</span>
            <ChevronDown className={cn(
              "transition-transform duration-300",
              isExpanded ? "rotate-180" : ""
            )} />
          </Button>
        </CardHeader>

        <CardContent className={cn(
          "bg-gradient-to-br from-primary/5 to-secondary/5 border-t border-gray-800 transition-all duration-300",
          isExpanded ? "block" : "hidden"
        )}>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-white mb-2">Vorteile</h4>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="text-primary mt-1">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-white mb-2">Für wen?</h4>
              <p className="text-gray-300">{targetAudience}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
