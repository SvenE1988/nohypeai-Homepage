
import React from "react";

interface TextSectionContent {
  title: string;
  text: string;
}

interface TextSectionEditorProps {
  content: TextSectionContent;
  onChange: (content: TextSectionContent) => void;
}

export const TextSectionEditor: React.FC<TextSectionEditorProps> = ({ content, onChange }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Titel</label>
        <input
          type="text"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Text</label>
        <textarea
          value={content.text}
          onChange={(e) => onChange({ ...content, text: e.target.value })}
          className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white min-h-[120px]"
        />
      </div>
    </div>
  );
};
