
import React from "react";
import { projectsData } from "../../projects/ProjectsData";

interface CaseStudySectionContent {
  caseStudyId: number;
}

interface CaseStudySectionProps {
  content: CaseStudySectionContent;
}

export const CaseStudySection: React.FC<CaseStudySectionProps> = ({ content }) => {
  const caseStudy = projectsData[content.caseStudyId];
  
  if (!caseStudy) {
    return <div className="text-red-500">Case Study nicht gefunden</div>;
  }
  
  return (
    <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-semibold text-secondary mb-1">{caseStudy.title}</h3>
          <p className="text-sm text-gray-500">{caseStudy.industry} | {caseStudy.year}</p>
        </div>
        {caseStudy.logoUrl && (
          <img 
            src={caseStudy.logoUrl} 
            alt={`${caseStudy.company} Logo`} 
            className="h-12" 
            style={{ 
              aspectRatio: caseStudy.logoAspectRatio || "auto", 
              objectFit: "contain" 
            }}
          />
        )}
      </div>
      
      <div className="mb-4">
        <h4 className="text-lg font-medium text-gray-700 mb-2">Übersicht</h4>
        <p className="text-gray-700">{caseStudy.overview}</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-2">Herausforderung</h4>
          <p className="text-sm text-gray-600">{caseStudy.challenge}</p>
        </div>
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-2">Lösung</h4>
          <p className="text-sm text-gray-600">{caseStudy.solution}</p>
        </div>
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-2">Ergebnis</h4>
          <p className="text-sm text-gray-600">{caseStudy.result}</p>
        </div>
      </div>
    </div>
  );
};
