import { memo } from "react";
import { Avatar } from "./ui/avatar";
import { Linkedin, Mail } from "lucide-react";
import { useCallToAction } from "@/hooks/useCallToAction";
import { BaseCard } from "@/components/ui/base-card";

const teamMember = {
  name: "Sven",
  role: "Gründer & Inhaber",
  image: "/lovable-uploads/53242408-166e-4bd6-89db-0295c8e032ca.png",
  linkedin: "https://www.linkedin.com/in/svenerkens",
};

const About = memo(() => {
  const { openContactForm } = useCallToAction();
  const handleContactClick = () => {
    openContactForm();
  };
  return (
    <section id="ueber-uns" className="py-16 sm:py-20 bg-gradient-dark">
      <div className="container mx-auto px-2 sm:px-4">
        <span className="text-primary mb-3 sm:mb-4 block text-center text-xs sm:text-base">Über Uns</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Über Uns Text */}
          <div className="order-2 md:order-1 flex items-center">
            <div className="md:pl-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Über Uns
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Wir sind eine Automatisierungs- und KI-Agentur aus Karlsruhe und haben uns darauf spezialisiert, Unternehmen den Einstieg in die Welt der Künstlichen Intelligenz zu erleichtern. Mit smarten Tools wie n8n, Gemini &amp; Co. zeigen wir, wie schon kleine Automatisierungen große Wirkung entfalten können – im Vertrieb, im Support oder in internen Prozessen.
              </p>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mt-3 sm:mt-4">
                Seit Juli 2024 entwickeln wir Lösungen, die nicht nur Zeit sparen, sondern echten Mehrwert schaffen. Gemeinsam finden wir heraus, wo in deinem Unternehmen Potenzial steckt – und wie wir es mit cleveren Automationen und KI effizient heben können.
              </p>
            </div>
          </div>
          {/* Gründer Profil */}
          <div className="order-1 md:order-2 flex justify-center">
            <BaseCard className="bg-[#0D0F1A] rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-md flex flex-col items-center">
              <Avatar className="w-full h-72 sm:h-[300px] rounded-xl mb-6">
                <img 
                  src={teamMember.image} 
                  alt={teamMember.name} 
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </Avatar>
              <h3 className="text-lg sm:text-2xl font-semibold text-white mb-1 sm:mb-2">
                {teamMember.name}
              </h3>
              <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">{teamMember.role}</p>
              <div className="flex gap-3 sm:gap-4 justify-center">
                <a href={teamMember.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a onClick={handleContactClick} className="text-gray-400 hover:text-primary cursor-pointer">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </BaseCard>
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
