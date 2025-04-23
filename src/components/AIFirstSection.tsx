
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useNavigation } from "@/contexts/NavigationContext";

const AIFirstSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { previousPath } = useNavigation();

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.transform = 'none';
      sectionRef.current.style.opacity = '1';
    }
    if (previousPath === '/proposals') {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        requestAnimationFrame(() => {
          window.dispatchEvent(new Event('resize'));
        });
      });
    }
  }, [previousPath]);

  const contentAnimation = {
    initial: {
      opacity: 0,
      y: 20,
      willChange: "opacity, transform" 
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-[36vh] sm:min-h-[44vh] flex flex-col items-center justify-center bg-transparent text-white py-4 sm:py-7 relative overflow-hidden"
      id="hero"
    >
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-3 sm:px-4">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
            amount: 0.3
          }}
          variants={contentAnimation}
          className="text-center z-50"
          style={{ 
            willChange: "transform", 
            backfaceVisibility: "hidden" 
          }}
          key="ai-no-hype-section-content"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-0.5 sm:mb-0.5">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              KI-Lösungen
            </span><br className="sm:hidden" />
            <span className="block text-white">ohne Hype</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-300 mt-2 sm:mt-2 max-w-2xl sm:max-w-3xl mx-auto">
            Wir helfen Unternehmen mit praktischen KI-Lösungen zu wachsen – ohne Buzzwords, ohne Komplexität.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AIFirstSection;
