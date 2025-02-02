import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactDialog = ({ open, onOpenChange }: ContactDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier würde normalerweise die Logik zum Senden der Nachricht implementiert
    toast({
      title: "Nachricht gesendet",
      description: "Wir werden uns schnellstmöglich bei Ihnen melden.",
    });
    onOpenChange(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-black/95 border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl">Kontaktieren Sie uns</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-200">
              Name
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white/5 border-white/10 text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-200">
              E-Mail
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white/5 border-white/10 text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium text-gray-200">
              Nachricht
            </label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-white/5 border-white/10 text-white"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Absenden
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;