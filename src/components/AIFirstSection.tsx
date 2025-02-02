import { Mail, Linkedin, Instagram } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { HeroGeometric } from "./ui/shape-landing-hero";

const AIFirstSection = () => {
  return (
    <section className="relative min-h-screen">
      <HeroGeometric 
        badge="KI-First Unternehmen"
        title1="Werden Sie ein"
        title2="KI-First Unternehmen"
      />
      
      <div className="absolute bottom-12 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Jetzt durchstarten
            </Button>
          </div>

          <div className="flex gap-6 justify-center mt-8">
            <motion.a 
              href="#" 
              className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram size={32} />
            </motion.a>
            <motion.a 
              href="#" 
              className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={32} />
            </motion.a>
            <motion.a 
              href="#" 
              className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={32} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFirstSection;