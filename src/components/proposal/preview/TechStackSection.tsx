
import React from "react";
import { TechStackData } from "@/hooks/useWebsiteContent";

interface TechStackSectionContent {
  title?: string;
  techStack: TechStackData;
  showDescription?: boolean;
}

interface TechStackSectionProps {
  content: TechStackSectionContent;
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({ content }) => {
  const { title = "Unser Tech Stack", techStack, showDescription = true } = content;
  
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold text-secondary mb-4">{title}</h3>
      
      {showDescription && (
        <p className="text-gray-700 mb-4">{techStack.description}</p>
      )}
      
      <div className="grid grid-cols-2 gap-3">
        {techStack.categories.map((category, index) => (
          <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50">
            <span className="text-gray-700">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
