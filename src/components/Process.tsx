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

        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={index} className="relative">
                <div className="flex items-start gap-8 bg-[#1a1f35] rounded-xl p-8 relative z-10 group hover:bg-[#252b45] transition-colors">
                  <div className="flex-shrink-0">
                    <div className="bg-[#2a3149] p-4 rounded-lg">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <div className="w-full h-48 overflow-hidden rounded-lg">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
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