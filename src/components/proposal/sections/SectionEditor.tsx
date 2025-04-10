
import React from "react";
import { ProposalSection } from "../types";
import { HeaderSectionEditor } from "./HeaderSectionEditor";
import { TextSectionEditor } from "./TextSectionEditor";
import { ImageSectionEditor } from "./ImageSectionEditor";
import { CaseStudySectionEditor } from "./CaseStudySectionEditor";
import { PricingSectionEditor } from "./PricingSectionEditor";
import { ContactSectionEditor } from "./ContactSectionEditor";
import { TestimonialSectionEditor } from "./TestimonialSectionEditor";
import { TechStackSectionEditor } from "./TechStackSectionEditor";
import { SavingsSectionEditor } from "./SavingsSectionEditor";

interface SectionEditorProps {
  section: ProposalSection;
  onChange: (section: ProposalSection) => void;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({ section, onChange }) => {
  const handleContentChange = (content: any) => {
    onChange({
      ...section,
      content,
    });
  };

  switch (section.type) {
    case "header":
      return <HeaderSectionEditor content={section.content} onChange={handleContentChange} />;
    case "text":
      return <TextSectionEditor content={section.content} onChange={handleContentChange} />;
    case "image":
      return <ImageSectionEditor content={section.content} onChange={handleContentChange} />;
    case "caseStudy":
      return <CaseStudySectionEditor content={section.content} onChange={handleContentChange} />;
    case "pricing":
      return <PricingSectionEditor content={section.content} onChange={handleContentChange} />;
    case "contact":
      return <ContactSectionEditor content={section.content} onChange={handleContentChange} />;
    case "testimonial":
      return <TestimonialSectionEditor content={section.content} onChange={handleContentChange} />;
    case "techStack":
      return <TechStackSectionEditor content={section.content} onChange={handleContentChange} />;
    case "savings":
      return <SavingsSectionEditor content={section.content} onChange={handleContentChange} />;
    default:
      return <div className="text-red-500">Unknown section type: {section.type}</div>;
  }
};
