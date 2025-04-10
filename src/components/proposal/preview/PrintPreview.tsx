
import React from "react";
import { PageRenderer } from "./PageRenderer";
import { ProposalSection } from "../types";

interface PrintPreviewProps {
  pages: Array<{ sections: ProposalSection[] }>;
}

export const PrintPreview: React.FC<PrintPreviewProps> = ({ pages }) => {
  return (
    <div className="print:block hidden">
      {pages.map((page, pageIndex) => (
        <PageRenderer
          key={`page-${pageIndex}`}
          sections={page.sections}
          pageIndex={pageIndex}
        />
      ))}
    </div>
  );
};
