import { Brain, Target, Clock } from "lucide-react";
import { Button } from "./ui/button";

const AIHereSection = () => {
  return (
    <section className="min-h-screen flex items-center bg-[#FDF6F0] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            KI ist hier - und ich helfe dir{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              voraus zu bleiben
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Transformiere dein Unternehmen mit KI-Lösungen, die dich von der Konkurrenz abheben
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-[#EDF5FF] p-8 rounded-2xl border border-blue-100 hover:border-primary/50 transition-colors">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <Brain className="text-primary" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-black">KI-Strategie & Roadmap Design</h3>
            <p className="text-gray-600">
              Ich helfe dir, umsetzbare Pläne für eine nachhaltige und langfristige KI-Implementierung zu erstellen.
            </p>
          </div>

          <div className="bg-[#F0FFF4] p-8 rounded-2xl border border-green-100 hover:border-primary/50 transition-colors">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <Target className="text-primary" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-black">Wachstumsorientierte KI-Lösungen</h3>
            <p className="text-gray-600">
              Ich spezialisiere mich auf KI-Lösungen, die Marketing- und Vertriebsprozesse skalieren.
            </p>
          </div>

          <div className="bg-[#FFFAF0] p-8 rounded-2xl border border-yellow-100 hover:border-primary/50 transition-colors">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <Clock className="text-primary" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-black">Praktische KI-Implementierung</h3>
            <p className="text-gray-600">
              Ich implementiere KI-Lösungen, die in großen Umgebungen getestet und skalierbar sind.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-black hover:bg-black/90 text-white px-12"
          >
            Jetzt durchstarten
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIHereSection;