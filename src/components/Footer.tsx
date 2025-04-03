
import { useState } from "react";
import { Link } from "react-router-dom";
import LegalDialog from "./legal/LegalDialog";
import { useDialog } from "./providers/DialogProvider";
import { useCallToAction } from "@/hooks/useCallToAction";
import { Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [legalDialog, setLegalDialog] = useState<{
    isOpen: boolean;
    type: "impressum" | "datenschutz" | "agb";
  }>({
    isOpen: false,
    type: "impressum",
  });
  
  const { setContactDialogOpen } = useDialog();
  const { openContactForm } = useCallToAction();
  
  return (
    <footer className="bg-black/80 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Rechtliches */}
          <div>
            <h3 className="text-white font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setLegalDialog({ isOpen: true, type: "impressum" })}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Impressum
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalDialog({ isOpen: true, type: "datenschutz" })}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Datenschutzerklärung
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalDialog({ isOpen: true, type: "agb" })}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  AGB
                </button>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                E-Mail: info@nohype-ai.de
              </li>
              <li className="text-gray-400">
                Tel: +49 175 9481994
              </li>
              <li>
                <button
                  onClick={openContactForm}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Kontaktformular
                </button>
              </li>
            </ul>
          </div>

          {/* Service & Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-4">Service & Social Media</h3>
            <ul className="space-y-2">
              <li>
                <a href="#faq" className="text-gray-400 hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/svenerkens" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {currentYear} nohype-ai.de. Alle Rechte vorbehalten.</p>
        </div>
      </div>

      <LegalDialog
        isOpen={legalDialog.isOpen}
        onClose={() => setLegalDialog({ ...legalDialog, isOpen: false })}
        type={legalDialog.type}
      />
    </footer>
  );
};

export default Footer;
