
import { createContext, ReactNode, useContext, useState } from "react";
import ContactDialog from "../ContactDialog";
import CalendarDialog from "../CalendarDialog";

// Konfiguration für den N8N-Webhook
const N8N_WEBHOOK_URL = "https://your-n8n-instance.com/webhook/your-webhook-id";

interface DialogContextType {
  setContactDialogOpen: (open: boolean, jobTitle?: string, isApplication?: boolean) => void;
  setCalendarDialogOpen: (open: boolean) => void;
  webhookUrl: string;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};

interface DialogProviderProps {
  children: ReactNode;
}

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [contactOpen, setContactOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState<string | undefined>(undefined);
  const [isApplication, setIsApplication] = useState(false);

  const setContactDialogOpen = (open: boolean, title?: string, application?: boolean) => {
    setJobTitle(title);
    setIsApplication(application || false);
    setContactOpen(open);
  };

  const setCalendarDialogOpen = (open: boolean) => {
    setCalendarOpen(open);
  };

  return (
    <DialogContext.Provider value={{ 
      setContactDialogOpen, 
      setCalendarDialogOpen,
      webhookUrl: N8N_WEBHOOK_URL 
    }}>
      {children}
      <ContactDialog 
        open={contactOpen} 
        onOpenChange={setContactOpen} 
        jobTitle={jobTitle}
        isApplication={isApplication}
      />
      <CalendarDialog open={calendarOpen} onOpenChange={setCalendarOpen} />
    </DialogContext.Provider>
  );
};
