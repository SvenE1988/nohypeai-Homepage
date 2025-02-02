import { Lock } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark text-white pt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center bg-white bg-opacity-10 rounded-full px-4 py-2 mb-8">
          <Lock size={16} className="mr-2" />
          <span className="text-sm">DSGVO konform!</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 max-w-5xl mx-auto leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Wachse schneller mit KI-Agenten
        </h1>
        
        <div className="grid gap-6 max-w-3xl mx-auto mb-12">
          <div className="text-xl md:text-2xl text-gray-300">
            <span className="text-primary font-semibold">Mehr Profit?</span> Wir bringen dich nach vorn.
          </div>
          <div className="text-xl md:text-2xl text-gray-300">
            <span className="text-primary font-semibold">Höhere Effizienz?</span> Wir machen es möglich.
          </div>
          <div className="text-xl md:text-2xl text-gray-300">
            <span className="text-primary font-semibold">Dein Business?</span> Wir heben es auf das nächste Level.
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="#gespraech"
            className="bg-primary text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            Gespräch buchen
          </a>
          <a
            href="#mehr"
            className="bg-transparent border border-white text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white hover:text-black transition-colors"
          >
            Mehr erfahren
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;