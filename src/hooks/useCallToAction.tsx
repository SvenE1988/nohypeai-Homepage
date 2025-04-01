
import { useDialog } from "@/components/providers/DialogProvider";

export const useCallToAction = () => {
  const { setContactDialogOpen, setCalendarDialogOpen } = useDialog();

  // Direkte Links anstelle von Dialogen für Kontaktformular
  const openContactForm = () => {
    window.open("https://automatisierung.seserver.nohype-ai.de/form/Anfrage", "_blank");
  };

  // Cal.com Integration über Dialog
  const openCalendarBooking = () => {
    setCalendarDialogOpen(true);
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
