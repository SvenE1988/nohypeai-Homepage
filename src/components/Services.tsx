import { Cpu, MessageSquare, Mic, PieChart } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const Services = () => {
  const services = [
    {
      icon: Cpu,
      title: "Workflow Automatisierung",
      description: "Egal ob E-Mails, Leads Qualifikation oder Content Creation – wir automatisieren Ihre Aufgaben komplett mit KI",
    },
    {
      icon: MessageSquare,
      title: "GPT Development",
      description: "Keine alten 0815-Chatbots mehr. Wir entwickeln smarte Bots, die Ihren Schreibstil übernemen und 24/7 verfügbar sind",
    },
    {
      icon: Mic,
      title: "KI Voice Agents",
      description: "Mit modernster Technologie erstellen wir Voice-Assistenten, die menschlich klingen und 24/7 ans Telefon gehen, oder automatisch anrufen",
    },
    {
      icon: PieChart,
      title: "KI Beratung",
      description: "Unsicher, wie Sie KI optimal nutzen können? Wir begleiten Sie und Ihr Unternehmen individuell – mit flexiblen Betreuungsoptionen für Sie und Ihr Team",
    },
  ];

  return (
    <section className="w-full bg-black py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          KI-Lösungen für Ihr Business
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="bg-[#0A0A0A] border-[#1A1A1A] overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#1A1F35] flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-[#6B7CFF]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;