
import React from "react";
import { Proposal, ProposalSection } from "../types";
import { SectionList } from "./SectionList";
import { SectionAdder } from "./SectionAdder";
import { CoverPageInfo } from "./CoverPageInfo";

interface EditorContentProps {
  proposal: Proposal;
  useCoverPage: boolean;
  currentPage: number;
  currentPageSections: ProposalSection[];
  handleDragEnd: (result: any) => void;
  removeSection: (id: string) => void;
  handleSectionChange: (section: ProposalSection) => void;
  addSection: (type: string) => void;
}

export const EditorContent: React.FC<EditorContentProps> = ({
  proposal,
  useCoverPage,
  currentPage,
  currentPageSections,
  handleDragEnd,
  removeSection,
  handleSectionChange,
  addSection
}) => {
  // Render cover page or regular content based on conditions
  const renderContent = () => {
    if (useCoverPage && currentPage === 0) {
      return <CoverPageInfo proposal={proposal} />;
    }
    
    return (
      <>
        <SectionList 
          sections={currentPageSections} 
          handleDragEnd={handleDragEnd}
          removeSection={removeSection}
          onChange={handleSectionChange}
        />
        
        {/* Section adder */}
        <SectionAdder addSection={addSection} />
      </>
    );
  };

  return (
    <div className="h-full overflow-y-auto pr-3">
      {renderContent()}
    </div>
  );
};
