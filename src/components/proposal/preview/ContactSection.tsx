
import React from "react";
import { ContactInfo } from "../types";

interface ContactSectionContent {
  title: string;
  contact: ContactInfo;
}

interface ContactSectionProps {
  content: ContactSectionContent;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ content }) => {
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold text-secondary mb-4">{content.title}</h3>
      
      <div className="flex items-start gap-6 border-t border-gray-200 pt-4">
        <div className="flex-none w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-3xl text-secondary font-semibold">
            {content.contact.name.split(' ').map(name => name[0]).join('')}
          </span>
        </div>
        
        <div>
          <h4 className="text-xl font-semibold text-gray-800 mb-1">{content.contact.name}</h4>
          <p className="text-gray-600 mb-3">{content.contact.position}</p>
          
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">E-Mail:</span> {content.contact.email}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Telefon:</span> {content.contact.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
