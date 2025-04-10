
import React from "react";
import { ProposalSection } from "../types";
import { SectionList } from "./SectionList";
import { SectionAdder } from "./SectionAdder";
import { CoverPageInfo } from "./CoverPageInfo";

interface EditorContentProps {
  useCoverPage: boolean;
  currentPage: number;
  currentPageSections: ProposalSection[];
  handleDragEnd: (result: any) => void;
  removeSection: (id: string) => void;
  handleSectionChange: (section: ProposalSection) => void;
  addSection: (type: string) => void;
}

export const EditorContent: React.FC<EditorContentProps> = ({
  useCoverPage,
  currentPage,
  currentPageSections,
  handleDragEnd,
  removeSection,
  handleSectionChange,
  addSection
}) => {
  return (
    <div className="h-full overflow-y-auto pr-4">
      {useCoverPage && currentPage === 0 ? (
        <CoverPageInfo />
      ) : (
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
      )}
    </div>
  );
};
