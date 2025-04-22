
const faq = [
  {
    question: "Wie lange dauert eine Implementierung?",
    answer: (
      <div className="space-y-2 text-white">
        <p>
          Je nach Projektumfang und Komplexität rechnen wir mit <strong className="text-white">4–8 Wochen</strong> von der ersten Bedarfsaufnahme bis zum Go‑Live:
        </p>
        <ul className="list-disc list-inside text-white space-y-1">
          <li><b className="text-white">Woche 1–2</b>: Kick‑off, Zieldefinition und Daten‑/Systemanalyse</li>
          <li><b className="text-white">Woche 3–4</b>: Proof‑of‑Concept (PoC) und erste Pilotphase</li>
          <li><b className="text-white">Woche 5–6</b>: Skalierung, Feintuning und Testing</li>
          <li><b className="text-white">Woche 7–8</b>: Go‑Live, Schulung und Übergabe ins laufende Monitoring</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Wie läuft ein Erstgespräch ab?",
    answer: (
      <ul className="list-decimal list-inside space-y-1 text-gray-300">
        <li>
          <b>Vorabfragebogen:</b> Du füllst einen kurzen Online‑Fragebogen zu Deinen Zielen, Deiner Datenlage und Systemlandschaft aus.
        </li>
        <li>
          <b>20‑minütiges Videocall:</b> Wir analysieren gemeinsam Potenziale und identifizieren erste Use‑Cases.
        </li>
        <li>
          <b>Projektvorschlag:</b> Du erhältst ein grobes Konzept mit Zeitplan und Budgetrahmen.
        </li>
      </ul>
    ),
  },
  {
    question: "Welche Voraussetzungen muss ich erfüllen?",
    answer: (
      <ul className="list-disc list-inside space-y-1 text-gray-300">
        <li><b>Datenzugriff:</b> Schnittstellen zu CRM, ERP oder Formular‑APIs (z. B. Webformulare).</li>
        <li><b>Kalender-Integration:</b> Google/Outlook oder Dein CRM‑Terminmodul.</li>
        <li><b>Telefonie:</b> SIP‑Anbindung oder Cloud‑Telefonsystem (Twilio etc.).</li>
        <li><b>Admin‑Rollen:</b> Ein technischer Ansprechpartner für Konfiguration und Freigaben.</li>
      </ul>
    ),
  },
  {
    question: "Wie stelle ich den Datenschutz sicher?",
    answer: (
      <ul className="list-disc list-inside space-y-1 text-gray-300">
        <li><b>DSGVO‑Konformität:</b> Alle Sprach‑ und Transkriptionsdaten werden verschlüsselt übertragen und gespeichert.</li>
        <li><b>Hosting:</b> Wahlweise Self‑Hosted (z. B. Hetzner‑Cloud) oder zertifizierte Cloud‑Provider (AWS, GCP, Azure).</li>
        <li><b>Datenminimierung:</b> Wir verarbeiten nur die unbedingt notwendigen Daten.</li>
        <li><b>Auftrags­verarbeitung (AVV):</b> Vertragliche Regelung zur Datenverarbeitung gem. Art. 28 DSGVO.</li>
      </ul>
    ),
  },
  {
    question: "Was kostet eine Lösung?",
    answer: (
      <ul className="list-disc list-inside space-y-1 text-gray-300">
        <li><b>Setup-Gebühr:</b> einmalig ab 699 € (abhängig vom Umfang).</li>
        <li><b>Monatliche Abos:</b></li>
        <ul className="list-[circle] ml-6 space-y-1">
          <li><b>Sprach-KI</b> (z. B. SurveyBot, LeadBooster): ab 499 €/Monat</li>
          <li><b>Optionale Add‑Ons:</b></li>
          <ul className="list-[square] ml-6 space-y-1">
            <li>Direkte Terminbuchung</li>
            <li>Weiterleitung an persönliche Ansprechpartner</li>
            <li>Automatischer E‑Mail‑Versand nach jedem Gespräch</li>
          </ul>
          <li><b>Automatisierung</b> (z. B. OfficePilot): ab 299 €/Monat</li>
        </ul>
      </ul>
    ),
  },
  {
    question: "Wie messe ich den Erfolg?",
    answer: (
      <ul className="list-disc list-inside space-y-1 text-gray-300">
        <li><b>KPIs:</b> Reaktionszeit, Anzahl qualifizierter Leads, Conversion‑Rate, eingesparte Arbeitsstunden.</li>
        <li><b>Dashboard:</b> Live‑Reporting mit Peak‑Zeiten, Themen‑Clustering und Kosten‑Nutzen‑Analyse.</li>
        <li><b>Monatliches Review:</b> Gemeinsame Analyse der Ergebnisse und Ableitung von Optimierungen.</li>
      </ul>
    ),
  },
  {
    question: "Kann ich das System selbst anpassen?",
    answer: (
      <div className="text-white">
        Ja. Über unser Admin‑Dashboard kannst Du:
        <ul className="list-disc list-inside mt-1 text-white">
          <li>Quali‑Skripte und FAQ‑Blöcke bearbeiten</li>
          <li>Terminfenster und Kalenderregeln anpassen</li>
          <li>E‑Mail‑Templates und Textbausteine individualisieren</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Wie läuft die Wartung und der Support ab?",
    answer: (
      <ul className="list-disc list-inside space-y-1 text-gray-300">
        <li><b>Standard‑Support:</b> E‑Mail‑Support innerhalb von 24 Std.</li>
        <li><b>Premium‑Support:</b> Telefon‑Hotline und SLA‑Antwortzeiten von 4 Std.</li>
        <li><b>Updates:</b> Regelmäßige Feature‑Releases und Sicherheits‑Patches sind inklusive.</li>
      </ul>
    ),
  },
  {
    question: "Welche Branchen unterstützt ihr?",
    answer: (
      <div>
        Wir sind branchen­agnostisch, haben aber besondere Expertise in:
        <ul className="list-disc list-inside mt-1 text-gray-300">
          <li>Photovoltaik‑ und Energiedienstleistung</li>
          <li>Handwerk & Notdienste</li>
          <li>Hausverwaltung & Facility Management</li>
          <li>B2B‑SaaS & Vertriebsagenturen</li>
          <li>Einzelhandel, Fitnessstudios & E‑Learning</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Wie geht es nach dem Go‑Live weiter?",
    answer: (
      <ul className="list-decimal list-inside space-y-1 text-gray-300">
        <li><b>Onboarding‑Training:</b> Workshops für Dein Team zu Bedienung und Best Practices.</li>
        <li><b>Monitoring:</b> Wir überwachen proaktiv Leistung und Betriebssicherheit.</li>
        <li><b>Optimierung:</b> Quartalsweise Strategie‑Calls zur Weiterentwicklung Deiner KI‑Use‑Cases.</li>
      </ul>
    ),
  },
];

export default faq;
