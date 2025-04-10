
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
            nohype.ai<br />
            eine Marke der<br /><br />
            Powerplant Promotion GmbH<br />
            Bierdener Kämpe 4<br />
            28832 Achim
          </p>
          <h3 className="text-lg font-semibold mb-2">Vertreten durch</h3>
          <p className="mb-4">Geschäftsführer: Sven Erkens, Adrian Wülbers</p>
          <h3 className="text-lg font-semibold mb-2">Kontakt</h3>
          <p className="mb-4">
            Telefon: +49 (0) 123 456789<br />
            E-Mail: info@firma.de
          </p>
          <h3 className="text-lg font-semibold mb-2">Handelsregister</h3>
          <p className="mb-4">
            Sitz der Gesellschaft: Achim<br />
            Amtsgericht Walsrode HRB 211757<br />
            Steuer-Nr.: 48/207/01745
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
          
          <h3 className="text-lg font-semibold mb-2">Verantwortlicher</h3>
          <p className="mb-4">
            nohype-ai.de ist eine Marke der<br />
            <strong>Powerplant Promotion GmbH</strong><br />
            Bierdener Kämpe 4, 28832 Achim<br />
            Geschäftsführer: Adrian Wülbers, Sven Erkens<br />
            E-Mail: info@nohype-ai.de
          </p>
          
          <h3 className="text-lg font-semibold mb-2">1. Hosting</h3>
          <p className="mb-4">
            Unsere Website wird bei Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen gehostet. 
            Hetzner verarbeitet personenbezogene Daten in unserem Auftrag gemäß Art. 28 DSGVO.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">2. Erhebung und Verarbeitung personenbezogener Daten</h3>
          <p className="mb-4">
            Wir verarbeiten personenbezogene Daten (z. B. Name, E-Mail-Adresse, Telefonnummer), die Sie uns 
            über unser Kontaktformular oder im Rahmen eines Newsletter-Abonnements freiwillig mitteilen.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">3. Kontaktformular & Kommunikation</h3>
          <p className="mb-4">
            Die Kommunikation über das Kontaktformular erfolgt über unseren eigenen Automatisierungsserver (n8n), 
            gehostet bei Hetzner. Die Verarbeitung dient ausschließlich der Bearbeitung Ihrer Anfrage.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">4. Newsletter</h3>
          <p className="mb-4">
            Wenn Sie sich für unseren Newsletter anmelden, wird Ihre E-Mail-Adresse gespeichert. 
            Die technische Abwicklung erfolgt über unseren n8n-Server. Sie können dem Empfang jederzeit widersprechen.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">5. Verwendung von KI-Diensten</h3>
          <p className="mb-4">
            Zur Verarbeitung von Nutzereingaben und Bereitstellung automatisierter Antworten nutzen wir externe KI-Dienste:<br />
            - Google Gemini API (Google Cloud Platform)<br />
            - Deepgram Inc. (Speech-to-Text)<br />
            - Retell.ai (Voicebots)<br />
            <br />
            Die Daten werden über gesicherte Verbindungen an diese Dienste übermittelt. Google verarbeitet keine Daten 
            zu Trainingszwecken, sofern dies projektspezifisch deaktiviert wurde. Alle Anbieter arbeiten mit 
            Standardvertragsklauseln (SCCs) zur Sicherstellung eines angemessenen Datenschutzniveaus.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">6. Externe Inhalte & Schriftarten</h3>
          <p className="mb-4">
            Falls Google Fonts verwendet werden, erfolgt der Abruf direkt vom Google CDN. 
            Dabei kann Ihre IP-Adresse an Google LLC, USA, übertragen werden.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">7. Cookies und Tracking</h3>
          <p className="mb-4">
            Aktuell setzen wir keine Cookies zu Analyse- oder Trackingzwecken ein. 
            Bei zukünftiger Nutzung wird ein Cookie-Banner implementiert.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">8. Ihre Rechte</h3>
          <p className="mb-4">
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, 
            Datenübertragbarkeit und Widerspruch. Bei Beschwerden wenden Sie sich bitte an datenschutz@nohype-ai.de 
            oder an die zuständige Aufsichtsbehörde.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">9. Änderungen dieser Datenschutzerklärung</h3>
          <p className="mb-4">
            Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf zu aktualisieren. 
            Letzte Aktualisierung: April 2025.
          </p>
        </>
      ),
    },
    agb: {
      title: "Allgemeine Geschäftsbedingungen",
      icon: <File className="w-6 h-6" />,
      content: (
        <>
          <h2 className="text-xl font-semibold mb-4">Allgemeine Geschäftsbedingungen (AGB)</h2>
          
          <h3 className="text-lg font-semibold mb-2">1. Geltungsbereich</h3>
          <p className="mb-4">
            Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge, Lieferungen und Leistungen der nachfolgenden Anbieterin:<br /><br />
            <strong>nohype-ai.de</strong> ist eine Marke der<br />
            <strong>Powerplant Promotion GmbH</strong><br />
            Bierdener Kämpe 4, 28832 Achim<br />
            Sitz der Gesellschaft: Achim<br />
            Amtsgericht Walsrode HRB 211757<br />
            Geschäftsführer: Adrian Wülbers, Sven Erkens<br /><br />
            Diese AGB gelten ausschließlich gegenüber Unternehmern i.S.d. § 14 BGB.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">2. Leistungen</h3>
          <p className="mb-4">
            Die Agentur bietet Beratungs- und Umsetzungsdienstleistungen im Bereich Künstliche Intelligenz (KI), 
            Prozessautomatisierung, Bot-Implementierung, API-Anbindung und Entwicklung automatisierter Plattformen 
            für Unternehmen an. Die Leistungen können in Form von Projektarbeiten oder im Rahmen von laufenden 
            Abonnementmodellen erbracht werden.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">3. Vertragsabschluss</h3>
          <p className="mb-4">
            Ein Vertrag kommt zustande durch Annahme eines schriftlichen Angebots oder durch Auftragsbestätigung. 
            Mündliche Nebenabreden bedürfen der schriftlichen Bestätigung.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">4. Preise und Zahlungsbedingungen</h3>
          <p className="mb-4">
            Die Preise verstehen sich netto zuzüglich der gesetzlichen Umsatzsteuer. Die Abrechnung erfolgt 
            projektbezogen oder monatlich bei Abonnementmodellen. Die Zahlung ist 14 Tage nach Rechnungsstellung 
            ohne Abzug fällig.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">5. Vertragslaufzeit und Kündigung (bei Abomodellen)</h3>
          <p className="mb-4">
            Abonnementverträge haben eine Mindestlaufzeit von 24 Monaten. Sie verlängern sich jeweils um ein 
            weiteres Jahr, sofern sie nicht mit einer Frist von drei Monaten zum Vertragsende schriftlich 
            gekündigt werden.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">6. Mitwirkungspflichten des Kunden</h3>
          <p className="mb-4">
            Der Kunde stellt sicher, dass alle erforderlichen Inhalte, Informationen und Zugänge rechtzeitig zur 
            Verfügung gestellt werden, um eine ordnungsgemäße Leistungserbringung zu ermöglichen.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">7. Nutzungsrechte</h3>
          <p className="mb-4">
            Soweit im Rahmen der Leistungserbringung Software, Automatisierungen oder Bots entwickelt werden, 
            räumt die Agentur dem Kunden ein einfaches, nicht übertragbares Nutzungsrecht für die Dauer des 
            Vertragsverhältnisses ein, sofern nichts Abweichendes vereinbart ist.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">8. Haftung</h3>
          <p className="mb-4">
            Die Agentur haftet nur für Vorsatz und grobe Fahrlässigkeit. Bei leichter Fahrlässigkeit ist die Haftung 
            auf die vertragstypischen, vorhersehbaren Schäden begrenzt.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">9. Datenschutz und Vertraulichkeit</h3>
          <p className="mb-4">
            Die Agentur verpflichtet sich zur Vertraulichkeit und zur Einhaltung aller datenschutzrechtlichen 
            Anforderungen gemäß DSGVO. Eine Datenverarbeitung erfolgt auf Grundlage eines entsprechenden 
            Auftragsverarbeitungsvertrags.
          </p>
          
          <h3 className="text-lg font-semibold mb-2">10. Schlussbestimmungen</h3>
          <p className="mb-4">
            Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist der Sitz der Anbieterin.
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
