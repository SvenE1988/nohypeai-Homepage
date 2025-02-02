import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const CookieConsent = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setOpen(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] bg-black/95 border border-white/10">
        <DialogHeader>
          <DialogTitle>Cookie-Einstellungen</DialogTitle>
          <DialogDescription className="text-gray-300">
            Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. 
            Einige davon sind notwendig für den Betrieb der Seite, während andere uns 
            helfen, die Website und Ihre Interaktion mit ihr zu verstehen.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-white">Notwendige Cookies</h4>
            <p className="text-sm text-gray-400">
              Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-white">Analyse Cookies</h4>
            <p className="text-sm text-gray-400">
              Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren.
            </p>
          </div>
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={handleReject}>
              Ablehnen
            </Button>
            <Button onClick={handleAccept}>
              Alle akzeptieren
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CookieConsent;