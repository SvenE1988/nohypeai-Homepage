
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

interface CalendarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CalendarDialog = ({ open, onOpenChange }: CalendarDialogProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Cal.com script dynamisch laden, wenn der Dialog geöffnet wird
    if (open && !isLoaded) {
      const script = document.createElement("script");
      script.src = "https://cal.com/embed.js";
      script.async = true;
      script.onload = () => setIsLoaded(true);
      document.body.appendChild(script);

      return () => {
        // Script entfernen, wenn die Komponente unmounted wird
        document.body.removeChild(script);
      };
    }
  }, [open, isLoaded]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] h-[80vh] max-h-[700px] bg-black/95 border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl">Sparpotenzial berechnen</DialogTitle>
        </DialogHeader>
        
        <div className="h-full">
          {/* Cal.com Embed */}
          <div
            data-cal-embed="your-username/beratung"
            data-cal-theme="dark"
            style={{ width: '100%', height: '100%', minHeight: '500px' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDialog;
