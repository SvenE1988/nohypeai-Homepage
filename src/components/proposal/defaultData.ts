
import { Proposal, ProposalSection, ProposalTemplate } from "./types";
import { v4 as uuidv4 } from "uuid";

export const defaultProposal: Proposal = {
  id: uuidv4(),
  title: "Geschäftsprozessautomatisierung Angebot",
  clientName: "Beispiel GmbH",
  clientLogo: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  sections: [
    {
      id: uuidv4(),
      type: "header",
      content: {
        title: "Angebot zur Geschäftsprozessautomatisierung",
        subtitle: "Erstellt für Beispiel GmbH",
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
        caseStudyId: 0 // Index des ersten Fallbeispiels im projectsData Array
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
          { description: "Initiale Analyse", price: 2500, unit: "pauschal" },
          { description: "Entwicklung der Automatisierungslösung", price: 15000, unit: "pauschal" },
          { description: "Monatliche Wartung und Support", price: 750, unit: "pro Monat" }
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
          phone: "+49 175 9481994"
        }
      },
      order: 5
    }
  ]
};

export const proposalTemplates: ProposalTemplate[] = [
  {
    id: uuidv4(),
    name: "Standard Angebot",
    description: "Eine vollständige Angebotsvorlage mit allen wichtigen Sektionen",
    sections: defaultProposal.sections
  },
  {
    id: uuidv4(),
    name: "Kurzes Angebot",
    description: "Ein kompaktes Angebot für eilige Kunden",
    sections: defaultProposal.sections.filter(section => 
      section.type === 'header' || section.type === 'pricing' || section.type === 'contact'
    )
  },
  {
    id: uuidv4(),
    name: "Fallstudien Fokus",
    description: "Ein Angebot mit Fokus auf Erfolgsgeschichten",
    sections: [
      ...defaultProposal.sections.filter(section => section.type === 'header'),
      ...defaultProposal.sections.filter(section => section.type === 'caseStudy'),
      ...defaultProposal.sections.filter(section => section.type === 'pricing'),
      ...defaultProposal.sections.filter(section => section.type === 'contact')
    ]
  }
];
