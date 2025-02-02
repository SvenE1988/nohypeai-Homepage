import React from 'react';
import { Button } from './ui/button';
import { Bot, Cpu, MessageSquare, Mic2 } from 'lucide-react';

const TechStack = () => {
  const categories = [
    { name: 'KI-Agenten', icon: <Bot className="w-5 h-5" /> },
    { name: 'KI-Automatisierungen', icon: <Cpu className="w-5 h-5" /> },
    { name: 'KI-Sprachagenten', icon: <Mic2 className="w-5 h-5" /> },
    { name: 'KI-Chatbots', icon: <MessageSquare className="w-5 h-5" /> },
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full">
            <img
              src="/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png"
              alt="Tech Stack Logos"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white">Mein Tech Stack</h2>
              <p className="text-gray-300 text-lg">
                Finden Sie sich im KI-Dschungel zurecht. Mit tausenden von KI-Softwares und Tools helfe ich Ihnen dabei, 
                den richtigen Tech Stack für Ihre Bedürfnisse und Ihr Unternehmen zu finden.
              </p>
            </div>

            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-300">
                  {category.icon}
                  <span>{category.name}</span>
                </div>
              ))}
            </div>

            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl">
              Arbeiten Sie mit mir
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;