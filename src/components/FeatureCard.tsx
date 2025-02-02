import { motion } from "framer-motion";
import { Button } from "@/components/ui/neon-button";

interface FeatureCardProps {
  title: string;
  benefit: string;
  description: string;
}

const FeatureCard = ({ title, benefit, description }: FeatureCardProps) => {
  return (
    <div className="relative w-full h-48 group perspective">
      <motion.div
        className="w-full h-full absolute preserve-3d transition-all duration-500 ease-out"
        initial={false}
        style={{ 
          transformStyle: "preserve-3d",
        }}
        whileHover={{ rotateY: 180 }}
      >
        <div 
          className="absolute w-full h-full backface-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <Button
            variant="ghost"
            className="h-full w-full bg-gradient-to-br from-black/60 to-black/40 hover:from-primary/20 hover:to-secondary/20 border border-gray-800 hover:border-primary/50 transition-all duration-300"
            neon={true}
          >
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium text-white">{title}</p>
              <p className="text-sm text-gray-400">{description}</p>
            </div>
          </Button>
        </div>
        
        <div 
          className="absolute w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 flex items-center justify-center backface-hidden"
          style={{ 
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <p className="text-white text-center font-medium">{benefit}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default FeatureCard;