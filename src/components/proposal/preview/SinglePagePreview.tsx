
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
      <div className="transform scale-75 origin-top my-4 shadow-lg rounded-sm">
        <PageRenderer
          sections={sections}
          pageIndex={pageIndex}
          isCoverPage={isCoverPage}
        />
      </div>
    </div>
  );
};
