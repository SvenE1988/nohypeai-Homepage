
import React from 'react';
import { Button } from './ui/button';
import { Bot, Cpu, MessageSquare, Mic2 } from 'lucide-react';
import { useCallToAction } from '@/hooks/useCallToAction';

const TechStack = () => {
  const { openCalendarBooking } = useCallToAction();
  
  const categories = [
    { name: 'KI-Agenten', icon: <Bot className="w-5 h-5" /> },
    { name: 'KI-Automatisierungen', icon: <Cpu className="w-5 h-5" /> },
    { name: 'Eingehender Anruf', icon: <Mic2 className="w-5 h-5" /> },
    { name: 'Ausgehender Anruf', icon: <MessageSquare className="w-5 h-5" /> },
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full">
            <img
              src="/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png"
              alt="Tech Stack Logos"
              className="w-full h-auto rounded-xl shadow-lg opacity-60" 
            />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white">Unser Tech Stack</h2>
              <p className="text-gray-300 text-lg">
                Wir helfen dir, dich im KI-Dschungel zurechtzufinden. Mit tausenden von KI-Softwares und Tools unterstützen wir dich dabei, 
                den richtigen Tech Stack für deine Bedürfnisse und dein Unternehmen zu finden.
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

            <Button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl"
              onClick={openCalendarBooking}
            >
              Arbeite mit uns
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
