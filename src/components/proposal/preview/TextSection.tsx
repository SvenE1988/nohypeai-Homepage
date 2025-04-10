
import React from "react";

interface TextSectionContent {
  title: string;
  text: string;
}

interface TextSectionProps {
  content: TextSectionContent;
}

export const TextSection: React.FC<TextSectionProps> = ({ content }) => {
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold text-primary mb-3">{content.title}</h3>
      <div className="whitespace-pre-line text-white/90">{content.text}</div>
    </div>
  );
};
