import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Shield, File } from "lucide-react";

interface LegalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: "impressum" | "datenschutz" | "agb";
}

const LegalDialog = ({ isOpen, onClose, type }: LegalDialogProps) => {
  const content = {
    impressum: {
      title: "Impressum",
      icon: <FileText className="w-6 h-6" />,
      content: (
        <>
          <h2 className="text-xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
          <p className="mb-4">
            Firmenname GmbH<br />
            Musterstraße 123<br />
            12345 Musterstadt
          </p>
          <h3 className="text-lg font-semibold mb-2">Vertreten durch</h3>
          <p className="mb-4">Max Mustermann</p>
          <h3 className="text-lg font-semibold mb-2">Kontakt</h3>
          <p className="mb-4">
            Telefon: +49 (0) 123 456789<br />
            E-Mail: info@firma.de
          </p>
        </>
      ),
    },
    datenschutz: {
      title: "Datenschutzerklärung",
      icon: <Shield className="w-6 h-6" />,
      content: (
        <>
          <h2 className="text-xl font-semibold mb-4">Datenschutzerklärung</h2>
          <p className="mb-4">
            Wir freuen uns über Ihr Interesse an unserem Unternehmen. 
            Datenschutz hat einen besonders hohen Stellenwert für uns.
          </p>
          <h3 className="text-lg font-semibold mb-2">1. Datenschutz auf einen Blick</h3>
          <p className="mb-4">
            Allgemeine Hinweise...<br />
            Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich.
          </p>
        </>
      ),
    },
    agb: {
      title: "Allgemeine Geschäftsbedingungen",
      icon: <File className="w-6 h-6" />,
      content: (
        <>
          <h2 className="text-xl font-semibold mb-4">Allgemeine Geschäftsbedingungen</h2>
          <p className="mb-4">
            Stand: [Datum]
          </p>
          <h3 className="text-lg font-semibold mb-2">§1 Geltungsbereich</h3>
          <p className="mb-4">
            Diese Allgemeinen Geschäftsbedingungen gelten für alle gegenwärtigen und zukünftigen 
            Geschäftsbeziehungen zwischen uns und dem Kunden.
          </p>
        </>
      ),
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-black/95 border border-white/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            {content[type].icon}
            {content[type].title}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-gray-200">
          {content[type].content}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LegalDialog;