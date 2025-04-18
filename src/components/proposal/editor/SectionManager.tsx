
import React from "react";
import { ProposalSection } from "../types";
import { SectionList } from "./SectionList";

interface SectionManagerProps {
  sections: ProposalSection[];
  onDragEnd: (result: any) => void;
  onSectionChange: (section: ProposalSection) => void;
  onSectionRemove: (id: string) => void;
}

export const SectionManager: React.FC<SectionManagerProps> = ({
  sections,
  onDragEnd,
  onSectionChange,
  onSectionRemove
}) => {
  // Use the SectionList component to avoid code duplication
  return (
    <SectionList
      sections={sections}
      handleDragEnd={onDragEnd}
      removeSection={onSectionRemove}
      onChange={onSectionChange}
    />
  );
};
