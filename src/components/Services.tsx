
import { Zap, LockKeyhole, PlayCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const Services = () => {
  const services = [
    {
      icon: Zap,
      title: "Blitzschnelle Umsetzung",
      description: "Erhalten Sie fertige Projekte in Wochen statt Monaten.",
    },
    {
      icon: LockKeyhole,
      title: "Festpreis-Garantie",
      description: "Keine bösen Überraschungen. Sie zahlen genau den vereinbarten Preis.",
    },
    {
      icon: PlayCircle,
      title: "Flexibel und skalierbar",
      description: "Skalieren Sie nach Bedarf hoch oder runter und pausieren Sie jederzeit. Keine versteckten Bindungen.",
    },
  ];

  return (
    <section className="w-full bg-black py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Innovative KI-Lösungen für Ihren Erfolg
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-gradient-to-br from-black/60 to-black/40 border border-gray-800 overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                    <service.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
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
