
import React, { useState, useEffect } from "react";
import { verifyLinksInDocument, checkForPlaceholderContent, checkForCommonTypos } from "@/utils/contentUtils";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, LinkIcon, Type, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContentVerifierProps {
  onClose: () => void;
}

const ContentVerifier = ({ onClose }: ContentVerifierProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [linkResults, setLinkResults] = useState<{ valid: boolean; invalidLinks: string[] }>({ valid: true, invalidLinks: [] });
  const [placeholderResults, setPlaceholderResults] = useState<string[]>([]);
  const [typoResults, setTypoResults] = useState<string[]>([]);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  useEffect(() => {
    verifyContent();
  }, []);

  const verifyContent = async () => {
    setIsVerifying(true);
    
    // Small delay to allow UI to update
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Verify links
    const links = verifyLinksInDocument();
    setLinkResults(links);
    
    // Check for placeholder content
    const placeholders = checkForPlaceholderContent();
    setPlaceholderResults(placeholders);
    
    // Check for common typos in page content
    const pageText = document.body.innerText;
    const typos = checkForCommonTypos(pageText, 'de');
    setTypoResults(typos);
    
    setIsVerifying(false);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50 max-w-md w-full bg-white dark:bg-black shadow-lg rounded-lg border border-gray-200 dark:border-gray-800"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Inhaltsüberprüfung</h3>
              <Button variant="ghost" size="sm" onClick={handleClose} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {isVerifying ? (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3">Überprüfe Inhalte...</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <LinkIcon className="h-5 w-5 text-blue-500" />
                    <h4 className="font-medium">Links</h4>
                    {linkResults.valid ? 
                      <CheckCircle className="h-4 w-4 text-green-500 ml-auto" /> : 
                      <AlertCircle className="h-4 w-4 text-red-500 ml-auto" />
                    }
                  </div>
                  
                  {linkResults.invalidLinks.length > 0 && (
                    <div className="ml-7 text-sm text-gray-600 dark:text-gray-400 space-y-1 max-h-32 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-2 rounded">
                      {linkResults.invalidLinks.map((link, i) => (
                        <div key={i} className="text-red-500">{link}</div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Type className="h-5 w-5 text-purple-500" />
                    <h4 className="font-medium">Platzhalterinhalt</h4>
                    {placeholderResults.length === 0 ? 
                      <CheckCircle className="h-4 w-4 text-green-500 ml-auto" /> : 
                      <AlertCircle className="h-4 w-4 text-red-500 ml-auto" />
                    }
                  </div>
                  
                  {placeholderResults.length > 0 && (
                    <div className="ml-7 text-sm text-gray-600 dark:text-gray-400 space-y-1 max-h-32 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-2 rounded">
                      {placeholderResults.map((placeholder, i) => (
                        <div key={i} className="text-amber-500">{placeholder}</div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <h4 className="font-medium">Schreibfehler/Tippfehler</h4>
                    {typoResults.length === 0 ? 
                      <CheckCircle className="h-4 w-4 text-green-500 ml-auto" /> : 
                      <AlertCircle className="h-4 w-4 text-red-500 ml-auto" />
                    }
                  </div>
                  
                  {typoResults.length > 0 && (
                    <div className="ml-7 text-sm text-gray-600 dark:text-gray-400 space-y-1 max-h-32 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-2 rounded">
                      {typoResults.map((typo, i) => (
                        <div key={i} className="text-orange-500">{typo}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={verifyContent}
                disabled={isVerifying}
              >
                Erneut prüfen
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleClose}
              >
                Schließen
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContentVerifier;
