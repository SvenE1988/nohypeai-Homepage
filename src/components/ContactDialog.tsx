
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
  const [uploading, setUploading] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-[#0A0A0A] to-[#1A1F35] border border-primary/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">
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
          isApplication={isApplication}
          onSubmitSuccess={() => onOpenChange(false)}
          isUploading={uploading}
          setIsUploading={setUploading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
