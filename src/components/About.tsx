
import { Avatar } from "./ui/avatar";
import { Linkedin, Mail } from "lucide-react";
import { useCallToAction } from "@/hooks/useCallToAction";

const About = () => {
  const { openContactForm } = useCallToAction();
  const team = [{
    name: "Sven",
    role: "Gründer & Inhaber",
    image: "/lovable-uploads/53242408-166e-4bd6-89db-0295c8e032ca.png",
    linkedin: "https://www.linkedin.com/in/svenerkens",
  }];
  
  return (
    <section id="ueber-uns" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <span className="text-primary mb-4 block text-center">Über Uns</span>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Über Uns Text */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Über Uns
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Wir sind eine Automatisierungs- und KI-Agentur aus Karlsruhe und haben uns darauf spezialisiert, Unternehmen den Einstieg in die Welt der Künstlichen Intelligenz zu erleichtern. Mit smarten Tools wie n8n, Gemini &amp; Co. zeigen wir, wie schon kleine Automatisierungen große Wirkung entfalten können – im Vertrieb, im Support oder in internen Prozessen.
            </p>
            <p className="text-gray-400 leading-relaxed mt-4">
              Seit Juli 2024 entwickeln wir Lösungen, die nicht nur Zeit sparen, sondern echten Mehrwert schaffen. Gemeinsam finden wir heraus, wo in deinem Unternehmen Potenzial steckt – und wie wir es mit cleveren Automationen und KI effizient heben können.
            </p>
          </div>
          
          {/* Gründer Profil */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="bg-[#0D0F1A] rounded-2xl p-6 max-w-md">
              <Avatar className="w-full h-[300px] rounded-xl mb-6">
                <img src={team[0].image} alt={team[0].name} className="object-cover w-full h-full" />
              </Avatar>
              <h3 className="text-2xl font-semibold text-white mb-2">
                {team[0].name}
              </h3>
              <p className="text-gray-400 mb-4">{team[0].role}</p>
              <div className="flex gap-4 justify-center">
                <a href={team[0].linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a onClick={openContactForm} className="text-gray-400 hover:text-primary cursor-pointer">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
