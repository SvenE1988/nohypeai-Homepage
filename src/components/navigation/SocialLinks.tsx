
import React from "react";
import { Linkedin, Mail } from "lucide-react";
import { useCallToAction } from "@/hooks/useCallToAction";

export const SocialLinks = () => {
  const { openContactForm } = useCallToAction();
  
  return (
    <div className="absolute top-4 right-4 flex items-center space-x-4 md:space-x-6 z-50">
      <a
        href="https://www.linkedin.com/in/svenerkens"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-primary transition-colors"
      >
        <Linkedin className="w-5 h-5" />
      </a>
      <a
        onClick={openContactForm}
        className="text-white hover:text-primary transition-colors cursor-pointer"
      >
        <Mail className="w-5 h-5" />
      </a>
    </div>
  );
};
