
import React from "react";

interface HeaderSectionContent {
  title: string;
  subtitle?: string;
  date?: string;
}

interface HeaderSectionProps {
  content: HeaderSectionContent;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ content }) => {
  return (
    <div className="mb-8 text-white">
      <h1 className="text-3xl font-bold mb-2 text-white">{content.title}</h1>
      {content.subtitle && (
        <h2 className="text-xl mb-1 text-white">{content.subtitle}</h2>
      )}
      {content.date && (
        <p className="text-sm text-gray-300">{content.date}</p>
      )}
    </div>
  );
};
