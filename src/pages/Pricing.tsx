
import NavHeader from "../components/blocks/nav-header";
import { Check, Calculator } from "lucide-react";
import SavingsCalculator from "../components/SavingsCalculator";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { useCallToAction } from "@/hooks/useCallToAction";

const Pricing = () => {
  const { openCalendarBooking } = useCallToAction();
  
  const tiers = [
    {
      name: "Starter",
      price: "ab 999€",
      description: "Perfekt für kleine Unternehmen",
      features: [
        "Basis Website-Entwicklung",
        "Responsive Design",
        "SEO-Optimierung",
        "5 Seiten inklusive",
        "Kontaktformular",
      ],
    },
    {
      name: "Professional",
      price: "ab 2.499€",
      description: "Ideal für wachsende Unternehmen",
      features: [
        "Alles aus Starter",
        "E-Commerce Integration",
        "CMS-System",
        "Premium Support",
        "10 Seiten inklusive",
        "Analytics Integration",
      ],
    },
    {
      name: "Enterprise",
      price: "Individuell",
      description: "Maßgeschneiderte Lösungen",
      features: [
        "Alles aus Professional",
        "Unbegrenzte Seiten",
        "API-Entwicklung",
        "24/7 Support",
        "Custom Features",
        "Dediziertes Entwicklerteam",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <NavHeader />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Unsere Preise</h1>
          <p className="text-gray-400">
            Transparente Preise für Ihre digitale Transformation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="border border-white/10 rounded-xl p-8 backdrop-blur-sm hover:border-white/20 transition-all"
            >
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-4xl font-bold mb-4">{tier.price}</p>
              <p className="text-gray-400 mb-6">{tier.description}</p>
              <ul className="space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="text-green-500" size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full mt-8 bg-[#1A1F35] text-primary hover:bg-[#252A40] transition-all flex items-center justify-center gap-2 border border-[#3A3F55] rounded-md"
                onClick={openCalendarBooking}
              >
                <Calculator className="w-4 h-4 text-primary" />
                Termin buchen
              </Button>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Berechnen Sie Ihre Einsparungen</h2>
            <p className="text-gray-400">
              Entdecken Sie, wie viel Zeit und Geld Sie mit unseren KI-Lösungen sparen können. 
              Unsere Kunden berichten von signifikanten Kosteneinsparungen durch effizientere Prozesse 
              und automatisierte Arbeitsabläufe.
            </p>
          </div>
          <SavingsCalculator />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
