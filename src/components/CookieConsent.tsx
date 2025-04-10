
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import LegalDialog from "./legal/LegalDialog";

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
}

const CookieConsent = () => {
  const [open, setOpen] = useState(false);
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true, // Immer aktiviert
    analytics: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setOpen(true);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(settings));
    setOpen(false);
  };

  const handleReject = () => {
    const minimalSettings = {
      necessary: true,
      analytics: false,
    };
    localStorage.setItem("cookieConsent", JSON.stringify(minimalSettings));
    setOpen(false);
  };

  const openPrivacyPolicy = () => {
    setPrivacyDialogOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="fixed bottom-0 left-0 right-0 mx-auto max-w-[500px] mb-4 p-6 bg-black/95 border border-white/20 shadow-xl backdrop-blur-lg rounded-xl">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl font-semibold text-white">Cookie-Einstellungen</DialogTitle>
            <DialogDescription className="text-gray-300 mt-2">
              Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. 
              Bitte wählen Sie aus, welche Cookies Sie akzeptieren möchten. Weitere Informationen finden Sie in unserer{" "}
              <button 
                onClick={openPrivacyPolicy} 
                className="text-primary underline hover:text-primary/80 focus:outline-none"
              >
                Datenschutzerklärung
              </button>.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1">
                <Label className="text-white font-medium">Notwendige Cookies</Label>
                <p className="text-sm text-gray-400 mt-1">
                  Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.
                </p>
              </div>
              <Switch
                checked={settings.necessary}
                disabled={true}
                className="data-[state=checked]:bg-primary"
              />
            </div>

            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1">
                <Label className="text-white font-medium">Analyse Cookies</Label>
                <p className="text-sm text-gray-400 mt-1">
                  Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren.
                </p>
              </div>
              <Switch
                checked={settings.analytics}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, analytics: checked }))}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>

          <div className="flex justify-between space-x-4 mt-6">
            <Button
              variant="outline"
              onClick={handleReject}
              className="bg-transparent text-white border-white/20 hover:bg-white/10"
            >
              Nur Notwendige
            </Button>
            <Button
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90"
            >
              Einstellungen speichern
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <LegalDialog 
        isOpen={privacyDialogOpen}
        onClose={() => setPrivacyDialogOpen(false)}
        type="datenschutz"
      />
    </>
  );
};

export default CookieConsent;
