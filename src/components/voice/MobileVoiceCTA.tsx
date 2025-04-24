
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileVoiceCTAProps {
  onClick: () => void;
}

const MobileVoiceCTA = ({ onClick }: MobileVoiceCTAProps) => {
  return (
    <motion.div 
      className="absolute -left-16 top-0 z-10 hidden lg:block"
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Button
        className="bg-gradient-to-r from-primary to-secondary text-white font-semibold px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        size="sm"
        onClick={onClick}
      >
        <Star className="w-4 h-4 mr-2 animate-pulse" />
        Jetzt KI testen!
      </Button>
    </motion.div>
  );
};

export default MobileVoiceCTA;
