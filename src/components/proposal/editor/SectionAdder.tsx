
import React from "react";
import { Button } from "@/components/ui/button";

interface SectionAdderProps {
  addSection: (type: string) => void;
}

export const SectionAdder: React.FC<SectionAdderProps> = ({ addSection }) => {
  return (
    <div className="bg-black/30 border border-white/10 rounded-lg p-4 mt-4">
      <h3 className="text-white font-medium mb-4 text-sm">Abschnitt hinzufügen</h3>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => addSection('header')} variant="outline" size="sm" className="text-xs py-1 h-8">Header</Button>
        <Button onClick={() => addSection('text')} variant="outline" size="sm" className="text-xs py-1 h-8">Text</Button>
        <Button onClick={() => addSection('image')} variant="outline" size="sm" className="text-xs py-1 h-8">Bild</Button>
        <Button onClick={() => addSection('caseStudy')} variant="outline" size="sm" className="text-xs py-1 h-8">Case Study</Button>
        <Button onClick={() => addSection('pricing')} variant="outline" size="sm" className="text-xs py-1 h-8">Preistabelle</Button>
        <Button onClick={() => addSection('contact')} variant="outline" size="sm" className="text-xs py-1 h-8">Kontakt</Button>
      </div>
    </div>
  );
};
