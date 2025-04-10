
import React from "react";
import { ContactInfo } from "../types";

interface ContactSectionContent {
  title: string;
  contact: ContactInfo;
}

interface ContactSectionEditorProps {
  content: ContactSectionContent;
  onChange: (content: ContactSectionContent) => void;
}

export const ContactSectionEditor: React.FC<ContactSectionEditorProps> = ({ content, onChange }) => {
  const updateContact = (updates: Partial<ContactInfo>) => {
    onChange({
      ...content,
      contact: {
        ...content.contact,
        ...updates
      }
    });
  };
  
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
      
      <div className="space-y-3 mt-3">
        <h4 className="text-sm font-medium text-gray-400">Kontaktdetails</h4>
        
        <div>
          <label className="block text-xs text-gray-500 mb-1">Name</label>
          <input
            type="text"
            value={content.contact.name}
            onChange={(e) => updateContact({ name: e.target.value })}
            className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-500 mb-1">Position</label>
          <input
            type="text"
            value={content.contact.position}
            onChange={(e) => updateContact({ position: e.target.value })}
            className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-500 mb-1">E-Mail</label>
          <input
            type="email"
            value={content.contact.email}
            onChange={(e) => updateContact({ email: e.target.value })}
            className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-500 mb-1">Telefon</label>
          <input
            type="text"
            value={content.contact.phone}
            onChange={(e) => updateContact({ phone: e.target.value })}
            className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
          />
        </div>
      </div>
    </div>
  );
};
