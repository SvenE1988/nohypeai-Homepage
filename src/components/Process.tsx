import { MessageSquare, ClipboardList, FileText, Cog } from "lucide-react";

const Process = () => {
  const steps = [
    {
      number: "1",
      icon: MessageSquare,
      title: "Kostenfreies Erstgespräch",
      description:
        "In einem kurzen, unverbindlichen Gespräch klären wir, ob wir zusammenpassen und wie wir Ihnen weiterhelfen können.",
      image: "/lovable-uploads/photo-1486312338219-ce68d2c6f44d",
    },
    {
      number: "2",
      icon: ClipboardList,
      title: "Anforderungsanalyse",
      description:
        "Nach dem Erstgespräch erarbeiten wir eine detaillierte technische Spezifikation Ihrer Lösung. Wir dokumentieren alle Anforderungen und Schnittstellen für die passgenaue Umsetzung.",
      image: "/lovable-uploads/photo-1487058792275-0ad4aaf24ca7",
    },
    {
      number: "3",
      icon: FileText,
      title: "Angebotserstellung",
      description:
        "Auf Basis der Analyse erhalten Sie ein maßgeschneidertes Angebot, das genau auf Ihre Bedürfnisse abgestimmt ist.",
      image: "/lovable-uploads/photo-1485827404703-89b55fcc595e",
    },
    {
      number: "4",
      icon: Cog,
      title: "Umsetzung der Lösung",
      description:
        "Nach Freigabe beginnen wir mit der Umsetzung. Je nach Umfang ist Ihre Lösung innerhalb von 1 bis 6 Wochen vollständig auf Ihrem System integriert.",
      image: "/lovable-uploads/photo-1581091226825-a6a2a5aee158",
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
                <div className="flex flex-col gap-6">
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
                  <div className="w-full h-48 overflow-hidden rounded-lg">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
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