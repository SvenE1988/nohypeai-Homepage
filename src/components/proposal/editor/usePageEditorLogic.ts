
import { v4 as uuidv4 } from "uuid";
import { Proposal, ProposalSection } from "../types";

export const usePageEditorLogic = (
  proposal: Proposal,
  onChange: (proposal: Proposal) => void,
  currentPage: number,
  setCurrentPage: (page: number) => void,
  pages: Array<{ sections: ProposalSection[] }>
) => {
  const { useCoverPage = true } = proposal;
  
  // Account for cover page in current page index
  const effectivePageIndex = useCoverPage && currentPage > 0 ? currentPage - 1 : currentPage;
  const currentPageSections = effectivePageIndex >= 0 && effectivePageIndex < pages.length 
    ? pages[effectivePageIndex].sections 
    : [];
  
  const handleSectionChange = (updatedSection: ProposalSection) => {
    let updatedPages = [...pages];
    let foundPage = false;
    
    updatedPages = updatedPages.map(page => {
      const updatedSections = page.sections.map(section => 
        section.id === updatedSection.id ? updatedSection : section
      );
      
      if (updatedSections.some(s => s.id === updatedSection.id)) {
        foundPage = true;
        return { ...page, sections: updatedSections };
      }
      
      return page;
    });
    
    if (foundPage) {
      const allSections = updatedPages.flatMap(page => page.sections);
      
      onChange({
        ...proposal,
        sections: allSections,
        updatedAt: new Date().toISOString()
      });
    }
  };
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(currentPageSections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    const newSections = items.map((item, index) => ({
      ...item,
      order: index
    }));
    
    const updatedPages = [...pages];
    updatedPages[effectivePageIndex] = { sections: newSections };
    
    const allSections = updatedPages.flatMap(page => page.sections);
    
    onChange({
      ...proposal,
      sections: allSections,
      updatedAt: new Date().toISOString()
    });
  };
  
  const addSection = (type: ProposalSection['type']) => {
    // Don't add sections to cover page
    if (useCoverPage && currentPage === 0) return;
    
    const newSection: ProposalSection = {
      id: uuidv4(),
      type,
      content: getDefaultContent(type),
      order: currentPageSections.length
    };
    
    const updatedPages = [...pages];
    if (!updatedPages[effectivePageIndex]) {
      updatedPages[effectivePageIndex] = { sections: [] };
    }
    updatedPages[effectivePageIndex] = { 
      sections: [...updatedPages[effectivePageIndex].sections, newSection] 
    };
    
    const allSections = updatedPages.flatMap(page => page.sections);
    
    onChange({
      ...proposal,
      sections: allSections,
      updatedAt: new Date().toISOString()
    });
  };
  
  const removeSection = (sectionId: string) => {
    // Don't remove sections from cover page
    if (useCoverPage && currentPage === 0) return;
    
    const updatedPages = [...pages];
    if (updatedPages[effectivePageIndex]) {
      const filteredSections = updatedPages[effectivePageIndex].sections.filter(
        section => section.id !== sectionId
      );
      
      updatedPages[effectivePageIndex] = { 
        sections: filteredSections.map((section, index) => ({
          ...section,
          order: index
        }))
      };
      
      const allSections = updatedPages.flatMap(page => page.sections);
      
      onChange({
        ...proposal,
        sections: allSections,
        updatedAt: new Date().toISOString()
      });
    }
  };
  
  const addNewPage = () => {
    const updatedPages = [...pages, { sections: [] }];
    
    const allSections = updatedPages.flatMap(page => page.sections);
    
    onChange({
      ...proposal,
      sections: allSections,
      updatedAt: new Date().toISOString()
    });
    
    setCurrentPage(useCoverPage ? updatedPages.length : updatedPages.length - 1);
  };
  
  const duplicatePage = () => {
    // Don't duplicate cover page
    if (useCoverPage && currentPage === 0) return;
    
    if (effectivePageIndex < 0 || effectivePageIndex >= pages.length) return;
    
    const duplicatedSections = pages[effectivePageIndex].sections.map(section => ({
      ...section,
      id: uuidv4()
    }));
    
    const updatedPages = [...pages];
    updatedPages.splice(effectivePageIndex + 1, 0, { sections: duplicatedSections });
    
    const allSections = updatedPages.flatMap(page => page.sections);
    
    onChange({
      ...proposal,
      sections: allSections,
      updatedAt: new Date().toISOString()
    });
    
    setCurrentPage(currentPage + 1);
  };
  
  const deletePage = () => {
    // Don't delete cover page
    if (useCoverPage && currentPage === 0) return;
    
    if (pages.length <= 1) {
      return;
    }
    
    const updatedPages = [...pages];
    updatedPages.splice(effectivePageIndex, 1);
    
    const allSections = updatedPages.flatMap(page => page.sections);
    
    onChange({
      ...proposal,
      sections: allSections,
      updatedAt: new Date().toISOString()
    });
    
    setCurrentPage(Math.max(useCoverPage ? 1 : 0, currentPage - 1));
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
    useCoverPage,
    effectivePageIndex,
    currentPageSections,
    handleSectionChange,
    handleDragEnd,
    addSection,
    removeSection,
    addNewPage,
    duplicatePage,
    deletePage
  };
};
