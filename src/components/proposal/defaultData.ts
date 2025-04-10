
import { v4 as uuidv4 } from "uuid";
import { Proposal, ProposalTemplate, ProposalSection } from "./types";

// Helper to create section IDs
const createId = () => uuidv4();

// Default brochure with sample content
export const defaultProposal: Proposal = {
  id: createId(),
  title: "NoHype KI-Lösungen",
  clientName: "Musterkunde GmbH",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  documentType: 'proposal',
  useCoverPage: true,
  useTableOfContents: false,
  sections: [
    {
      id: createId(),
      type: "header",
      content: {
        title: "Unsere Dienstleistungen",
        subtitle: "Maßgeschneiderte KI-Lösungen für Ihr Unternehmen",
        date: new Date().toLocaleDateString('de-DE')
      },
      order: 0
    },
    {
      id: createId(),
      type: "text",
      content: {
        title: "Über NoHype",
        text: "NoHype ist ein führender Anbieter von KI-Lösungen für Unternehmen aller Größen. Unser Team aus erfahrenen Entwicklern und KI-Experten arbeitet eng mit unseren Kunden zusammen, um innovative und effektive Lösungen zu entwickeln, die echten Mehrwert bieten."
      },
      order: 1
    },
    {
      id: createId(),
      type: "pricing",
      content: {
        title: "Preise",
        items: [
          {
            description: "KI-Beratung",
            price: 1500,
            unit: "pauschal"
          },
          {
            description: "Implementierung",
            price: 3500,
            unit: "pauschal"
          },
          {
            description: "Support & Wartung",
            price: 500,
            unit: "monatlich"
          }
        ]
      },
      order: 2
    },
    {
      id: createId(),
      type: "contact",
      content: {
        title: "Ihr Ansprechpartner",
        contact: {
          name: "Max Mustermann",
          position: "Senior KI-Berater",
          email: "max@nohype-ai.de",
          phone: "+49 123 4567890"
        }
      },
      order: 3
    }
  ]
};

// Available templates
export const proposalTemplates: ProposalTemplate[] = [
  {
    id: "standard-angebot",
    name: "Standard Angebot",
    description: "Einfaches Angebot mit Übersicht, Text, Preisen und Kontakt",
    documentType: 'proposal',
    sections: [
      {
        id: createId(),
        type: "header",
        content: {
          title: "Angebot für Ihre KI-Lösung",
          subtitle: "Maßgeschneidert für Ihre Anforderungen",
          date: new Date().toLocaleDateString('de-DE')
        },
        order: 0
      },
      {
        id: createId(),
        type: "text",
        content: {
          title: "Unser Angebot für Sie",
          text: "Basierend auf unserem Gespräch haben wir ein maßgeschneidertes Angebot für Sie erstellt. Die folgenden Leistungen sind in diesem Angebot enthalten."
        },
        order: 1
      },
      {
        id: createId(),
        type: "pricing",
        content: {
          title: "Preise",
          items: [
            {
              description: "KI-Analyse",
              price: 1800,
              unit: "pauschal"
            },
            {
              description: "Entwicklung",
              price: 4500,
              unit: "pauschal"
            },
            {
              description: "Implementierung",
              price: 2000,
              unit: "pauschal"
            }
          ]
        },
        order: 2
      },
      {
        id: createId(),
        type: "contact",
        content: {
          title: "Ihr Ansprechpartner",
          contact: {
            name: "Max Mustermann",
            position: "Senior KI-Berater",
            email: "max@nohype-ai.de",
            phone: "+49 123 4567890"
          }
        },
        order: 3
      }
    ]
  },
  {
    id: "umfangreiches-angebot",
    name: "Umfangreiches Angebot",
    description: "Detailliertes Angebot mit Case Study, mehreren Textbereichen und Preisübersicht",
    documentType: 'proposal',
    useTableOfContents: true,
    sections: [
      {
        id: createId(),
        type: "header",
        content: {
          title: "Komplettlösung für Ihr Unternehmen",
          subtitle: "KI-basierte Prozessoptimierung",
          date: new Date().toLocaleDateString('de-DE')
        },
        order: 0
      },
      {
        id: createId(),
        type: "text",
        content: {
          title: "Über uns",
          text: "NoHype ist ein führender Anbieter von KI-Lösungen mit langjähriger Erfahrung in der Entwicklung maßgeschneiderter Anwendungen für verschiedene Branchen."
        },
        order: 1
      },
      {
        id: createId(),
        type: "text",
        content: {
          title: "Ihr Projekt",
          text: "Nach unserer Analyse haben wir einen umfassenden Plan zur Optimierung Ihrer Geschäftsprozesse mithilfe künstlicher Intelligenz entwickelt. Die folgenden Maßnahmen sind Teil unseres Angebots."
        },
        order: 2
      },
      {
        id: createId(),
        type: "caseStudy",
        content: {
          caseStudyId: 0
        },
        order: 3
      },
      {
        id: createId(),
        type: "text",
        content: {
          title: "Unser Vorgehen",
          text: "Wir arbeiten in mehreren Phasen: Analyse, Konzeption, Entwicklung, Implementierung und Nachbetreuung. Jede Phase wird eng mit Ihnen abgestimmt, um optimale Ergebnisse zu erzielen."
        },
        order: 4
      },
      {
        id: createId(),
        type: "pricing",
        content: {
          title: "Investition",
          items: [
            {
              description: "Analyse & Konzeption",
              price: 2500,
              unit: "pauschal"
            },
            {
              description: "Entwicklung",
              price: 6000,
              unit: "pauschal"
            },
            {
              description: "Implementierung",
              price: 3500,
              unit: "pauschal"
            },
            {
              description: "Schulung",
              price: 1200,
              unit: "pauschal"
            },
            {
              description: "Support & Wartung",
              price: 800,
              unit: "monatlich"
            }
          ]
        },
        order: 5
      },
      {
        id: createId(),
        type: "contact",
        content: {
          title: "Ihr Projektteam",
          contact: {
            name: "Anna Schmidt",
            position: "Projektleiterin",
            email: "anna@nohype-ai.de",
            phone: "+49 123 4567890"
          }
        },
        order: 6
      }
    ]
  },
  {
    id: "kompakte-broschuere",
    name: "Kompakte Broschüre",
    description: "Kurze Broschüre für allgemeine Produktinformationen",
    documentType: 'brochure',
    sections: [
      {
        id: createId(),
        type: "header",
        content: {
          title: "NoHype KI-Lösungen",
          subtitle: "Intelligente Technologien für moderne Unternehmen",
          date: new Date().toLocaleDateString('de-DE')
        },
        order: 0
      },
      {
        id: createId(),
        type: "text",
        content: {
          title: "Unser Unternehmen",
          text: "NoHype entwickelt KI-basierte Softwarelösungen, die es Unternehmen ermöglichen, Prozesse zu automatisieren, Daten effizienter zu nutzen und bessere Entscheidungen zu treffen. Seit unserer Gründung haben wir zahlreiche Unternehmen verschiedener Branchen bei ihrer digitalen Transformation unterstützt."
        },
        order: 1
      },
      {
        id: createId(),
        type: "text",
        content: {
          title: "Unsere Dienstleistungen",
          text: "Wir bieten ein breites Spektrum an Dienstleistungen: KI-basierte Prozessautomatisierung, Datenanalyse, Chatbots, Vorhersagemodelle, Computer Vision und maßgeschneiderte KI-Lösungen für spezifische Geschäftsanforderungen."
        },
        order: 2
      },
      {
        id: createId(),
        type: "caseStudy",
        content: {
          caseStudyId: 0
        },
        order: 3
      },
      {
        id: createId(),
        type: "contact",
        content: {
          title: "Kontaktieren Sie uns",
          contact: {
            name: "NoHype Team",
            position: "KI-Lösungen",
            email: "info@nohype-ai.de",
            phone: "+49 175 9481994"
          }
        },
        order: 4
      }
    ]
  },
  {
    id: "umfangreiche-broschuere",
    name: "Umfangreiche Broschüre",
    description: "Detaillierte Informationsbroschüre mit Inhaltsverzeichnis",
    documentType: 'brochure',
    useTableOfContents: true,
    sections: [
      {
        id: createId(),
        type: "header",
        content: {
          title: "KI-Lösungen für die Zukunft",
          subtitle: "Unsere Technologien im Überblick",
          date: new Date().toLocaleDateString('de-DE')
        },
        order: 0
      },
      {
        id: createId(),
        type: "text",
        content: {
          title: "Über NoHype",
          text: "NoHype ist ein innovatives Technologieunternehmen, spezialisiert auf die Entwicklung und Implementierung von KI-basierten Lösungen. Unsere Mission ist es, die Leistungsfähigkeit künstlicher Intelligenz für Unternehmen jeder Größe zugänglich zu machen und echten Mehrwert zu schaffen."
        },
        order: 1
      },
      {
        id: createId(),
        type: "text",
        content: {
          title: "Unsere Expertise",
          text: "Mit jahrelanger Erfahrung in den Bereichen maschinelles Lernen, Computer Vision und natürliche Sprachverarbeitung bieten wir eine umfassende Palette von Dienstleistungen, die auf die spezifischen Bedürfnisse unserer Kunden zugeschnitten sind."
        },
        order: 2
      },
      {
        id: createId(),
        type: "text",
        content: {
          title: "Chatbots & Virtuelle Assistenten",
          text: "Unsere KI-gestützten Chatbots und virtuellen Assistenten automatisieren Kundensupport, interne Kommunikation und Prozesse. Sie lernen kontinuierlich aus Interaktionen und verbessern sich stetig."
        },
        order: 3
      },
      {
        id: createId(),
        type: "caseStudy",
        content: {
          caseStudyId: 0
        },
        order: 4
      },
      {
        id: createId(),
        type: "text",
        content: {
          title: "Datenanalyse & Prognosemodelle",
          text: "Unsere Analysewerkzeuge verwandeln Rohdaten in wertvolle Erkenntnisse. Mit fortschrittlichen Algorithmen identifizieren wir Muster, Trends und Korrelationen, die mit herkömmlichen Methoden schwer zu erkennen sind."
        },
        order: 5
      },
      {
        id: createId(),
        type: "caseStudy",
        content: {
          caseStudyId: 1
        },
        order: 6
      },
      {
        id: createId(),
        type: "text",
        content: {
          title: "Computer Vision",
          text: "Unsere Computer Vision-Lösungen ermöglichen es Computern, Bilder und Videos ähnlich wie Menschen zu interpretieren und zu verstehen. Dies eröffnet zahlreiche Anwendungsmöglichkeiten in Bereichen wie Qualitätskontrolle, Sicherheit und Prozessautomatisierung."
        },
        order: 7
      },
      {
        id: createId(),
        type: "text",
        content: {
          title: "Unser Ansatz",
          text: "Wir arbeiten eng mit unseren Kunden zusammen, um deren spezifische Herausforderungen zu verstehen und individuell angepasste Lösungen zu entwickeln. Unser agiler Ansatz ermöglicht schnelle Anpassungen und kontinuierliche Verbesserungen."
        },
        order: 8
      },
      {
        id: createId(),
        type: "contact",
        content: {
          title: "Kontaktieren Sie uns",
          contact: {
            name: "NoHype Team",
            position: "KI-Lösungen",
            email: "info@nohype-ai.de",
            phone: "+49 175 9481994"
          }
        },
        order: 9
      }
    ]
  },
  {
    id: "branchenspezifische-broschuere",
    name: "Branchenspezifische Broschüre",
    description: "Angepasste Broschüre für spezielle Branchen wie Immobilien",
    documentType: 'brochure',
    useTableOfContents: true,
    sections: [
      {
        id: createId(),
        type: "header",
        content: {
          title: "KI-Lösungen für die Immobilienbranche",
          subtitle: "Digitale Transformation für moderne Immobilienunternehmen",
          date: new Date().toLocaleDateString('de-DE')
        },
        order: 0
      },
      {
        id: createId(),
        type: "text",
        content: {
          title: "Revolutionieren Sie Ihr Immobiliengeschäft",
          text: "Die Immobilienbranche steht vor tiefgreifenden Veränderungen durch digitale Technologien. NoHype bietet spezialisierte KI-Lösungen, die Immobilienunternehmen dabei unterstützen, diese Herausforderungen zu meistern und Wachstumschancen zu nutzen."
        },
        order: 1
      },
      {
        id: createId(),
        type: "text",
        content: {
          title: "Virtuelle Besichtigungen",
          text: "Unsere KI-gestützten virtuellen Besichtigungslösungen ermöglichen potenziellen Käufern und Mietern, Immobilien bequem von zu Hause aus zu erkunden. Mit interaktiven 3D-Modellen und intelligenten Empfehlungssystemen revolutionieren wir die Art und Weise, wie Immobilien präsentiert werden."
        },
        order: 2
      },
      {
        id: createId(),
        type: "text",
        content: {
          title: "Preisanalyse und -prognose",
          text: "Unsere fortschrittlichen Algorithmen analysieren Marktdaten und liefern präzise Bewertungen von Immobilien. Diese Technologie ermöglicht es Immobilienunternehmen, optimale Verkaufspreise festzulegen und Markttrends vorherzusagen."
        },
        order: 3
      },
      {
        id: createId(),
        type: "text",
        content: {
          title: "Kundensegmentierung",
          text: "Mit unseren KI-basierten Lösungen können Immobilienunternehmen ihre Kundendaten effizienter nutzen. Durch präzise Segmentierung werden Marketing- und Vertriebsaktivitäten gezielt auf die Bedürfnisse verschiedener Kundengruppen ausgerichtet."
        },
        order: 4
      },
      {
        id: createId(),
        type: "text",
        content: {
          title: "Property Management",
          text: "Automatisierte Prozesse für die Immobilienverwaltung sparen Zeit und reduzieren Fehler. Von der Mieterzufriedenheit über Instandhaltung bis hin zur Finanzverwaltung – unsere Lösungen optimieren den gesamten Verwaltungsprozess."
        },
        order: 5
      },
      {
        id: createId(),
        type: "contact",
        content: {
          title: "Ihr Ansprechpartner für die Immobilienbranche",
          contact: {
            name: "Thomas Weber",
            position: "Branchenexperte Immobilien",
            email: "immobilien@nohype-ai.de",
            phone: "+49 175 9481994"
          }
        },
        order: 6
      }
    ]
  }
];
