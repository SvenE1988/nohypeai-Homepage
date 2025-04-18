
import { Proposal, ProposalSection } from "../types";
import { useSectionOperations } from "../hooks/useSectionOperations";
import { usePageOperations } from "../hooks/usePageOperations";

export const usePageEditorLogic = (
  proposal: Proposal,
  onChange: (proposal: Proposal) => void,
  currentPage: number,
  setCurrentPage: (page: number) => void,
  pages: Array<{ sections: ProposalSection[] }>
) => {
  const { useCoverPage = true } = proposal;
  const { handleSectionChange, addSection: createSection, removeSection: deleteSection } = useSectionOperations();
  const { duplicatePage: duplicatePageOp, deletePage: deletePageOp, addNewPage: addNewPageOp } = usePageOperations();
  
  // Account for cover page in current page index
  const effectivePageIndex = useCoverPage && currentPage > 0 ? currentPage - 1 : currentPage;
  const currentPageSections = effectivePageIndex >= 0 && effectivePageIndex < pages.length 
    ? pages[effectivePageIndex].sections 
    : [];
  
  const handleSectionChange = (updatedSection: ProposalSection) => {
    let updatedPages = [...pages];
    let foundPage = false;
    
    updatedPages = updatedPages.map(page => {
      const updatedSections = handleSectionChange(page.sections, updatedSection);
      
      if (updatedSections.some(s => s.id === updatedSection.id)) {
        foundPage = true;
        return { ...page, sections: updatedSections };
      }
      
      return page;
    });
    
    if (foundPage) {
      updateProposal(updatedPages);
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
    
    updateProposal(updatedPages);
  };
  
  const addSection = (type: ProposalSection['type']) => {
    if (useCoverPage && currentPage === 0) return;
    
    const newSection = createSection(currentPageSections, type);
    const updatedPages = [...pages];
    
    if (!updatedPages[effectivePageIndex]) {
      updatedPages[effectivePageIndex] = { sections: [] };
    }
    
    updatedPages[effectivePageIndex] = { 
      sections: [...updatedPages[effectivePageIndex].sections, newSection] 
    };
    
    updateProposal(updatedPages);
  };
  
  const removeSection = (sectionId: string) => {
    if (useCoverPage && currentPage === 0) return;
    
    const updatedPages = [...pages];
    if (updatedPages[effectivePageIndex]) {
      const filteredSections = deleteSection(updatedPages[effectivePageIndex].sections, sectionId);
      updatedPages[effectivePageIndex] = { sections: filteredSections };
      updateProposal(updatedPages);
    }
  };
  
  const addNewPage = () => {
    const updatedPages = addNewPageOp(pages);
    updateProposal(updatedPages);
    setCurrentPage(useCoverPage ? updatedPages.length : updatedPages.length - 1);
  };
  
  const duplicatePage = () => {
    if (useCoverPage && currentPage === 0) return;
    
    const updatedPages = duplicatePageOp(pages, effectivePageIndex);
    updateProposal(updatedPages);
    setCurrentPage(currentPage + 1);
  };
  
  const deletePage = () => {
    if (useCoverPage && currentPage === 0) return;
    
    const updatedPages = deletePageOp(pages, effectivePageIndex);
    updateProposal(updatedPages);
    setCurrentPage(Math.max(useCoverPage ? 1 : 0, currentPage - 1));
  };
  
  const updateProposal = (updatedPages: Array<{ sections: ProposalSection[] }>) => {
    const allSections = updatedPages.flatMap(page => page.sections);
    onChange({
      ...proposal,
      sections: allSections,
      updatedAt: new Date().toISOString()
    });
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
