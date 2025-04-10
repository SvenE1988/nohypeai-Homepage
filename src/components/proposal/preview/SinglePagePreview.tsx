
import React from "react";
import { PageRenderer } from "./PageRenderer";
import { ProposalSection } from "../types";

interface SinglePagePreviewProps {
  sections: ProposalSection[];
  pageIndex: number;
  isCoverPage?: boolean;
  title?: string;
  clientName?: string;
}

export const SinglePagePreview: React.FC<SinglePagePreviewProps> = ({ 
  sections, 
  pageIndex,
  isCoverPage = false,
  title = "",
  clientName = ""
}) => {
  return (
    <div className="print:hidden flex justify-center">
      <div className="transform scale-65 origin-top my-4 shadow-lg rounded-sm hover:shadow-xl transition-shadow">
        <PageRenderer
          sections={sections}
          pageIndex={pageIndex}
          isCoverPage={isCoverPage}
          title={title}
          clientName={clientName}
        />
      </div>
    </div>
  );
};
