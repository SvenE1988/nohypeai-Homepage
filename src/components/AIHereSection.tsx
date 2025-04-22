
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const AIHereSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[60vh] sm:min-h-screen flex items-center bg-black py-10 sm:py-16">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="text-center max-w-2xl sm:max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
            Unsere Lösungen
          </h2>
          <p className="text-base sm:text-xl text-gray-400">
            Wir helfen dir, KI sinnvoll einzusetzen – für spürbare Entlastung und messbares Wachstum.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16">
          {/* Sprach-KI-Kachel */}
          <div className="bg-[#0A0A0A] p-6 sm:p-8 rounded-2xl border border-[#1A1A1A] hover:border-primary/50 transition-colors flex flex-col">
            <div className="bg-[#1A1F35] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <span className="text-primary font-bold text-lg">🎤</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-white">Sprach-KI</h3>
            <p className="text-gray-400 text-sm sm:text-base flex-1">
              Intelligente Voice-Agenten, die Kundenanfragen entgegennehmen, Termine vereinbaren und qualifizieren – rund um die Uhr.
            </p>
            <Button
              className="w-full py-4 md:py-6 bg-[#1A1F35] text-primary hover:bg-[#252A40] transition-all duration-300 flex items-center justify-center gap-2 border border-[#3A3F55] rounded-md mt-6 group"
              onClick={() => navigate("/live-tests")}
              variant={undefined}
              size={undefined}
            >
              Mehr erfahren
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Automatisierung-Kachel */}
          <div className="bg-[#0A0A0A] p-6 sm:p-8 rounded-2xl border border-[#1A1A1A] hover:border-primary/50 transition-colors flex flex-col">
            <div className="bg-[#1A1F35] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <span className="text-primary font-bold text-lg">⚙️</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-white">Automatisierung</h3>
            <p className="text-gray-400 text-sm sm:text-base flex-1">
              Wiederholende Aufgaben automatisieren, manuelle Prozesse digitalisieren und dein Team entlasten.
            </p>
            <Button
              className="w-full py-4 md:py-6 bg-[#1A1F35] text-primary hover:bg-[#252A40] transition-all duration-300 flex items-center justify-center gap-2 border border-[#3A3F55] rounded-md mt-6 group"
              onClick={() => navigate("/automatisierung")}
              variant={undefined}
              size={undefined}
            >
              Mehr erfahren
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* KI-Beratung-Kachel */}
          <div className="bg-[#0A0A0A] p-6 sm:p-8 rounded-2xl border border-[#1A1A1A] hover:border-primary/50 transition-colors flex flex-col">
            <div className="bg-[#1A1F35] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <span className="text-primary font-bold text-lg">💡</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-white">KI-Beratung</h3>
            <p className="text-gray-400 text-sm sm:text-base flex-1">
              Individuelle Beratung, wie du KI sinnvoll in deinem Unternehmen einsetzen kannst – ohne IT-Abteilung.
            </p>
            <Button
              className="w-full py-4 md:py-6 bg-[#1A1F35] text-primary hover:bg-[#252A40] transition-all duration-300 flex items-center justify-center gap-2 border border-[#3A3F55] rounded-md mt-6 group"
              onClick={() => navigate("/blog")}
              variant={undefined}
              size={undefined}
            >
              Mehr erfahren
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIHereSection;

