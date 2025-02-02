import { Clock, TrendingDown, Target } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Zeitersparnis",
      description: "Bis zu 100 Stunden pro Woche sparen",
    },
    {
      icon: TrendingDown,
      title: "Kostenreduktion",
      description: "Mitarbeiter- und Betriebskosten signifikant reduzieren",
    },
    {
      icon: Target,
      title: "Präzisere Ergebnisse",
      description: "Maximale Präzision durch minimierte Fehlerquoten",
    },
  ];

  return (
    <section className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <span className="text-primary mb-4">Vorteile</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Das Ergebnis unserer Zusammenarbeit
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-[#6B7CFF33] p-4 rounded-2xl mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;