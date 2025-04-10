
import { useDialog } from "@/components/providers/DialogProvider";

export const useCallToAction = () => {
  const { setContactDialogOpen, setCalendarDialogOpen } = useDialog();

  // Contact form direct link
  const openContactForm = () => {
    window.open("https://automatisierung.seserver.nohype-ai.de/form/Anfrage", "_blank");
  };

  // Calendar booking using the DialogProvider
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
