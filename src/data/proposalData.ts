
// Sample proposal templates data

export interface ProposalTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  previewUrl: string;
  coverBackground: string;
  defaultData: {
    title: string;
    subtitle: string;
    companyName: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    introduction: string;
    problemStatement: string;
    solution: string;
    benefits: string;
    conclusion: string;
    callToAction: string;
  };
}

export const proposalTemplates: ProposalTemplate[] = [
  {
    id: "template-1",
    name: "Business Proposal",
    description: "Ein professionelles Proposal für Unternehmen mit Fokus auf Automatisierung und Prozessoptimierung.",
    thumbnail: "/placeholder.svg",
    previewUrl: "#",
    coverBackground: "/placeholder.svg",
    defaultData: {
      title: "Automatisierungslösung für Ihr Unternehmen",
      subtitle: "Proposal für Prozessoptimierung und Effizienzsteigerung",
      companyName: "Musterfirma GmbH",
      contactName: "Max Mustermann",
      contactEmail: "kontakt@example.com",
      contactPhone: "+49 123 456789",
      introduction: "Sehr geehrte Damen und Herren,\n\nwir freuen uns, Ihnen dieses maßgeschneiderte Angebot für die Optimierung Ihrer Geschäftsprozesse durch innovative Automatisierungslösungen präsentieren zu dürfen. Basierend auf unseren Gesprächen und einer eingehenden Analyse Ihrer aktuellen Prozesse haben wir eine Lösung entwickelt, die genau auf Ihre Bedürfnisse zugeschnitten ist.",
      problemStatement: "In der heutigen digitalen Geschäftswelt stehen Unternehmen vor der Herausforderung, mit immer komplexeren Prozessen umzugehen und gleichzeitig die Effizienz zu steigern. Die manuelle Bearbeitung von Aufgaben kostet Zeit und Ressourcen und führt oft zu Fehleranfälligkeit.\n\nIhre spezifischen Herausforderungen umfassen:\n- Zeitaufwändige manuelle Dateneingabe\n- Hohe Fehlerquoten bei der Informationsverarbeitung\n- Ineffiziente Kommunikationswege zwischen Abteilungen\n- Mangelnde Echtzeit-Einblicke in Geschäftsprozesse",
      solution: "Unsere maßgeschneiderte Automatisierungslösung adressiert diese Herausforderungen durch eine Kombination aus intelligenter Prozessautomatisierung und KI-gestützten Systemen.\n\nDie Kernelemente unserer Lösung sind:\n\n1. Intelligente Datenerfassung und -verarbeitung\nAutomatisierte Extraktion und Verarbeitung von Daten aus verschiedenen Quellen wie E-Mails, Dokumenten und Formularen.\n\n2. Workflow-Automatisierung\nOptimierung der Geschäftsprozesse durch automatisierte Workflows, die manuelle Eingriffe minimieren und Durchlaufzeiten verkürzen.\n\n3. Integrierte Analysefunktionen\nEchtzeit-Reporting und Analysetools für fundierte Geschäftsentscheidungen.",
      benefits: "Die Implementierung unserer Lösung bietet Ihrem Unternehmen zahlreiche Vorteile:\n\n• Zeitersparnis: Reduzierung manueller Aufgaben um bis zu 75%\n• Kosteneffizienz: Senkung der operativen Kosten durch optimierte Prozesse\n• Fehlerreduktion: Minimierung menschlicher Fehler in kritischen Prozessen\n• Skalierbarkeit: Flexible Anpassung der Lösung an Ihr Unternehmenswachstum\n• Verbesserte Datenqualität: Konsistente und zuverlässige Informationen für fundierte Entscheidungen\n• Erhöhte Mitarbeiterzufriedenheit: Befreiung von monotonen Aufgaben zugunsten wertschöpfender Tätigkeiten",
      conclusion: "Die vorgeschlagene Automatisierungslösung bietet Ihrem Unternehmen den entscheidenden Wettbewerbsvorteil in einer zunehmend digitalisierten Geschäftswelt. Durch die Optimierung Ihrer Kernprozesse schaffen wir die Grundlage für nachhaltiges Wachstum und Erfolg.\n\nUnser erfahrenes Team steht bereit, diese Transformation gemeinsam mit Ihnen umzusetzen und sicherzustellen, dass die Lösung optimal auf Ihre spezifischen Anforderungen abgestimmt ist.",
      callToAction: "Um die nächsten Schritte zu besprechen und einen detaillierten Implementierungsplan zu erstellen, schlagen wir ein persönliches Gespräch vor. Bitte kontaktieren Sie uns unter den angegebenen Kontaktdaten, um einen Termin zu vereinbaren.\n\nWir freuen uns darauf, mit Ihnen zusammenzuarbeiten und Ihr Unternehmen auf dem Weg zur digitalen Transformation zu begleiten."
    }
  },
  {
    id: "template-2",
    name: "KI-Lösung Proposal",
    description: "Vorschlag für die Implementierung von KI-Systemen und -Anwendungen für Unternehmen.",
    thumbnail: "/placeholder.svg",
    previewUrl: "#",
    coverBackground: "/placeholder.svg",
    defaultData: {
      title: "KI-Lösungen für Ihr Unternehmen",
      subtitle: "Maßgeschneiderte Künstliche Intelligenz für Ihre Geschäftsprozesse",
      companyName: "Tech Innovations GmbH",
      contactName: "Anna Schmidt",
      contactEmail: "info@tech-innovations.de",
      contactPhone: "+49 987 654321",
      introduction: "Sehr geehrte Damen und Herren,\n\nwir freuen uns, Ihnen diesen maßgeschneiderten Vorschlag für die Integration fortschrittlicher KI-Lösungen in Ihre Geschäftsprozesse unterbreiten zu dürfen. Nach eingehender Analyse Ihrer Anforderungen haben wir ein Konzept entwickelt, das Ihr Unternehmen durch den Einsatz künstlicher Intelligenz auf die nächste Stufe heben wird.",
      problemStatement: "In der heutigen datengetriebenen Wirtschaft stehen Unternehmen vor der Herausforderung, große Datenmengen effektiv zu nutzen und gleichzeitig wettbewerbsfähig zu bleiben. Manuelle Datenanalyse ist zeitaufwändig und oft ungenau, während herkömmliche Automatisierungslösungen an ihre Grenzen stoßen.\n\nIhre spezifischen Herausforderungen umfassen:\n- Ineffiziente Analyse großer Datenmengen\n- Mangelnde Vorhersagefähigkeiten für Geschäftsentscheidungen\n- Hoher Ressourcenaufwand bei repetitiven Aufgaben\n- Schwierigkeiten bei der Identifikation von Mustern und Trends",
      solution: "Unsere KI-Lösung adressiert diese Herausforderungen durch ein mehrstufiges System, das speziell für Ihre Anforderungen entwickelt wurde:\n\n1. Intelligente Datenanalyse\nImplementierung fortschrittlicher Algorithmen zur automatischen Analyse Ihrer Unternehmensdaten und Erkennung versteckter Muster.\n\n2. Prädiktive Analyse\nEntwicklung von Vorhersagemodellen, die zukünftige Trends auf Basis historischer Daten antizipieren und fundierte Geschäftsentscheidungen ermöglichen.\n\n3. Chatbot für Kundenkommunikation\nImplementierung eines intelligenten, selbstlernenden Chatbots zur Verbesserung der Kundenkommunikation und Entlastung Ihrer Mitarbeiter.\n\n4. Prozessautomatisierung durch Machine Learning\nIntegration von Machine-Learning-Modellen zur kontinuierlichen Optimierung Ihrer Geschäftsprozesse.",
      benefits: "Die Integration unserer KI-Lösungen bietet Ihrem Unternehmen folgende Vorteile:\n\n• Datenbasierte Entscheidungsfindung: Nutzung von Datenmustern für fundierte Geschäftsentscheidungen\n• Effizienzsteigerung: Automatisierung komplexer Aufgaben und Reduktion manueller Arbeit\n• Kosteneinsparungen: Optimierung von Ressourcen und Prozessen\n• Wettbewerbsvorteil: Innovative Lösungen, die Sie von Mitbewerbern abheben\n• Skalierbarkeit: Flexible Anpassung der KI-Komponenten an wachsende Anforderungen\n• Kontinuierliche Verbesserung: Selbstlernende Systeme, die mit der Zeit immer besser werden",
      conclusion: "Die vorgeschlagenen KI-Lösungen bieten Ihrem Unternehmen die Möglichkeit, das volle Potenzial Ihrer Daten auszuschöpfen und einen signifikanten Wettbewerbsvorteil zu erlangen. Mit unserer Expertise im Bereich künstlicher Intelligenz und Ihrer Branchenkenntnis schaffen wir gemeinsam eine maßgeschneiderte Lösung, die perfekt auf Ihre spezifischen Anforderungen abgestimmt ist.\n\nUnser Team aus erfahrenen Data Scientists und KI-Experten steht bereit, Sie bei jedem Schritt des Implementierungsprozesses zu unterstützen und sicherzustellen, dass die Integration nahtlos verläuft.",
      callToAction: "Um die nächsten Schritte zu besprechen und einen detaillierten Implementierungsplan zu erstellen, würden wir uns über ein persönliches Gespräch freuen. Bitte kontaktieren Sie uns unter den angegebenen Kontaktdaten, um einen Termin zu vereinbaren.\n\nWir sind überzeugt, dass diese KI-Lösungen einen erheblichen Mehrwert für Ihr Unternehmen schaffen werden, und freuen uns auf die Zusammenarbeit mit Ihnen."
    }
  },
  {
    id: "template-3",
    name: "Digitale Transformation",
    description: "Umfassendes Proposal für Unternehmen, die eine vollständige digitale Transformation anstreben.",
    thumbnail: "/placeholder.svg",
    previewUrl: "#",
    coverBackground: "/placeholder.svg",
    defaultData: {
      title: "Digitale Transformation",
      subtitle: "Ihr Weg in die digitale Zukunft",
      companyName: "Digital Future GmbH",
      contactName: "Thomas Weber",
      contactEmail: "kontakt@digital-future.de",
      contactPhone: "+49 555 123456",
      introduction: "Sehr geehrte Damen und Herren,\n\nwir freuen uns, Ihnen dieses umfassende Konzept für die digitale Transformation Ihres Unternehmens präsentieren zu dürfen. Basierend auf unserer Expertise und den Erkenntnissen aus unseren Gesprächen haben wir einen maßgeschneiderten Transformationsplan entwickelt, der Ihr Unternehmen fit für die digitale Zukunft macht.",
      problemStatement: "Die digitale Revolution verändert Geschäftsmodelle und Märkte grundlegend. Unternehmen, die sich nicht anpassen, laufen Gefahr, den Anschluss zu verlieren. Die Herausforderungen sind vielfältig und komplex.\n\nIhre spezifischen Herausforderungen umfassen:\n- Veraltete IT-Infrastruktur, die Innovationen behindert\n- Mangelnde digitale Kompetenzen im Unternehmen\n- Ineffiziente analoge Prozesse, die Zeit und Ressourcen binden\n- Schwierigkeiten bei der Integration neuer digitaler Lösungen\n- Unsicherheit bezüglich der strategischen Ausrichtung im digitalen Kontext",
      solution: "Unser Ansatz für Ihre digitale Transformation umfasst einen ganzheitlichen Plan mit vier Kernbereichen:\n\n1. Digitale Strategie\nEntwicklung einer maßgeschneiderten digitalen Strategie, die auf Ihre Unternehmensziele ausgerichtet ist und einen klaren Fahrplan für die Transformation bietet.\n\n2. Technologische Modernisierung\nModernisierung Ihrer IT-Infrastruktur durch Cloud-Integration, Implementierung moderner Software-Lösungen und Optimierung der Datenarchitektur.\n\n3. Prozessdigitalisierung\nAnalyse und Neugestaltung Ihrer Geschäftsprozesse mit Fokus auf Effizienz, Automatisierung und nahtlose digitale Integration.\n\n4. Digitale Kompetenzentwicklung\nUmfassendes Schulungs- und Change-Management-Programm zur Förderung digitaler Kompetenzen und Etablierung einer innovations-freundlichen Unternehmenskultur.",
      benefits: "Die Umsetzung unseres Transformationsplans bietet Ihrem Unternehmen folgende Vorteile:\n\n• Wettbewerbsfähigkeit: Stärkung Ihrer Position im zunehmend digitalen Marktumfeld\n• Agilität: Erhöhte Anpassungsfähigkeit an sich schnell ändernde Marktbedingungen\n• Effizienzsteigerung: Optimierte Prozesse durch Digitalisierung und Automatisierung\n• Innovationsfähigkeit: Schaffung eines Umfelds, das kontinuierliche Innovation fördert\n• Kundenfokus: Verbesserte Kundenerfahrung durch digitale Touchpoints und Services\n• Zukunftssicherheit: Aufbau einer skalierbaren, zukunftsfähigen Unternehmensstruktur",
      conclusion: "Die digitale Transformation ist kein einmaliges Projekt, sondern ein kontinuierlicher Prozess, der Ihr Unternehmen nachhaltig verändern wird. Mit unserem ganzheitlichen Ansatz begleiten wir Sie auf diesem Weg und stellen sicher, dass die Transformation nicht nur technologisch, sondern auch kulturell erfolgreich umgesetzt wird.\n\nUnser erfahrenes Team aus Digitalexperten, Prozessspezialisten und Change-Managern steht bereit, diese Transformation gemeinsam mit Ihnen zu gestalten und Ihr Unternehmen fit für die digitale Zukunft zu machen.",
      callToAction: "Um die Details unseres Transformationsplans zu besprechen und einen individuellen Fahrplan für Ihr Unternehmen zu erstellen, schlagen wir ein persönliches Strategiegespräch vor. Bitte kontaktieren Sie uns unter den angegebenen Kontaktdaten, um einen Termin zu vereinbaren.\n\nWir freuen uns darauf, mit Ihnen gemeinsam den Weg in die digitale Zukunft zu gestalten und Ihr Unternehmen auf die nächste Entwicklungsstufe zu bringen."
    }
  }
];

export const getTemplateById = (id: string): ProposalTemplate | undefined => {
  return proposalTemplates.find(template => template.id === id);
};
