
import React from "react";

interface HeaderSectionContent {
  title: string;
  subtitle: string;
  date: string;
}

interface HeaderSectionEditorProps {
  content: HeaderSectionContent;
  onChange: (content: HeaderSectionContent) => void;
}

export const HeaderSectionEditor: React.FC<HeaderSectionEditorProps> = ({ content, onChange }) => {
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
        <label className="block text-sm font-medium text-gray-400 mb-1">Untertitel</label>
        <input
          type="text"
          value={content.subtitle}
          onChange={(e) => onChange({ ...content, subtitle: e.target.value })}
          className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Datum</label>
        <input
          type="text"
          value={content.date}
          onChange={(e) => onChange({ ...content, date: e.target.value })}
          className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
        />
      </div>
    </div>
  );
};
