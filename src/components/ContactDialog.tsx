
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import ApplicationForm from "./ApplicationForm";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobTitle?: string;
  isApplication?: boolean;
}

const ContactDialog = ({ open, onOpenChange, jobTitle, isApplication = false }: ContactDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-black/95 border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isApplication 
              ? jobTitle 
                ? `Bewerbung für: ${jobTitle}` 
                : "Initiativbewerbung"
              : "Kontaktieren Sie uns"
            }
          </DialogTitle>
        </DialogHeader>
        <ApplicationForm 
          jobTitle={jobTitle} 
          onSubmitSuccess={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
