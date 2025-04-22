
import { Avatar } from "./ui/avatar";
import { Linkedin, Mail, BookOpen } from "lucide-react";
import { useCallToAction } from "@/hooks/useCallToAction";
import { Link } from "react-router-dom";

const About = () => {
  const { openContactForm } = useCallToAction();
  const team = [
    {
      name: "Sven Erkens",
      role: "Gründer von NoHypeAI",
      image: "/lovable-uploads/53242408-166e-4bd6-89db-0295c8e032ca.png",
      linkedin: "https://www.linkedin.com/in/svenerkens",
    },
  ];

  return (
    <section id="ueber-uns" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <span className="text-primary mb-4 block text-center">Über Uns</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Über Uns Text */}
          <div className="order-2 md:order-1 flex items-center">
            <div className="md:pl-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Über uns
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                „Ich saß im 20. Kundencall und dachte: Das muss doch smarter gehen.“<br />
                <span className="font-semibold text-white">KI – bodenständig, verständlich und messbar.</span>
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                Ich bin <span className="font-semibold text-white">Sven Erkens</span>, Gründer von NoHypeAI und zugleich Account Executive für eine B2B‑SaaS‑Plattform in Stuttgart. Mit über zehn Jahren B2B‑Sales‑Erfahrung (400+ Kunden, 1.000+ Gespräche) und solidem technischen Background suche ich seit jeher nach Wegen, manuelle Zeitschleifen zu eliminieren – von CRM‑ und E‑Mail‑Automationen ab 2018 bis hin zu echten KI‑Tools ab 2023.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                Ich lebe in Karlsruhe, bin verheiratet und Vater eines kleinen Sohnes. Mein Ziel: Automatisieren, was Zeit frisst, damit Teams wieder Raum für Familie, Kreativität und echte Resultate haben.
              </p>
            </div>
          </div>
          {/* Gründer Profil */}
          <div className="order-1 md:order-2 flex flex-col items-center">
            <div className="bg-[#0D0F1A] rounded-2xl p-6 max-w-md w-full">
              <Avatar className="w-full h-[300px] rounded-xl mb-6">
                <img
                  src={team[0].image}
                  alt={team[0].name}
                  className="object-cover w-full h-full"
                />
              </Avatar>
              <h3 className="text-2xl font-semibold text-white mb-2">{team[0].name}</h3>
              <p className="text-gray-400 mb-4">{team[0].role}</p>
              <div className="flex gap-4 justify-center mb-6">
                <a
                  href={team[0].linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  onClick={openContactForm}
                  className="text-gray-400 hover:text-primary cursor-pointer"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              {/* Blog Card über Sven */}
              <div className="bg-gradient-to-br from-[#182032] to-[#222a44] border border-white/10 p-4 rounded-lg mt-4 shadow-md flex flex-col">
                <div className="flex items-center mb-2">
                  <BookOpen className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm text-primary font-medium">
                    Persönliche Insights von noHype-Gründer Sven
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-white">Meine Reise zu NoHypeAI:</span>
                  <span className="text-gray-300 block mt-1 text-sm">
                    Schon während meiner Zeit als Projektleiter in einem Ingenieurbüro für Erneuerbare Energien merkte ich, wie viele Stunden sinnlos in Routineaufgaben versickern. 
                    Parallel dazu habe ich tief in der Energiebranche Fuß gefasst. 
                    In über zehn Jahren Sales‑Erfahrung – mehr als 400 gewonnene Kunden und über 1.000 Erstgespräche – habe ich gesehen, wie stark sich Effizienz und Kundenzufriedenheit gegenseitig beflügeln. 
                    Mitte 2023 dann mein Aha-Moment: Für Wesa Solar automatisierten wir den kompletten Angebotsprozess zur Konfiguration von Photovoltaik‑Anlagen. 
                    Dieses Ergebnis war kein „Nice‑to‑have“, sondern handfeste Entlastung und die perfekte Blaupause für praxisnahe Automatisierung.
                  </span>
                  <span className="text-gray-300 block mt-1 text-sm">
                    Aus all diesen Erfahrungen ist meine No‑Hype‑Philosophie entstanden: KI muss einfach sein, schnell umsetzbar und wirkungsvoll.
                  </span>
                </div>
                <Link
                  to="/blog/insights-nohype-gruender-sven"
                  className="mt-2 inline-flex items-center text-primary hover:underline text-sm font-medium"
                >
                  Zum vollständigen Blogartikel
                  <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
