
import React from "react";
import { PageRenderer } from "./PageRenderer";
import { ProposalSection } from "../types";

interface PrintPreviewProps {
  pages: Array<{ sections: ProposalSection[] }>;
  useCoverPage?: boolean;
  useTableOfContents?: boolean;
  allSections?: ProposalSection[];
  title?: string;
  clientName?: string;
  documentType?: 'proposal' | 'brochure';
}

export const PrintPreview: React.FC<PrintPreviewProps> = ({ 
  pages, 
  useCoverPage = false,
  useTableOfContents = false,
  allSections = [],
  title = "",
  clientName = "",
  documentType = "proposal"
}) => {
  return (
    <div className="print:block hidden">
      {/* Render cover page if enabled */}
      {useCoverPage && (
        <div className="mb-0 page-break-after pdf-page">
          <PageRenderer
            key="cover-page"
            sections={[]}
            pageIndex={0}
            isCoverPage={true}
            title={title}
            clientName={clientName}
            documentType={documentType}
          />
        </div>
      )}
      
      {/* Render table of contents if enabled */}
      {useTableOfContents && (
        <div className="mb-0 page-break-after pdf-page">
          <PageRenderer
            key="table-of-contents"
            sections={[]}
            pageIndex={useCoverPage ? 1 : 0}
            isTableOfContents={true}
            allSections={allSections}
            title={title}
            clientName={clientName}
            documentType={documentType}
          />
        </div>
      )}
      
      {/* Render regular pages */}
      {pages.map((page, pageIndex) => (
        <div 
          key={`page-${pageIndex}`} 
          className={pageIndex < pages.length - 1 ? "page-break-after pdf-page" : "pdf-page"}
        >
          <PageRenderer
            sections={page.sections}
            pageIndex={getAdjustedPageIndex(pageIndex, useCoverPage, useTableOfContents)}
            title={title}
            clientName={clientName}
            documentType={documentType}
          />
        </div>
      ))}
    </div>
  );
};

// Helper function to calculate page index with cover page and table of contents
function getAdjustedPageIndex(pageIndex: number, useCoverPage: boolean, useTableOfContents: boolean): number {
  let adjustment = 0;
  if (useCoverPage) adjustment += 1;
  if (useTableOfContents) adjustment += 1;
  return pageIndex + adjustment;
}
