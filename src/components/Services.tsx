import { Cpu, MessageSquare, Mic, PieChart } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const Services = () => {
  const services = [
    {
      icon: MessageSquare,
      title: "KI Chatbots & Assistenten",
      description: "Intelligente Chatbots, die Ihren Kommunikationsstil perfekt nachahmen und rund um die Uhr für Ihre Kunden da sind",
    },
    {
      icon: Cpu,
      title: "Prozessautomatisierung",
      description: "Automatisieren Sie repetitive Aufgaben wie E-Mail-Management, Datenanalyse und Content-Erstellung mit modernster KI-Technologie",
    },
    {
      icon: PieChart,
      title: "Strategische KI-Beratung",
      description: "Entwickeln Sie mit uns Ihre individuelle KI-Strategie. Wir begleiten Sie von der Konzeption bis zur erfolgreichen Implementierung",
    },
    {
      icon: Mic,
      title: "KI Voice Solutions",
      description: "Revolutionieren Sie Ihre Telefonie mit KI-gestützten Sprachassistenten - natürlich klingend und hocheffizient im Kundenkontakt",
    },
  ];

  return (
    <section className="w-full bg-black py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Innovative KI-Lösungen für Ihren Erfolg
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