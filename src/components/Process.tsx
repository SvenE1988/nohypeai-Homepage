import { Square1, Square2, Square3, Square4 } from "lucide-react";

const Process = () => {
  const steps = [
    {
      number: "1",
      icon: Square1,
      title: "Kostenfreies Erstgespräch",
      description:
        "In einem kurzen, unverbindlichen Gespräch klären wir, ob wir zusammenpassen und wie wir Ihnen weiterhelfen können.",
    },
    {
      number: "2",
      icon: Square2,
      title: "Anforderungsanalyse",
      description:
        "Nach dem Erstgespräch erarbeiten wir eine detaillierte technische Spezifikation Ihrer Lösung. Wir dokumentieren alle Anforderungen und Schnittstellen für die passgenaue Umsetzung.",
    },
    {
      number: "3",
      icon: Square3,
      title: "Angebotserstellung",
      description:
        "Auf Basis der Analyse erhalten Sie ein maßgeschneidertes Angebot, das genau auf Ihre Bedürfnisse abgestimmt ist.",
    },
    {
      number: "4",
      icon: Square4,
      title: "Umsetzung der Lösung",
      description:
        "Nach Freigabe beginnen wir mit der Umsetzung. Je nach Umfang ist Ihre Lösung innerhalb von 1 bis 6 Wochen vollständig auf Ihrem System integriert.",
    },
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <span className="text-primary mb-4">Prozess</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Strukturiert. Transparent. Zielorientiert.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-[#1a1f35] rounded-xl p-8 relative group hover:bg-[#252b45] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#2a3149] p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;