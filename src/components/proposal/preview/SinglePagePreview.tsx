
import React from "react";
import { PageRenderer } from "./PageRenderer";
import { ProposalSection } from "../types";

interface SinglePagePreviewProps {
  sections: ProposalSection[];
  pageIndex: number;
  isCoverPage?: boolean;
  isTableOfContents?: boolean;
  allSections?: ProposalSection[];
  title?: string;
  clientName?: string;
  documentType?: 'proposal' | 'brochure';
}

export const SinglePagePreview: React.FC<SinglePagePreviewProps> = ({ 
  sections, 
  pageIndex,
  isCoverPage = false,
  isTableOfContents = false,
  allSections = [],
  title = "",
  clientName = "",
  documentType = "proposal"
}) => {
  return (
    <div className="print:hidden flex justify-center">
      <div className="transform scale-65 origin-top my-4 shadow-lg rounded-sm hover:shadow-xl transition-shadow print-bg-preserve">
        <PageRenderer
          sections={sections}
          pageIndex={pageIndex}
          isCoverPage={isCoverPage}
          isTableOfContents={isTableOfContents}
          allSections={allSections}
          title={title}
          clientName={clientName}
          documentType={documentType}
        />
      </div>
    </div>
  );
};
