
import React from "react";
import { ProposalSection } from "../types";

interface TableOfContentsSectionProps {
  sections: ProposalSection[];
}

export const TableOfContentsSection: React.FC<TableOfContentsSectionProps> = ({ sections }) => {
  // Filter sections with titles (headers, texts, etc)
  const sectionsTitles = sections.filter(section => {
    return section.type === 'header' || 
           (section.type === 'text' && section.content.title) || 
           section.type === 'caseStudy' || 
           (section.type === 'pricing' && section.content.title) ||
           (section.type === 'contact' && section.content.title);
  });

  return (
    <div className="table-of-contents space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">Inhaltsverzeichnis</h2>
      
      <div className="space-y-2">
        {sectionsTitles.map((section, index) => {
          let title = "";
          
          switch(section.type) {
            case 'header':
              title = section.content.title;
              break;
            case 'text':
              title = section.content.title;
              break;
            case 'caseStudy':
              title = "Case Study";
              break;
            case 'pricing':
              title = section.content.title || "Preistabelle";
              break;
            case 'contact':
              title = section.content.title || "Kontakt";
              break;
            default:
              title = `Abschnitt ${index + 1}`;
          }
          
          return (
            <div key={section.id} className="flex items-baseline">
              <span className="text-white mr-2">{index + 1}.</span>
              <span className="text-white flex-1">{title}</span>
              <div className="flex-grow border-b border-dotted border-white/30 mx-2 mb-1"></div>
              <span className="text-white/80">Seite {Math.floor(index / 3) + 2}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
