
import React from "react";
import { PageRenderer } from "./PageRenderer";
import { ProposalSection } from "../types";

interface SinglePagePreviewProps {
  sections: ProposalSection[];
  pageIndex: number;
  isCoverPage?: boolean;
}

export const SinglePagePreview: React.FC<SinglePagePreviewProps> = ({ 
  sections, 
  pageIndex,
  isCoverPage = false
}) => {
  return (
    <div className="print:hidden flex justify-center">
      <div className="transform scale-65 origin-top my-4">
        <PageRenderer
          sections={sections}
          pageIndex={pageIndex}
          isCoverPage={isCoverPage}
        />
      </div>
    </div>
  );
};
