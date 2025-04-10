
import React from "react";
import { Proposal, ProposalSection } from "./types";
import { 
  ResizablePanelGroup, 
  ResizablePanel, 
  ResizableHandle 
} from "@/components/ui/resizable";
import { PageTitle } from "./editor/PageTitle";
import { PageControls } from "./editor/PageControls";
import { EditorContent } from "./editor/EditorContent";
import { ContentPreview } from "./editor/ContentPreview";
import { usePageEditorLogic } from "./editor/usePageEditorLogic";

interface PageBasedEditorProps {
  proposal: Proposal;
  onChange: (proposal: Proposal) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pages: Array<{ sections: ProposalSection[] }>;
}

export const PageBasedEditor: React.FC<PageBasedEditorProps> = ({ 
  proposal, 
  onChange, 
  currentPage, 
  setCurrentPage,
  pages
}) => {
  const {
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
  } = usePageEditorLogic(proposal, onChange, currentPage, setCurrentPage, pages);
  
  return (
    <div className="space-y-4">
      {/* Document title and client name */}
      <PageTitle proposal={proposal} onChange={onChange} />
      
      {/* Page controls */}
      <PageControls 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        useCoverPage={useCoverPage}
        pagesCount={pages.length}
        duplicatePage={duplicatePage}
        deletePage={deletePage}
        addNewPage={addNewPage}
        currentPageSections={currentPageSections}
      />
      
      {/* Main content area with editor and preview */}
      <ResizablePanelGroup direction="horizontal" className="min-h-[550px]">
        <ResizablePanel defaultSize={50} minSize={35}>
          <EditorContent 
            proposal={proposal}
            useCoverPage={useCoverPage}
            currentPage={currentPage}
            currentPageSections={currentPageSections}
            handleDragEnd={handleDragEnd}
            removeSection={removeSection}
            handleSectionChange={handleSectionChange}
            addSection={addSection}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={50} minSize={35}>
          <ContentPreview 
            isCoverPage={useCoverPage && currentPage === 0}
            sections={currentPageSections}
            pageIndex={currentPage}
            title={proposal.title}
            clientName={proposal.clientName}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
