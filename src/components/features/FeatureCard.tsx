
import { motion } from "framer-motion";
import { Button } from "@/components/ui/neon-button";
import { ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { tokens } from "@/lib/design-tokens";

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
      <Card className={tokens.card.base}>
        <CardHeader className={tokens.card.header}>
          <h3 className={tokens.text.title}>{title}</h3>
          <p className={tokens.text.subtitle}>{subtitle}</p>
          
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
              <h4 className={tokens.text.subtitle}>Vorteile</h4>
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
              <h4 className={tokens.text.subtitle}>Für wen?</h4>
              <p className={tokens.text.body}>{targetAudience}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;

