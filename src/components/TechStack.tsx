import React from 'react';
import { Button } from './ui/button';
import { Bot, Cpu, MessageSquare, Mic2 } from 'lucide-react';

const TechStack = () => {
  const tools = [
    { name: 'make', logo: '/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png' },
    { name: 'Relevance AI', logo: '/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png' },
    { name: 'n8n', logo: '/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png' },
    { name: 'zapier', logo: '/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png' },
    { name: 'Airtable', logo: '/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png' },
    { name: 'clay', logo: '/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png' },
    { name: 'supabase', logo: '/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png' },
    { name: 'HubSpot', logo: '/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png' },
    { name: 'instantly', logo: '/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png' },
    { name: 'WhatsApp', logo: '/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png' },
    { name: 'Smartlead.ai', logo: '/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png' },
    { name: 'OpenAI', logo: '/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png' },
    { name: 'Claude', logo: '/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png' },
    { name: 'VAPI', logo: '/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png' },
    { name: 'slack', logo: '/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png' },
    { name: 'PhantomBuster', logo: '/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png' },
    { name: 'Apollo.io', logo: '/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png' },
    { name: 'sendspark', logo: '/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png' },
  ];

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
          {/* Linke Seite - Logos */}
          <div className="grid grid-cols-3 gap-4">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform duration-200"
                style={{ aspectRatio: '3/1' }}
              >
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-full h-full object-contain"
                  style={{ 
                    clipPath: `inset(${(index * 100) / 18}% ${(index % 3) * 33.33}% ${100 - ((index + 1) * 100) / 18}% ${100 - ((index % 3 + 1) * 33.33)}%)` 
                  }}
                />
              </div>
            ))}
          </div>

          {/* Rechte Seite - Text und Kategorien */}
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