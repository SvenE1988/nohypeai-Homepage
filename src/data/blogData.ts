
export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
}

export interface BlogSection {
  category: string;
  posts: BlogPost[];
}

export const blogPosts: BlogSection[] = [
  {
    category: "Praxistipps",
    posts: [
      {
        title: "KI für kleine und mittelständische Unternehmen: Praktische Anwendungsfälle und Vorteile",
        excerpt: "Ein Überblick darüber, wie KMUs durch gezielte KI-Anwendungen profitieren und ihre Prozesse effizienter gestalten können.",
        date: "18. Juli 2024",
        category: "Praxistipps",
        tags: ["KI", "KMU", "Digitalisierung", "Praxisbeispiele"]
      },
      {
        title: "Wie läuft ein KI-Projekt mit noHype AI ab? Persönliche Insights von noHype-Gründer Sven",
        excerpt: "Erfahre Schritt für Schritt, wie KI-Projekte erfolgreich umgesetzt werden – mit ehrlichen Einblicken vom Gründer Sven und dem Gedanken hinter noHype AI.",
        date: "5. August 2024",
        category: "Praxistipps",
        tags: ["KI-Projekte", "noHype AI", "Zusammenarbeit", "Insights"]
      },
      {
        title: "Erfolgreiche Einführung von KI-Lösungen: Tipps aus der Praxis",
        excerpt: "Praktische Ratschläge für die erfolgreiche Einführung und Nutzung von KI.",
        date: "27. März 2025",
        category: "Praxistipps",
        tags: ["KI-Lösungen", "Praxis", "Implementierung"]
      }
    ],
  },
  {
    category: "Case Studies",
    posts: [
      {
        title: "Dynamische Chatbots für eine bessere Kundeninteraktion (Purainvest)",
        excerpt: "Wie dynamische Chatbots Kundenerlebnisse optimieren und interne Prozesse effizienter gestalten.",
        date: "2. September 2024",
        category: "Case Study",
        tags: ["Chatbots", "Kundenerlebnis", "Digitalisierung"]
      },
      {
        title: "Integration von Beraterrechnern für effiziente Immobilienfinanzierung (Purainvest)",
        excerpt: "Automatisierte Kundenrechner erleichtern Prozesse und steigern die Zufriedenheit bei der Immobilienfinanzierung.",
        date: "23. November 2024",
        category: "Case Study",
        tags: ["Automatisierung", "Immobilienfinanzierung", "Effizienz"]
      },
      {
        title: "Automatisierte Angebotserstellung mit SEVDESK: Von 48 Stunden auf wenige Minuten (Wesa-Solar)",
        excerpt: "Erfahre, wie Automatisierung administrative Prozesse beschleunigt und Vertriebseffizienz steigert.",
        date: "21. Januar 2025",
        category: "Case Study",
        tags: ["Automatisierung", "Angebotserstellung", "SEVDESK"]
      },
      {
        title: "Voice-Agenten im Vertrieb: Automatische Qualifizierung und Terminvereinbarung (Wesa-Solar)",
        excerpt: "Automatisierte Sprachassistenten als Schlüssel zur Effizienzsteigerung im Vertrieb kleiner und mittlerer Unternehmen.",
        date: "14. Februar 2025",
        category: "Case Study",
        tags: ["Voice-Agenten", "Vertrieb", "Automatisierung"]
      }
    ],
  },
  {
    category: "Sprachagenten im Focus",
    posts: [
      {
        title: "Warum Sprachagenten der nächste Schritt für KMUs sind",
        excerpt: "Entdecke die Einsatzmöglichkeiten und Vorteile von Sprachagenten.",
        date: "3. März 2025",
        category: "Sprachagenten im Focus",
        tags: ["Sprachagenten", "KMU", "Digitalisierung"]
      },
    ],
  },
];
