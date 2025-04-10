
import React from "react";
import { PageRenderer } from "../preview/PageRenderer";
import { ProposalSection } from "../types";

interface ContentPreviewProps {
  isCoverPage: boolean;
  sections: ProposalSection[];
  pageIndex: number;
  scale?: number;
  title?: string;
  clientName?: string;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({ 
  isCoverPage, 
  sections, 
  pageIndex, 
  scale = 0.8,
  title = "",
  clientName = ""
}) => {
  return (
    <div className="h-full overflow-y-auto bg-black/30 p-4 rounded-lg border border-white/10">
      {isCoverPage ? (
        <PageRenderer 
          sections={[]} 
          pageIndex={0}
          scale={scale}
          isCoverPage={true}
          title={title}
          clientName={clientName}
        />
      ) : (
        <PageRenderer 
          sections={sections} 
          pageIndex={pageIndex}
          scale={scale}
          title={title}
          clientName={clientName}
        />
      )}
    </div>
  );
};
