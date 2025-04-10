
import React from "react";

interface TextSectionContent {
  title?: string;
  text: string;
}

interface TextSectionProps {
  content: TextSectionContent;
}

export const TextSection: React.FC<TextSectionProps> = ({ content }) => {
  return (
    <div className="mb-6 text-white">
      {content.title && (
        <h2 className="text-xl font-semibold mb-3 text-white">{content.title}</h2>
      )}
      <div 
        className="text-base space-y-4 text-white"
        dangerouslySetInnerHTML={{ __html: content.text }}
      />
    </div>
  );
};
