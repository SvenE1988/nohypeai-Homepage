
import React, { forwardRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { getTemplateById } from "@/data/proposalData";

interface ProposalData {
  title: string;
  subtitle: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  introduction: string;
  problemStatement: string;
  solution: string;
  benefits: string;
  conclusion: string;
  callToAction: string;
}

interface PDFPreviewProps {
  proposalData: ProposalData;
  templateId: string;
}

const PDFPreview = forwardRef<HTMLDivElement, PDFPreviewProps>(
  ({ proposalData, templateId }, ref) => {
    const template = getTemplateById(templateId);

    if (!template) {
      return <div>Template nicht gefunden</div>;
    }

    return (
      <div className="bg-white text-black rounded-md overflow-hidden">
        <div 
          ref={ref} 
          className="w-full overflow-auto max-h-[800px] shadow-lg"
        >
          {/* Cover Page */}
          <div className="w-[210mm] min-h-[297mm] relative">
            <AspectRatio ratio={210/297} className="bg-white">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="absolute inset-0" 
                  style={{ 
                    backgroundImage: `url(${template.coverBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.1
                  }} 
                />
              </div>
              
              <div className="flex flex-col justify-between h-full p-[25mm]">
                {/* Header with logo */}
                <div className="w-full flex justify-between items-start">
                  <img 
                    src="/public/lovable-uploads/a9daac6a-208d-46dc-9aa0-db9287c1b2e8.png" 
                    alt="Company Logo" 
                    className="h-16 object-contain"
                  />
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Proposal</p>
                    <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                
                {/* Main title */}
                <div className="mx-auto text-center max-w-[140mm] my-8">
                  <h1 className="text-5xl font-bold mb-6 text-primary">{proposalData.title}</h1>
                  <p className="text-2xl text-gray-700">{proposalData.subtitle}</p>
                  <Separator className="my-8 bg-primary/20 h-0.5" />
                  <p className="text-xl">Präsentiert für:</p>
                  <p className="text-3xl font-bold mt-2">{proposalData.companyName}</p>
                </div>
                
                {/* Footer */}
                <div className="w-full grid grid-cols-3 gap-4 text-gray-600 text-sm mt-auto">
                  <div>
                    <p className="font-medium">Kontakt:</p>
                    <p>{proposalData.contactName}</p>
                  </div>
                  <div className="text-center">
                    <p>{proposalData.contactEmail}</p>
                  </div>
                  <div className="text-right">
                    <p>{proposalData.contactPhone}</p>
                  </div>
                </div>
              </div>
            </AspectRatio>
          </div>
          
          {/* Introduction Page */}
          <div className="w-[210mm] min-h-[297mm] relative">
            <AspectRatio ratio={210/297} className="bg-white">
              <div className="p-[25mm] flex flex-col">
                {/* Page header */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <img 
                      src="/public/lovable-uploads/a9daac6a-208d-46dc-9aa0-db9287c1b2e8.png" 
                      alt="Company Logo" 
                      className="h-12 object-contain"
                    />
                  </div>
                  <div className="text-right text-gray-500 text-sm">
                    <p>Seite 2</p>
                  </div>
                </div>
                
                {/* Page content */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-8 text-primary">Einführung</h2>
                  
                  <div className="space-y-4 text-gray-800">
                    <p className="text-lg whitespace-pre-line">{proposalData.introduction}</p>
                  </div>
                  
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 text-primary">Die Herausforderung</h2>
                    <div className="space-y-4 text-gray-800">
                      <p className="text-lg whitespace-pre-line">{proposalData.problemStatement}</p>
                    </div>
                  </div>
                </div>
                
                {/* Page footer */}
                <div className="mt-auto pt-8 border-t border-gray-200 text-gray-500 text-sm flex justify-between">
                  <p>{proposalData.companyName} - Proposal</p>
                  <p>Vertraulich</p>
                </div>
              </div>
            </AspectRatio>
          </div>
          
          {/* Solution Page */}
          <div className="w-[210mm] min-h-[297mm] relative">
            <AspectRatio ratio={210/297} className="bg-white">
              <div className="p-[25mm] flex flex-col">
                {/* Page header */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <img 
                      src="/public/lovable-uploads/a9daac6a-208d-46dc-9aa0-db9287c1b2e8.png" 
                      alt="Company Logo" 
                      className="h-12 object-contain"
                    />
                  </div>
                  <div className="text-right text-gray-500 text-sm">
                    <p>Seite 3</p>
                  </div>
                </div>
                
                {/* Page content */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-8 text-primary">Unsere Lösung</h2>
                  
                  <div className="space-y-4 text-gray-800">
                    <p className="text-lg whitespace-pre-line">{proposalData.solution}</p>
                  </div>
                  
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 text-primary">Vorteile</h2>
                    <div className="space-y-4 text-gray-800">
                      <p className="text-lg whitespace-pre-line">{proposalData.benefits}</p>
                    </div>
                  </div>
                </div>
                
                {/* Page footer */}
                <div className="mt-auto pt-8 border-t border-gray-200 text-gray-500 text-sm flex justify-between">
                  <p>{proposalData.companyName} - Proposal</p>
                  <p>Vertraulich</p>
                </div>
              </div>
            </AspectRatio>
          </div>
          
          {/* Conclusion Page */}
          <div className="w-[210mm] min-h-[297mm] relative">
            <AspectRatio ratio={210/297} className="bg-white">
              <div className="p-[25mm] flex flex-col">
                {/* Page header */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <img 
                      src="/public/lovable-uploads/a9daac6a-208d-46dc-9aa0-db9287c1b2e8.png" 
                      alt="Company Logo" 
                      className="h-12 object-contain"
                    />
                  </div>
                  <div className="text-right text-gray-500 text-sm">
                    <p>Seite 4</p>
                  </div>
                </div>
                
                {/* Page content */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-8 text-primary">Fazit</h2>
                  
                  <div className="space-y-4 text-gray-800">
                    <p className="text-lg whitespace-pre-line">{proposalData.conclusion}</p>
                  </div>
                  
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 text-primary">Nächste Schritte</h2>
                    <div className="space-y-4 text-gray-800">
                      <p className="text-lg whitespace-pre-line">{proposalData.callToAction}</p>
                    </div>
                  </div>
                </div>
                
                {/* Page footer */}
                <div className="mt-auto pt-8 border-t border-gray-200 text-gray-500 text-sm flex justify-between">
                  <p>{proposalData.companyName} - Proposal</p>
                  <p>Vertraulich</p>
                </div>
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>
    );
  }
);

PDFPreview.displayName = "PDFPreview";

export default PDFPreview;
