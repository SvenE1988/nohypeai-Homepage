
import { useDialog } from "@/components/providers/DialogProvider";

export const useCallToAction = () => {
  const { setContactDialogOpen } = useDialog();

  // Aktualisierte direkte Links für Kontaktformular
  const openContactForm = () => {
    window.open("https://automatisierung.seserver.nohype-ai.de/form/Anfrage", "_blank");
  };

  // Cal.com Integration über die Floating Button API
  const openCalendarBooking = () => {
    // Sicherstellen, dass Cal API geladen ist
    if ((window as any).Cal?.ns?.erstanalyse) {
      (window as any).Cal.ns.erstanalyse("modal", {
        calLink: "nohypeai/erstanalyse",
        layout: "month_view",
        styles: {
          branding: {
            brandColor: "#FF0099"
          }
        }
      });
    }
  };

  const openApplicationForm = () => {
    window.open("https://automatisierung.seserver.nohype-ai.de/form/Anfrage", "_blank");
  };

  return {
    openContactForm,
    openCalendarBooking,
    openApplicationForm
  };
};
