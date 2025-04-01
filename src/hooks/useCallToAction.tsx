
export const useCallToAction = () => {
  // Direkte Links anstelle von Dialogen
  const openContactForm = () => {
    window.open("https://automatisierung.seserver.nohype-ai.de/form/Anfrage", "_blank");
  };

  const openCalendarBooking = () => {
    // Behalten Sie dies für die Cal.com-Integration
    window.open("https://cal.com/your-username", "_blank");
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
