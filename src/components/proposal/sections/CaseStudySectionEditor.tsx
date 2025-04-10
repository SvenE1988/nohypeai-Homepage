
import React from "react";
import { projectsData } from "../../projects/ProjectsData";
import { Project } from "../../projects/types";

interface CaseStudySectionContent {
  caseStudyId: number;
}

interface CaseStudySectionEditorProps {
  content: CaseStudySectionContent;
  onChange: (content: CaseStudySectionContent) => void;
}

export const CaseStudySectionEditor: React.FC<CaseStudySectionEditorProps> = ({ content, onChange }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Wähle Case Study</label>
        <select
          value={content.caseStudyId}
          onChange={(e) => onChange({ caseStudyId: parseInt(e.target.value) })}
          className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
        >
          {projectsData.map((project: Project, index: number) => (
            <option key={index} value={index}>
              {project.title} ({project.company})
            </option>
          ))}
        </select>
      </div>
      
      {projectsData[content.caseStudyId] && (
        <div className="mt-3 p-3 bg-black/50 rounded border border-white/10">
          <p className="text-sm text-gray-400 mb-1">Vorschau:</p>
          <h4 className="text-white font-medium">{projectsData[content.caseStudyId].title}</h4>
          <p className="text-sm text-gray-300 mt-1">{projectsData[content.caseStudyId].overview}</p>
        </div>
      )}
    </div>
  );
};
