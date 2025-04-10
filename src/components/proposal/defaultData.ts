
import { v4 as uuidv4 } from "uuid";
import { Proposal, ProposalTemplate } from "./types";

export const defaultProposal: Proposal = {
  id: uuidv4(),
  title: "Angebot",
  clientName: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  sections: [
    {
      id: uuidv4(),
      type: "header",
      content: {
        title: "Angebot zur KI-Integration",
        subtitle: "Erstellt für Ihren Geschäftserfolg",
        date: new Date().toLocaleDateString('de-DE')
      },
      order: 0
    },
    {
      id: uuidv4(),
      type: "text",
      content: {
        title: "Über uns",
        text: "NoHype ist Ihr Partner für zukunftsweisende KI-Lösungen. Wir unterstützen Unternehmen dabei, ihre Geschäftsprozesse zu optimieren und echten Mehrwert durch künstliche Intelligenz zu schaffen."
      },
      order: 1
    },
    {
      id: uuidv4(),
      type: "pricing",
      content: {
        title: "Unsere Leistungen",
        items: [
          {
            description: "Beratung & Konzeption",
            price: 2500,
            unit: "pauschal"
          },
          {
            description: "Implementierung",
            price: 7500,
            unit: "pauschal"
          },
          {
            description: "Support & Wartung",
            price: 750,
            unit: "monatlich"
          }
        ]
      },
      order: 2
    },
    {
      id: uuidv4(),
      type: "contact",
      content: {
        title: "Ihr Ansprechpartner",
        contact: {
          name: "Sven Erkens",
          position: "Geschäftsführer",
          email: "se@nohype-ai.de",
          phone: "+49 175 9481994",
          profileImage: "/lovable-uploads/53242408-166e-4bd6-89db-0295c8e032ca.png"
        }
      },
      order: 3
    }
  ],
  useCoverPage: true
};

export const proposalTemplates: ProposalTemplate[] = [
  {
    id: "automation-proposal",
    name: "Geschäftsprozessautomatisierung",
    description: "Standardvorlage für Automatisierungsprojekte mit KI",
    hasCoverPage: true,
    sections: [
      {
        id: uuidv4(),
        type: "header",
        content: {
          title: "Angebot zur Geschäftsprozessautomatisierung",
          subtitle: "Erstellt für [Kundenname]",
          date: new Date().toLocaleDateString('de-DE')
        },
        order: 0
      },
      {
        id: uuidv4(),
        type: "text",
        content: {
          title: "Über uns",
          text: "NoHype ist Ihr Partner für KI-gestützte Prozessautomatisierung. Wir helfen Ihnen dabei, Ihre Geschäftsprozesse zu optimieren und zu automatisieren, um Zeit und Kosten zu sparen."
        },
        order: 1
      },
      {
        id: uuidv4(),
        type: "caseStudy",
        content: {
          caseStudyId: 0
        },
        order: 2
      },
      {
        id: uuidv4(),
        type: "text",
        content: {
          title: "Unser Ansatz",
          text: "Wir identifizieren zunächst die Prozesse, die das größte Optimierungspotenzial bieten. Anschließend entwickeln wir maßgeschneiderte Lösungen, die genau auf Ihre Bedürfnisse zugeschnitten sind."
        },
        order: 3
      },
      {
        id: uuidv4(),
        type: "pricing",
        content: {
          title: "Investition",
          items: [
            {
              description: "Initiale Analyse",
              price: 2500,
              unit: "pauschal"
            },
            {
              description: "Entwicklung der Automatisierungslösung",
              price: 15000,
              unit: "pauschal"
            },
            {
              description: "Monatliche Wartung und Support",
              price: 750,
              unit: "pro Monat"
            }
          ]
        },
        order: 4
      },
      {
        id: uuidv4(),
        type: "contact",
        content: {
          title: "Kontakt",
          contact: {
            name: "Sven Erkens",
            position: "Geschäftsführer",
            email: "se@nohype-ai.de",
            phone: "+49 175 9481994",
            profileImage: "/lovable-uploads/53242408-166e-4bd6-89db-0295c8e032ca.png"
          }
        },
        order: 5
      }
    ]
  },
  {
    id: "consulting-proposal",
    name: "KI-Beratung",
    description: "Vorlage für KI-Beratungsprojekte",
    hasCoverPage: true,
    sections: [
      {
        id: uuidv4(),
        type: "header",
        content: {
          title: "Angebot zur KI-Beratung",
          subtitle: "Erstellt für [Kundenname]",
          date: new Date().toLocaleDateString('de-DE')
        },
        order: 0
      },
      {
        id: uuidv4(),
        type: "text",
        content: {
          title: "Herausforderungen der KI-Integration",
          text: "Die Integration von künstlicher Intelligenz in bestehende Geschäftsprozesse stellt viele Unternehmen vor große Herausforderungen. Unsere Beratung unterstützt Sie bei der Identifikation der richtigen Lösungen für Ihr Unternehmen."
        },
        order: 1
      },
      {
        id: uuidv4(),
        type: "techStack",
        content: {
          title: "Unser Tech Stack",
          showDescription: true
        },
        order: 2
      },
      {
        id: uuidv4(),
        type: "savings",
        content: {
          title: "Potenzielle Einsparungen durch KI"
        },
        order: 3
      },
      {
        id: uuidv4(),
        type: "pricing",
        content: {
          title: "Beratungspaket",
          items: [
            {
              description: "KI-Readiness Assessment",
              price: 4500,
              unit: "pauschal"
            },
            {
              description: "Strategie-Workshop (2 Tage)",
              price: 6000,
              unit: "pauschal"
            },
            {
              description: "Umsetzungsplanung",
              price: 3500,
              unit: "pauschal"
            }
          ]
        },
        order: 4
      },
      {
        id: uuidv4(),
        type: "testimonial",
        content: {
          title: "Kundenstimmen",
          maxDisplay: 2
        },
        order: 5
      },
      {
        id: uuidv4(),
        type: "contact",
        content: {
          title: "Ihr Berater",
          contact: {
            name: "Sven Erkens",
            position: "Geschäftsführer",
            email: "se@nohype-ai.de",
            phone: "+49 175 9481994",
            profileImage: "/lovable-uploads/53242408-166e-4bd6-89db-0295c8e032ca.png"
          }
        },
        order: 6
      }
    ]
  },
  {
    id: "tech-stack-proposal",
    name: "KI-Tech-Stack",
    description: "Vorlage für Tech-Stack-Empfehlungen",
    hasCoverPage: true,
    sections: [
      {
        id: uuidv4(),
        type: "header",
        content: {
          title: "Tech-Stack Empfehlung",
          subtitle: "Erstellt für [Kundenname]",
          date: new Date().toLocaleDateString('de-DE')
        },
        order: 0
      },
      {
        id: uuidv4(),
        type: "text",
        content: {
          title: "Ausgangssituation",
          text: "Basierend auf unserer Analyse Ihrer aktuellen IT-Landschaft und Geschäftsziele haben wir einen optimalen Tech-Stack für Ihre KI-Integration zusammengestellt."
        },
        order: 1
      },
      {
        id: uuidv4(),
        type: "techStack",
        content: {
          title: "Empfohlene Technologien",
          showDescription: true
        },
        order: 2
      },
      {
        id: uuidv4(),
        type: "image",
        content: {
          src: "/lovable-uploads/27ffae7e-aa7e-410a-8f02-c0729294e221.png",
          alt: "Tech Stack Visualisierung",
          caption: "Übersicht der empfohlenen Technologien und ihre Zusammenhänge"
        },
        order: 3
      },
      {
        id: uuidv4(),
        type: "pricing",
        content: {
          title: "Implementierungskosten",
          items: [
            {
              description: "Basisimplementierung",
              price: 18500,
              unit: "pauschal"
            },
            {
              description: "Lizenzen (jährlich)",
              price: 9600,
              unit: "pro Jahr"
            },
            {
              description: "Schulung des Teams",
              price: 4800,
              unit: "pauschal"
            }
          ]
        },
        order: 4
      },
      {
        id: uuidv4(),
        type: "savings",
        content: {
          title: "ROI-Berechnung"
        },
        order: 5
      },
      {
        id: uuidv4(),
        type: "contact",
        content: {
          title: "Technischer Ansprechpartner",
          contact: {
            name: "Sven Erkens",
            position: "Geschäftsführer",
            email: "se@nohype-ai.de",
            phone: "+49 175 9481994",
            profileImage: "/lovable-uploads/53242408-166e-4bd6-89db-0295c8e032ca.png"
          }
        },
        order: 6
      }
    ]
  }
];
