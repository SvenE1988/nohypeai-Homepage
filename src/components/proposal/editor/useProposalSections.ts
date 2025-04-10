
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Proposal, ProposalSection } from "../types";

export const useProposalSections = (proposal: Proposal, onChange: (proposal: Proposal) => void) => {
  
  const handleSectionChange = (updatedSection: ProposalSection) => {
    const updatedSections = proposal.sections.map(section => 
      section.id === updatedSection.id ? updatedSection : section
    );
    
    onChange({
      ...proposal,
      sections: updatedSections,
      updatedAt: new Date().toISOString()
    });
  };
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(proposal.sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    const newSections = items.map((item, index) => ({
      ...item,
      order: index
    }));
    
    onChange({
      ...proposal,
      sections: newSections,
      updatedAt: new Date().toISOString()
    });
  };
  
  const addSection = (type: ProposalSection['type']) => {
    const newSection: ProposalSection = {
      id: uuidv4(),
      type,
      content: getDefaultContent(type),
      order: proposal.sections.length
    };
    
    onChange({
      ...proposal,
      sections: [...proposal.sections, newSection],
      updatedAt: new Date().toISOString()
    });
  };
  
  const removeSection = (sectionId: string) => {
    const updatedSections = proposal.sections
      .filter(section => section.id !== sectionId)
      .map((section, index) => ({
        ...section,
        order: index
      }));
    
    onChange({
      ...proposal,
      sections: updatedSections,
      updatedAt: new Date().toISOString()
    });
  };
  
  const getDefaultContent = (type: ProposalSection['type']) => {
    switch (type) {
      case 'header':
        return { title: "Neuer Titel", subtitle: "Untertitel", date: new Date().toLocaleDateString('de-DE') };
      case 'text':
        return { title: "Abschnittstitel", text: "Ihr Text hier..." };
      case 'image':
        return { src: "", alt: "Bild Beschreibung", caption: "" };
      case 'caseStudy':
        return { caseStudyId: 0 };
      case 'pricing':
        return { 
          title: "Preise", 
          items: [{ description: "Position", price: 0, unit: "pauschal" }] 
        };
      case 'contact':
        return { 
          title: "Kontakt",
          contact: {
            name: "Name",
            position: "Position",
            email: "email@example.com",
            phone: "+49 123 456789"
          }
        };
      default:
        return {};
    }
  };

  return {
    handleSectionChange,
    handleDragEnd,
    addSection,
    removeSection
  };
};
