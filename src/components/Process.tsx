
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Process = () => {
  const steps = [
    {
      number: "1",
      title: "Audit & Analyse",
      shortDescription:
        "Eine erfolgreiche KI-Strategie beginnt mit der klaren Definition von Zielen, die das Unternehmen mit der Implementierung von KI erreichen möchte. Es geht darum,...",
      fullDescription:
        "Eine erfolgreiche KI-Strategie beginnt mit der klaren Definition von Zielen, die das Unternehmen mit der Implementierung von KI erreichen möchte. Es geht darum, aktuelle Prozesse zu analysieren, Optimierungspotenziale zu identifizieren und messbare Ziele zu definieren. Wir führen eine gründliche Bestandsaufnahme durch, um zu verstehen, wo KI den größten Mehrwert für Ihr Unternehmen schaffen kann.",
    },
    {
      number: "2",
      title: "Datenstrategie Entwickeln",
      shortDescription:
        "Daten sind das Herzstück jeder KI-Initiative. Ohne qualitativ hochwertige Daten kann KI keine zuverlässigen Ergebnisse liefern. In dieser Phase wird eine umfassende Datenstrategie entwickelt.",
      fullDescription:
        "Daten sind das Herzstück jeder KI-Initiative. Ohne qualitativ hochwertige Daten kann KI keine zuverlässigen Ergebnisse liefern. In dieser Phase wird eine umfassende Datenstrategie entwickelt, die festlegt, welche Daten für die KI-Modelle benötigt werden, wie diese Daten gesammelt und verarbeitet werden sollen und wie ihre Qualität sichergestellt wird. Unternehmen müssen sicherstellen, dass sie über ausreichende Datenmengen verfügen und dass diese Daten für die geplanten KI-Anwendungen relevant sind. Gleichzeitig muss auch der Datenschutz berücksichtigt werden, da die KI oft auf sensible Daten zugreifen wird. Eine klare Datenstrategie ermöglicht es, KI effektiv und nachhaltig einzusetzen.",
    },
    {
      number: "3",
      title: "Infrastruktur aufbauen",
      shortDescription:
        "Der nächste Schritt in der Entwicklung einer KI-Strategie ist der Aufbau einer robusten technologischen Infrastruktur. Da KI häufig große Datenmengen und...",
      fullDescription:
        "Der nächste Schritt in der Entwicklung einer KI-Strategie ist der Aufbau einer robusten technologischen Infrastruktur. Da KI häufig große Datenmengen und erhebliche Rechenleistung erfordert, müssen Unternehmen sicherstellen, dass ihre technische Infrastruktur diesen Anforderungen gerecht wird. Dies kann die Implementierung von Cloud-Lösungen, die Einrichtung von Datenplattformen oder die Integration von KI-Tools in bestehende Systeme umfassen.",
    },
    {
      number: "4",
      title: "Agile Realisierung",
      shortDescription:
        "Mit modernsten Technologien setzen wir Ihr Projekt um. Durch regelmäßige Updates bleiben Sie stets im Bild und können direkt Feedback geben.",
      fullDescription:
        "Mit modernsten Technologien setzen wir Ihr Projekt um. Durch regelmäßige Updates bleiben Sie stets im Bild und können direkt Feedback geben. Wir arbeiten in agilen Sprints, um schnell erste Ergebnisse zu liefern und kontinuierlich zu verbessern. Unser erfahrenes Entwicklungsteam setzt dabei auf bewährte Methoden und innovative Ansätze, um Ihr KI-Projekt erfolgreich zu implementieren und nahtlos in Ihre bestehenden Prozesse zu integrieren.",
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

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-[40px] top-8 bottom-8 w-0.5 bg-white/20" />

          {steps.map((step, index) => (
            <ProcessStep 
              key={index}
              step={step}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProcessStepProps {
  step: {
    number: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
  };
  isLast: boolean;
}

const ProcessStep = ({ step, isLast }: ProcessStepProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-14 relative">
      <div className="flex items-start">
        {/* Number and circle */}
        <div className="mr-6 flex flex-col items-center">
          <div className="text-[#f0e14a] text-4xl font-bold mb-2">{step.number}</div>
          <div className="relative z-10 w-7 h-7 rounded-full border-2 border-white bg-black" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="bg-[#1a1f35] rounded-xl p-6"
          >
            <div className="text-gray-300 mb-4">
              {isOpen ? step.fullDescription : step.shortDescription}
            </div>
            
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost" 
                className="bg-[#252b45] hover:bg-[#30364e] text-[#f0e14a] px-4 py-2 rounded-md"
              >
                {isOpen ? "weniger anzeigen..." : "mehr erfahren..."}
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-4">
              {/* Additional content can be added here if needed */}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default Process;
