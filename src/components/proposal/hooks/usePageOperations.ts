
import { v4 as uuidv4 } from "uuid";
import { Proposal, ProposalSection } from "../types";

export const usePageOperations = () => {
  const duplicatePage = (
    pages: Array<{ sections: ProposalSection[] }>,
    effectivePageIndex: number
  ) => {
    if (effectivePageIndex < 0 || effectivePageIndex >= pages.length) return pages;
    
    const duplicatedSections = pages[effectivePageIndex].sections.map(section => ({
      ...section,
      id: uuidv4()
    }));
    
    const updatedPages = [...pages];
    updatedPages.splice(effectivePageIndex + 1, 0, { sections: duplicatedSections });
    
    return updatedPages;
  };

  const deletePage = (
    pages: Array<{ sections: ProposalSection[] }>,
    effectivePageIndex: number
  ) => {
    if (pages.length <= 1) return pages;
    
    const updatedPages = [...pages];
    updatedPages.splice(effectivePageIndex, 1);
    
    return updatedPages;
  };

  const addNewPage = (pages: Array<{ sections: ProposalSection[] }>) => {
    return [...pages, { sections: [] }];
  };

  return {
    duplicatePage,
    deletePage,
    addNewPage
  };
};
