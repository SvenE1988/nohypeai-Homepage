import { Brain, Target, Clock, Calculator } from "lucide-react";
import { Button } from "./ui/button";
import { useCallToAction } from "@/hooks/useCallToAction";

const AIHereSection = () => {
  const { openCalendarBooking } = useCallToAction();
  
  return (
    <section className="min-h-[60vh] sm:min-h-screen flex items-center bg-black py-10 sm:py-16">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="text-center max-w-2xl sm:max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
            KI ist hier - und wir helfen dir{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              am Ball zu bleiben
            </span>
          </h2>
          <p className="text-base sm:text-xl text-gray-400">
            Transformiere dein Unternehmen mit KI-Lösungen, die dich von der Konkurrenz abheben
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16">
          <div className="bg-[#0A0A0A] p-6 sm:p-8 rounded-2xl border border-[#1A1A1A] hover:border-primary/50 transition-colors">
            <div className="bg-[#1A1F35] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <Brain className="text-primary" size={22} />
            </div>
            <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-white">KI-Strategie & Roadmap Design</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Wir helfen dir, umsetzbare Pläne für eine nachhaltige und langfristige KI-Implementierung zu erstellen.
            </p>
          </div>
          <div className="bg-[#0A0A0A] p-6 sm:p-8 rounded-2xl border border-[#1A1A1A] hover:border-primary/50 transition-colors">
            <div className="bg-[#1A1F35] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <Target className="text-primary" size={22} />
            </div>
            <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-white">Wachstumsorientierte KI-Lösungen</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Wir spezialisieren uns auf KI-Lösungen, die Marketing- und Vertriebsprozesse skalieren.
            </p>
          </div>
          <div className="bg-[#0A0A0A] p-6 sm:p-8 rounded-2xl border border-[#1A1A1A] hover:border-primary/50 transition-colors">
            <div className="bg-[#1A1F35] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <Clock className="text-primary" size={22} />
            </div>
            <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-white">Praktische KI-Implementierung</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Wir implementieren KI-Lösungen, die in großen Umgebungen getestet und skalierbar sind.
            </p>
          </div>
        </div>
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-[#1A1F35] text-primary hover:bg-[#252A40] px-8 sm:px-12 flex items-center gap-2 border border-[#3A3F55] rounded-md mx-auto text-base"
            onClick={openCalendarBooking}
          >
            <Calculator className="w-5 h-5 text-primary" />
            Termin buchen
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIHereSection;
