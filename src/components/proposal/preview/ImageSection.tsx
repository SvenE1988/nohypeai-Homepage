
import React from "react";

interface ImageSectionContent {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageSectionProps {
  content: ImageSectionContent;
}

export const ImageSection: React.FC<ImageSectionProps> = ({ content }) => {
  return (
    <div className="mb-6">
      <div className="border border-gray-200 rounded overflow-hidden">
        <img
          src={content.src}
          alt={content.alt}
          className="max-w-full mx-auto"
          style={{ maxHeight: "300px", objectFit: "contain" }}
        />
      </div>
      {content.caption && (
        <p className="text-sm text-gray-500 mt-2 text-center">{content.caption}</p>
      )}
    </div>
  );
};
