import { Mail, Linkedin, Twitter, Youtube } from "lucide-react";
import { Button } from "./ui/button";

const AIFirstSection = () => {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-black to-[#1a1f35] text-white py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Werde ein <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              KI-First
            </span>{" "}
            <br />
            Unternehmen
          </h2>
          
          <p className="text-xl text-gray-300">
            Ich helfe wachsenden Unternehmen KI zu implementieren und zu skalieren - ohne zusätzliches Personal einzustellen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-black hover:bg-black/80 text-white border-2 border-primary">
              Jetzt durchstarten
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Community beitreten
            </Button>
          </div>

          <div className="flex gap-6 pt-4">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Youtube size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="/lovable-uploads/d7917218-9503-4336-a432-e9aa9a629d40.png" 
              alt="KI Experte" 
              className="w-full h-auto rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          <div className="absolute -z-10 inset-0 blur-3xl opacity-30 bg-gradient-to-r from-primary to-secondary"></div>
        </div>
      </div>
    </section>
  );
};

export default AIFirstSection;