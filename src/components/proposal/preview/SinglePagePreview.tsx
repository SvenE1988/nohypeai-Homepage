
import React from "react";
import { PageRenderer } from "./PageRenderer";
import { ProposalSection } from "../types";

interface SinglePagePreviewProps {
  sections: ProposalSection[];
  pageIndex: number;
  isCoverPage?: boolean;
  showPageNumbers?: boolean;
  showFooter?: boolean;
}

export const SinglePagePreview: React.FC<SinglePagePreviewProps> = ({ 
  sections, 
  pageIndex,
  isCoverPage = false,
  showPageNumbers = true,
  showFooter = true
}) => {
  return (
    <div className="print:hidden">
      <PageRenderer
        sections={sections}
        pageIndex={pageIndex}
        isCoverPage={isCoverPage}
        showPageNumbers={showPageNumbers}
        showFooter={showFooter}
      />
    </div>
  );
};
