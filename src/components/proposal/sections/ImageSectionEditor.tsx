
import React from "react";

interface ImageSectionContent {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageSectionEditorProps {
  content: ImageSectionContent;
  onChange: (content: ImageSectionContent) => void;
}

export const ImageSectionEditor: React.FC<ImageSectionEditorProps> = ({ content, onChange }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Bild URL</label>
        <input
          type="text"
          value={content.src}
          onChange={(e) => onChange({ ...content, src: e.target.value })}
          className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
          placeholder="https://example.com/image.jpg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Alternativtext</label>
        <input
          type="text"
          value={content.alt}
          onChange={(e) => onChange({ ...content, alt: e.target.value })}
          className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
          placeholder="Beschreibung des Bildes"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Bildunterschrift (optional)</label>
        <input
          type="text"
          value={content.caption || ''}
          onChange={(e) => onChange({ ...content, caption: e.target.value })}
          className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
          placeholder="Bildunterschrift"
        />
      </div>
      {content.src && (
        <div className="mt-3 p-2 bg-black/50 rounded border border-white/10">
          <p className="text-sm text-gray-400 mb-2">Vorschau:</p>
          <img 
            src={content.src} 
            alt={content.alt} 
            className="max-h-40 mx-auto object-contain"
          />
        </div>
      )}
    </div>
  );
};
