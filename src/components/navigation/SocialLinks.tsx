
import React from "react";
import { Linkedin, Mail, LogIn } from "lucide-react";
import { useCallToAction } from "@/hooks/useCallToAction";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { UserProfile } from "@/components/auth/UserProfile";

export const SocialLinks = () => {
  const { openContactForm } = useCallToAction();
  const navigate = useNavigate();
  const { user } = useAuth();
  
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
      
      {user ? (
        <UserProfile />
      ) : (
        <Button 
          onClick={() => navigate("/auth")} 
          variant="ghost" 
          className="text-white hover:text-primary transition-colors p-0"
          size="icon"
        >
          <LogIn className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};
