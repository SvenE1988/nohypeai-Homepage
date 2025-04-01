
import { useDialog } from "@/components/providers/DialogProvider";

export const useCallToAction = () => {
  const { setContactDialogOpen, setCalendarDialogOpen } = useDialog();

  const openContactForm = () => {
    setContactDialogOpen(true);
  };

  const openCalendarBooking = () => {
    setCalendarDialogOpen(true);
  };

  const openApplicationForm = (jobTitle?: string) => {
    setContactDialogOpen(true, jobTitle, true);
  };

  return {
    openContactForm,
    openCalendarBooking,
    openApplicationForm
  };
};
