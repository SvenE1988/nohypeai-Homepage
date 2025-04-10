
import React from "react";
interface HeaderSectionContent {
  title: string;
  subtitle: string;
  date: string;
}
interface HeaderSectionProps {
  content: HeaderSectionContent;
}
export const HeaderSection: React.FC<HeaderSectionProps> = ({
  content
}) => {
  return <div className="mb-8">
      <h1 className="text-4xl font-bold text-primary mb-3">{content.title}</h1>
      <h2 className="text-2xl text-gray-300 mb-2">{content.subtitle}</h2>
      <p className="text-gray-400">{content.date}</p>
    </div>;
};
