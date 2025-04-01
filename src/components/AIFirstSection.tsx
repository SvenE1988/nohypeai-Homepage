
import { Mail, Linkedin, ChevronDown, Calculator } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useCallToAction } from "@/hooks/useCallToAction";

const AIFirstSection = () => {
  const { openCalendarBooking, openContactForm } = useCallToAction();
  
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    nextSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-black to-[#1a1f35] text-white py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            KI-First: <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Was steckt dahinter?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300">
            Rechne selbst nach – wir zeigen dir, wie schon minimale KI-Automatisierungen messbaren Impact bringen. Ganz ohne extra Personal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-[#1A1F35] text-primary hover:bg-[#252A40] transition-all flex items-center gap-2 border border-[#3A3F55] rounded-md"
              onClick={openCalendarBooking}
            >
              <Calculator className="w-5 h-5 text-primary" />
              Termin buchen
            </Button>
          </div>

          <div className="flex gap-6 pt-4 pl-0">
            <motion.a 
              href="https://www.linkedin.com/in/svenerkens" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5" 
              whileHover={{
                scale: 1.1
              }} 
              whileTap={{
                scale: 0.95
              }}
            >
              <Linkedin size={32} />
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5" 
              onClick={openContactForm}
              whileHover={{
                scale: 1.1
              }} 
              whileTap={{
                scale: 0.95
              }}
            >
              <Mail size={32} />
            </motion.a>
          </div>
        </div>

        <div className="flex justify-end items-center">
          <motion.img 
            src="/public/lovable-uploads/a9daac6a-208d-46dc-9aa0-db9287c1b2e8.png" 
            alt="KI Optimierungsprozess Visualisierung" 
            className="max-w-full h-auto object-contain"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer" animate={{
      y: [0, 10, 0]
    }} transition={{
      duration: 2,
      repeat: Infinity
    }} onClick={scrollToNextSection}>
        <ChevronDown size={32} className="text-white/50 hover:text-white transition-colors" />
      </motion.div>
    </section>
  );
};

export default AIFirstSection;
