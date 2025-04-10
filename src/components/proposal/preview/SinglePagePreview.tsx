
import React from "react";
import { PageRenderer } from "./PageRenderer";
import { ProposalSection } from "../types";

interface SinglePagePreviewProps {
  sections: ProposalSection[];
  pageIndex: number;
}

export const SinglePagePreview: React.FC<SinglePagePreviewProps> = ({ 
  sections, 
  pageIndex 
}) => {
  return (
    <div className="print:hidden">
      <PageRenderer
        sections={sections}
        pageIndex={pageIndex}
      />
    </div>
  );
};
