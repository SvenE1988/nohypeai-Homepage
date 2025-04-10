
import React from "react";

interface HeaderSectionContent {
  title: string;
  subtitle: string;
  date: string;
}

interface HeaderSectionProps {
  content: HeaderSectionContent;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ content }) => {
  return (
    <div className="mb-8">
      <img 
        src="/lovable-uploads/4ffd568e-264d-468e-9e61-0e0df2de32c0.png" 
        alt="nohype Logo" 
        className="h-16 mb-16" 
        style={{ aspectRatio: "4.19/1", objectFit: "contain" }}
      />
      <h1 className="text-4xl font-bold text-primary mb-3">{content.title}</h1>
      <h2 className="text-2xl text-gray-600 mb-2">{content.subtitle}</h2>
      <p className="text-gray-500">{content.date}</p>
    </div>
  );
};
