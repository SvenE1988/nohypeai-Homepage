import { Brain, Rocket, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";

const AIHereSection = () => {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-[#1a1f35] to-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            KI ist hier - und ich helfe dir{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              voraus zu bleiben
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Transformiere dein Unternehmen mit KI-Lösungen, die dich von der Konkurrenz abheben
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-black/30 p-8 rounded-2xl border border-gray-800 hover:border-primary/50 transition-colors">
            <div className="bg-gradient-to-br from-primary to-secondary w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Brain className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4">KI-Strategie</h3>
            <p className="text-gray-400">
              Entwickle eine maßgeschneiderte KI-Strategie, die perfekt zu deinem Geschäftsmodell passt
            </p>
          </div>

          <div className="bg-black/30 p-8 rounded-2xl border border-gray-800 hover:border-primary/50 transition-colors">
            <div className="bg-gradient-to-br from-primary to-secondary w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Rocket className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Schnelle Umsetzung</h3>
            <p className="text-gray-400">
              Implementiere KI-Lösungen in Rekordzeit und erziele sofort messbare Ergebnisse
            </p>
          </div>

          <div className="bg-black/30 p-8 rounded-2xl border border-gray-800 hover:border-primary/50 transition-colors">
            <div className="bg-gradient-to-br from-primary to-secondary w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Sicherheit & Compliance</h3>
            <p className="text-gray-400">
              Setze KI-Systeme unter Berücksichtigung höchster Sicherheitsstandards und Compliance-Anforderungen ein
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-12"
          >
            Kostenlose Beratung vereinbaren
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIHereSection;