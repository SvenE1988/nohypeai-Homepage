
import { Mail, Linkedin, Instagram, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
const AIFirstSection = () => {
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    nextSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="min-h-screen flex items-center bg-gradient-to-b from-black to-[#1a1f35] text-white py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Werden Sie ein <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              KI-First
            </span>{" "}
            <br />
            Unternehmen
          </h2>
          
          <p className="text-xl text-gray-300">
            Wir helfen wachsenden Unternehmen KI zu implementieren und zu skalieren - ohne zusätzliches Personal einzustellen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-black hover:bg-black/80 text-white border-2 border-primary">
              Jetzt durchstarten
            </Button>
          </div>

          <div className="flex gap-6 pt-4">
            <motion.a href="#" className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }}>
              <Instagram size={32} />
            </motion.a>
            <motion.a href="#" className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }}>
              <Linkedin size={32} />
            </motion.a>
            <motion.a href="#" className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }}>
              <Mail size={32} />
            </motion.a>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img src="/lovable-uploads/81cc09d1-ba8d-4f1e-84ac-87a56ce8a5de.png" alt="KI-Wachstumsprozess mit Analyse, Daten, Training und Optimierung" className="w-full h-auto rounded-2xl" loading="lazy" />
            
          </div>
          <div className="absolute -z-10 inset-0 blur-3xl opacity-30 bg-gradient-to-r from-primary to-secondary"></div>
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
    </section>;
};
export default AIFirstSection;
