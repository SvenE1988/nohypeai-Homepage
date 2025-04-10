
import React from "react";
import { TechStackData } from "@/hooks/useWebsiteContent";
import { Bot, Cpu, MessageSquare, Mic2 } from "lucide-react";

interface TechStackSectionContent {
  title?: string;
  techStack: TechStackData;
  showDescription?: boolean;
}

interface TechStackSectionProps {
  content: TechStackSectionContent;
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Bot':
      return <Bot className="w-4 h-4 mr-2" />;
    case 'Cpu':
      return <Cpu className="w-4 h-4 mr-2" />;
    case 'Mic2':
      return <Mic2 className="w-4 h-4 mr-2" />;
    case 'MessageSquare':
      return <MessageSquare className="w-4 h-4 mr-2" />;
    default:
      return null;
  }
};

export const TechStackSection: React.FC<TechStackSectionProps> = ({ content }) => {
  const { title = "Unser Tech Stack", techStack, showDescription = true } = content;
  
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold text-secondary mb-4">{title}</h3>
      
      {showDescription && techStack?.description && (
        <p className="text-gray-700 mb-4">{techStack.description}</p>
      )}
      
      <div className="grid grid-cols-2 gap-3">
        {techStack?.categories?.map((category, index) => (
          <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50">
            {category.icon && getIconComponent(category.icon)}
            <span className="text-gray-700">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
