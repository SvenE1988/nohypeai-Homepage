import { Brain, Target, Clock } from "lucide-react";
import { Button } from "./ui/button";

const AIHereSection = () => {
  return (
    <section className="min-h-screen flex items-center bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            KI ist hier - und wir helfen dir{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              am Ball zu bleiben
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Transformiere dein Unternehmen mit KI-Lösungen, die dich von der Konkurrenz abheben
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-[#0A0A0A] p-8 rounded-2xl border border-[#1A1A1A] hover:border-primary/50 transition-colors">
            <div className="bg-[#1A1F35] w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <Brain className="text-primary" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">KI-Strategie & Roadmap Design</h3>
            <p className="text-gray-400">
              Wir helfen dir, umsetzbare Pläne für eine nachhaltige und langfristige KI-Implementierung zu erstellen.
            </p>
          </div>

          <div className="bg-[#0A0A0A] p-8 rounded-2xl border border-[#1A1A1A] hover:border-primary/50 transition-colors">
            <div className="bg-[#1A1F35] w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <Target className="text-primary" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Wachstumsorientierte KI-Lösungen</h3>
            <p className="text-gray-400">
              Wir spezialisieren uns auf KI-Lösungen, die Marketing- und Vertriebsprozesse skalieren.
            </p>
          </div>

          <div className="bg-[#0A0A0A] p-8 rounded-2xl border border-[#1A1A1A] hover:border-primary/50 transition-colors">
            <div className="bg-[#1A1F35] w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <Clock className="text-primary" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Praktische KI-Implementierung</h3>
            <p className="text-gray-400">
              Wir implementieren KI-Lösungen, die in großen Umgebungen getestet und skalierbar sind.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-12"
          >
            Jetzt durchstarten
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIHereSection;