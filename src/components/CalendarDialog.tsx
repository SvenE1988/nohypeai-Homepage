
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { X } from "lucide-react";

interface CalendarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CalendarDialog = ({ open, onOpenChange }: CalendarDialogProps) => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Cal.com Script laden, wenn der Dialog geöffnet wird
    if (open) {
      // Prüfen ob Cal bereits definiert ist
      if (!(window as any).Cal) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = `
          (function (C, A, L) { 
            let p = function (a, ar) { a.q.push(ar); }; 
            let d = C.document; 
            C.Cal = C.Cal || function () { 
              let cal = C.Cal; 
              let ar = arguments; 
              if (!cal.loaded) { 
                cal.ns = {}; 
                cal.q = cal.q || []; 
                d.head.appendChild(d.createElement("script")).src = A; 
                cal.loaded = true; 
              } 
              if (ar[0] === L) { 
                const api = function () { p(api, arguments); }; 
                const namespace = ar[1]; 
                api.q = api.q || []; 
                if(typeof namespace === "string"){
                  cal.ns[namespace] = cal.ns[namespace] || api;
                  p(cal.ns[namespace], ar);
                  p(cal, ["initNamespace", namespace]);
                } else p(cal, ar); 
                return;
              } 
              p(cal, ar); 
            }; 
          })(window, "https://app.cal.com/embed/embed.js", "init");
          Cal("init", "erstanalyse", {origin:"https://cal.com"});
        `;
        document.body.appendChild(script);
      }

      // Cal Inline Embed initialisieren, wenn der Dialog geöffnet wird
      setTimeout(() => {
        if ((window as any).Cal && (window as any).Cal.ns && (window as any).Cal.ns.erstanalyse) {
          (window as any).Cal.ns.erstanalyse("inline", {
            elementOrSelector: "#cal-booking-place",
            calLink: "nohypeai/erstanalyse",
            layout: isMobile ? "month_view" : "month_view",
            cssVarsPerTheme: {
              light: {"cal-brand": "#292929"},
              dark: {"cal-brand": "#fafafa"}
            },
            hideEventTypeDetails: false
          });
        }
      }, 300);
    }
  }, [open, isMobile]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-black/95 border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">Sparpotenzial berechnen</DialogTitle>
        </DialogHeader>
        
        {/* Custom close button */}
        <button 
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors focus:outline-none"
          aria-label="Schließen"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="flex items-center justify-center">
          {/* Cal.com Inline Embed Container */}
          <div 
            id="cal-booking-place" 
            className="w-full min-h-[60vh] sm:min-h-[500px]"
            style={{ 
              height: isMobile ? 'calc(80vh - 100px)' : '500px',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDialog;
