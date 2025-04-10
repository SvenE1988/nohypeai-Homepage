
import React, { useState } from "react";
import { Proposal, SavedBrochure } from "./types";
import { ProposalPreview } from "./ProposalPreview";
import { ProposalTemplates } from "./ProposalTemplates";
import { SavedBrochuresView } from "./SavedBrochuresView";
import { usePaginatedContent } from "../../hooks/usePaginatedContent";
import { PageBasedEditor } from "./PageBasedEditor";

interface ProposalContentProps {
  activeTab: string;
  proposal: Proposal;
  savedBrochures: SavedBrochure[];
  isLoading: boolean;
  onProposalChange: (proposal: Proposal) => void;
  onTemplateSelect: (template: any) => void;
  onLoadBrochure: (brochure: SavedBrochure) => void;
  isGeneratingPDF?: boolean;
  setIsGeneratingPDF?: (isGenerating: boolean) => void;
}

export const ProposalContent: React.FC<ProposalContentProps> = ({
  activeTab,
  proposal,
  savedBrochures,
  isLoading,
  onProposalChange,
  onTemplateSelect,
  onLoadBrochure,
  isGeneratingPDF = false,
  setIsGeneratingPDF
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Use the paginatedContent hook to split sections into pages
  const { pages, useCoverPage } = usePaginatedContent(
    proposal.sections.sort((a, b) => a.order - b.order)
  );
  
  // When useCoverPage changes in the proposal, update the hook state
  React.useEffect(() => {
    if (typeof proposal.useCoverPage !== 'undefined') {
      if (useCoverPage !== proposal.useCoverPage) {
        // This would call back to the hook to update its state
        // But we're not directly updating it to avoid circular dependencies
      }
    }
  }, [proposal.useCoverPage, useCoverPage]);
  
  // Render editor content
  const renderEditorContent = () => {
    return (
      <div className="space-y-6">
        <div className="min-h-[600px] rounded-lg border border-white/10 p-4 bg-black/30">
          <PageBasedEditor
            proposal={proposal}
            onChange={onProposalChange}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={pages}
          />
        </div>
      </div>
    );
  };
  
  // Render content based on active tab
  switch (activeTab) {
    case "templates":
      return <ProposalTemplates onSelect={onTemplateSelect} />;
    case "saved":
      return (
        <SavedBrochuresView 
          savedBrochures={savedBrochures}
          isLoading={isLoading}
          onLoadBrochure={onLoadBrochure}
        />
      );
    case "editor":
      return renderEditorContent();
    case "preview":
      return (
        <ProposalPreview 
          proposal={proposal} 
          className="bg-black/30 p-6 rounded-lg border border-white/10"
          isGeneratingPDF={isGeneratingPDF}
          setIsGeneratingPDF={setIsGeneratingPDF}
        />
      );
    default:
      return null;
  }
};
