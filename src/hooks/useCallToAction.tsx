
import { useDialog } from "@/components/providers/DialogProvider";

export const useCallToAction = () => {
  const { setContactDialogOpen } = useDialog();

  // Direkte Links anstelle von Dialogen für Kontaktformular
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
          },
          enabledDateButton: {
            backgroundColor: "#FF0099",
            color: "white"
          },
          selectedDateButton: {
            backgroundColor: "#6B46C1",
            color: "white"
          },
          submitButton: {
            backgroundColor: "#FF0099",
            color: "white"
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
