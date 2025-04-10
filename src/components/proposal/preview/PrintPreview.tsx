
import React from "react";
import { PageRenderer } from "./PageRenderer";
import { ProposalSection } from "../types";

interface PrintPreviewProps {
  pages: Array<{ sections: ProposalSection[] }>;
  useCoverPage?: boolean;
  showPageNumbers?: boolean;
  showFooter?: boolean;
}

export const PrintPreview: React.FC<PrintPreviewProps> = ({ 
  pages, 
  useCoverPage = false,
  showPageNumbers = true,
  showFooter = true
}) => {
  return (
    <div className="print:block hidden">
      {/* Render cover page if enabled */}
      {useCoverPage && (
        <PageRenderer
          key="cover-page"
          sections={[]}
          pageIndex={0}
          isCoverPage={true}
          showPageNumbers={showPageNumbers}
          showFooter={showFooter}
        />
      )}
      
      {/* Render regular pages */}
      {pages.map((page, pageIndex) => (
        <PageRenderer
          key={`page-${pageIndex}`}
          sections={page.sections}
          pageIndex={useCoverPage ? pageIndex + 1 : pageIndex}
          showPageNumbers={showPageNumbers}
          showFooter={showFooter}
        />
      ))}
    </div>
  );
};
