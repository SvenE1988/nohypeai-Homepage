
import { createContext, ReactNode, useContext, useState } from "react";
import ContactDialog from "../ContactDialog";
import CalendarDialog from "../CalendarDialog";

interface DialogContextType {
  setContactDialogOpen: (open: boolean, jobTitle?: string, isApplication?: boolean) => void;
  setCalendarDialogOpen: (open: boolean) => void;
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
      setCalendarDialogOpen
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
