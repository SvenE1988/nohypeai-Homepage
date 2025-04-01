
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const AIFirstSection = () => {
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    nextSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-[#1a1f35] text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="space-y-8 max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            KI-First: <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Was steckt dahinter?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300">
            Rechne selbst nach – wir zeigen dir, wie schon minimale KI-Automatisierungen messbaren Impact bringen. Ganz ohne extra Personal.
          </p>
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
