
import { ProposalSection, SectionType, Page } from "../types/proposal";
import { v4 as uuidv4 } from "uuid";

export const createNewSection = (type: SectionType, order: number): ProposalSection => {
  const baseSection = {
    id: uuidv4(),
    type,
    order
  };

  switch (type) {
    case 'header':
      return {
        ...baseSection,
        type: 'header',
        content: {
          title: "Neuer Titel",
          subtitle: "Untertitel",
          date: new Date().toLocaleDateString('de-DE')
        }
      };
    case 'text':
      return {
        ...baseSection,
        type: 'text',
        content: {
          title: "Abschnittstitel",
          text: "Ihr Text hier..."
        }
      };
    case 'image':
      return {
        ...baseSection,
        type: 'image',
        content: {
          src: "",
          alt: "Bild Beschreibung",
          caption: ""
        }
      };
    case 'caseStudy':
      return {
        ...baseSection,
        type: 'caseStudy',
        content: {
          caseStudyId: 0
        }
      };
    case 'pricing':
      return {
        ...baseSection,
        type: 'pricing',
        content: {
          title: "Preise",
          items: [{ description: "Position", price: 0, unit: "pauschal" }]
        }
      };
    case 'contact':
      return {
        ...baseSection,
        type: 'contact',
        content: {
          title: "Kontakt",
          contact: {
            name: "Name",
            position: "Position",
            email: "email@example.com",
            phone: "+49 123 456789"
          }
        }
      };
    case 'tableOfContents':
      return {
        ...baseSection,
        type: 'tableOfContents',
        content: {}
      };
  }
};

export const reorderSections = (sections: ProposalSection[]): ProposalSection[] => {
  return sections.map((section, index) => ({
    ...section,
    order: index
  }));
};

export const calculateEffectivePageIndex = (
  currentPage: number,
  useCoverPage: boolean
): number => {
  return useCoverPage && currentPage > 0 ? currentPage - 1 : currentPage;
};

export const findSectionPage = (
  pages: Page[],
  sectionId: string
): number | null => {
  const pageIndex = pages.findIndex(page => 
    page.sections.some(section => section.id === sectionId)
  );
  return pageIndex >= 0 ? pageIndex : null;
};
