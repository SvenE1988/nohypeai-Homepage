
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";

const AIFirstSection = () => {
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    nextSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-transparent text-white py-16 relative overflow-hidden">
      {/* Lamp container in background */}
      <div className="absolute inset-0 z-0 translate-y-[10rem]">
        <LampContainer>
          {/* Empty div as children for the LampContainer */}
          <div></div>
        </LampContainer>
      </div>
      
      {/* Text content overlaid on top */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center z-50"
        >
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              KI-First
            </span>: <br />
            Was steckt dahinter?
          </h2>
          
          <p className="text-xl text-gray-300 mt-8 max-w-3xl mx-auto">
            Rechne selbst nach – wir zeigen dir, wie schon minimale KI-Automatisierungen messbaren Impact bringen. Ganz ohne extra Personal.
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-10" 
        animate={{
          y: [0, 10, 0]
        }} 
        transition={{
          duration: 2,
          repeat: Infinity
        }} 
        onClick={scrollToNextSection}
      >
        <ChevronDown size={32} className="text-white/50 hover:text-white transition-colors" />
      </motion.div>
    </section>
  );
};

export default AIFirstSection;
