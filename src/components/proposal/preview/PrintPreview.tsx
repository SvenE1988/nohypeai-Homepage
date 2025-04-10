
import React from "react";
import { PageRenderer } from "./PageRenderer";
import { ProposalSection } from "../types";

interface PrintPreviewProps {
  pages: Array<{ sections: ProposalSection[] }>;
  useCoverPage?: boolean;
}

export const PrintPreview: React.FC<PrintPreviewProps> = ({ pages, useCoverPage = false }) => {
  return (
    <div className="print:block hidden">
      {/* Render cover page if enabled */}
      {useCoverPage && (
        <div className="mb-0 page-break-after">
          <PageRenderer
            key="cover-page"
            sections={[]}
            pageIndex={0}
            isCoverPage={true}
          />
        </div>
      )}
      
      {/* Render regular pages */}
      {pages.map((page, pageIndex) => (
        <div key={`page-${pageIndex}`} className={pageIndex < pages.length - 1 ? "page-break-after" : ""}>
          <PageRenderer
            sections={page.sections}
            pageIndex={useCoverPage ? pageIndex + 1 : pageIndex}
          />
        </div>
      ))}
    </div>
  );
};
