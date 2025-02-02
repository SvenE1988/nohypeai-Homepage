import { MessageSquare, ClipboardList, FileText, Cog } from "lucide-react";

const Process = () => {
  const steps = [
    {
      number: "1",
      icon: MessageSquare,
      title: "Persönliches Kennenlernen (20 Minuten)",
      description:
        "In einem entspannten 20-minütigen Gespräch lernen wir uns kennen und verstehen Ihre Vision. Gemeinsam erkunden wir, wie KI Ihr Unternehmen voranbringen kann.",
    },
    {
      number: "2",
      icon: ClipboardList,
      title: "Strategische Planung",
      description:
        "Wir entwickeln einen maßgeschneiderten Plan für Ihr Projekt. Dabei berücksichtigen wir Ihre Ziele, technischen Anforderungen und gewünschten Zeitrahmen.",
    },
    {
      number: "3",
      icon: FileText,
      title: "Individuelles Konzept",
      description:
        "Sie erhalten ein detailliertes Konzept mit transparenter Kostenaufstellung und klarem Zeitplan. Alle Projektphasen werden verständlich dargestellt.",
    },
    {
      number: "4",
      icon: Cog,
      title: "Agile Realisierung",
      description:
        "Mit modernsten Technologien setzen wir Ihr Projekt um. Durch regelmäßige Updates bleiben Sie stets im Bild und können direkt Feedback geben.",
    },
  ];

  return (
    <section id="prozess" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <span className="text-primary mb-4">Der Weg zum Erfolg</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Gemeinsam. Effizient. Zukunftsweisend.
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
