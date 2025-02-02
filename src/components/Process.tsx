import { MessageSquare, ClipboardList, FileText, Cog } from "lucide-react";

const Process = () => {
  const steps = [
    {
      number: "1",
      icon: MessageSquare,
      title: "Kostenfreies Erstgespräch",
      description:
        "In einem kurzen, unverbindlichen Gespräch klären wir, ob wir zusammenpassen und wie wir Ihnen weiterhelfen können.",
    },
    {
      number: "2",
      icon: ClipboardList,
      title: "Anforderungsanalyse",
      description:
        "Nach dem Erstgespräch erarbeiten wir eine detaillierte technische Spezifikation Ihrer Lösung. Wir dokumentieren alle Anforderungen und Schnittstellen für die passgenaue Umsetzung.",
    },
    {
      number: "3",
      icon: FileText,
      title: "Angebotserstellung",
      description:
        "Auf Basis der Analyse erhalten Sie ein maßgeschneidertes Angebot, das genau auf Ihre Bedürfnisse abgestimmt ist.",
    },
    {
      number: "4",
      icon: Cog,
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

        <div className="max-w-2xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={index} className="relative">
                <div className="flex items-start gap-6 bg-[#1a1f35] rounded-xl p-6 relative z-10 group hover:bg-[#252b45] transition-colors">
                  <div className="flex-shrink-0">
                    <div className="bg-[#2a3149] p-4 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                {!isLast && (
                  <div className="w-0.5 h-8 bg-primary mx-auto my-2 relative z-0">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-primary rotate-45" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;