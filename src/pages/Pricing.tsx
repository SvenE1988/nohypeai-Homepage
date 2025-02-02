import NavHeader from "../components/blocks/nav-header";
import { Check } from "lucide-react";

const Pricing = () => {
  const tiers = [
    {
      name: "Starter",
      price: "999€",
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
      price: "2.499€",
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

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
              <button className="w-full mt-8 border border-white/20 rounded-full py-2 px-4 hover:bg-white/10 transition-colors">
                Jetzt starten
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;