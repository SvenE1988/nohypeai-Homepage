
import { v4 as uuidv4 } from "uuid";
import { ProposalSection } from "../types";

export const useSectionOperations = () => {
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

  const handleSectionChange = (
    sections: ProposalSection[],
    updatedSection: ProposalSection
  ) => {
    return sections.map(section => 
      section.id === updatedSection.id ? updatedSection : section
    );
  };

  const addSection = (
    sections: ProposalSection[],
    type: ProposalSection['type']
  ): ProposalSection => {
    return {
      id: uuidv4(),
      type,
      content: getDefaultContent(type),
      order: sections.length
    };
  };

  const removeSection = (
    sections: ProposalSection[],
    sectionId: string
  ): ProposalSection[] => {
    return sections
      .filter(section => section.id !== sectionId)
      .map((section, index) => ({
        ...section,
        order: index
      }));
  };

  return {
    handleSectionChange,
    addSection,
    removeSection,
    getDefaultContent
  };
};
