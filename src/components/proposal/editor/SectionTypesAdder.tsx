
import React from "react";
import { Button } from "@/components/ui/button";
import { ProposalSection } from "../types";

interface SectionTypesAdderProps {
  onAddSection: (type: ProposalSection['type']) => void;
}

export const SectionTypesAdder: React.FC<SectionTypesAdderProps> = ({ onAddSection }) => {
  return (
    <div className="bg-black/30 border border-white/10 rounded-lg p-4">
      <h3 className="text-white font-medium mb-3 text-sm">Abschnitt hinzufügen</h3>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => onAddSection('header')} variant="outline" size="sm" className="text-xs py-1 h-8">Header</Button>
        <Button onClick={() => onAddSection('text')} variant="outline" size="sm" className="text-xs py-1 h-8">Text</Button>
        <Button onClick={() => onAddSection('image')} variant="outline" size="sm" className="text-xs py-1 h-8">Bild</Button>
        <Button onClick={() => onAddSection('caseStudy')} variant="outline" size="sm" className="text-xs py-1 h-8">Case Study</Button>
        <Button onClick={() => onAddSection('pricing')} variant="outline" size="sm" className="text-xs py-1 h-8">Preistabelle</Button>
        <Button onClick={() => onAddSection('contact')} variant="outline" size="sm" className="text-xs py-1 h-8">Kontakt</Button>
      </div>
    </div>
  );
};
