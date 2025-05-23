import { motion } from "framer-motion";
import { Button } from "@/components/ui/neon-button";
import { Info } from "lucide-react";
import { memo } from 'react';

interface FeatureCardProps {
  title: string;
  benefit: string;
  description: string;
}

const FeatureCard = memo(({ title, benefit, description }: FeatureCardProps) => {
  return (
    <motion.div 
      className="relative w-full h-48 perspective group"
      initial={false}
      whileHover={{ scale: 1.02 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute top-2 right-2 z-10 text-primary/80">
        <Info size={18} />
      </div>
      
      <motion.div
        className="absolute w-full h-full transition-all duration-500"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 0 }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6 }}
        style={{ 
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden"
        }}
      >
        {/* Front of card */}
        <div 
          className="absolute w-full h-full backface-hidden cursor-pointer"
          style={{ transform: "rotateY(0deg)" }}
        >
          <Button
            variant="ghost"
            className="h-full w-full bg-gradient-to-br from-black/60 to-black/40 hover:from-primary/20 hover:to-secondary/20 border border-gray-800 hover:border-primary/50 transition-all duration-300"
            neon={true}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium text-white">{title}</h3>
              <p className="text-sm text-gray-300">{description}</p>
              <span className="text-xs text-primary mt-2">Hover für mehr Details</span>
            </div>
          </Button>
        </div>
        
        {/* Back of card */}
        <div 
          className="absolute w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 flex items-center justify-center backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-white text-center font-medium">{benefit}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}, 
(prevProps, nextProps) => {
  return prevProps.title === nextProps.title && 
         prevProps.benefit === nextProps.benefit && 
         prevProps.description === nextProps.description;
});

export default FeatureCard;
