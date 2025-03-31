export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  content?: string; // Neues Feld für den vollständigen Artikelinhalt
  customSlug?: string; // Neues Feld für benutzerdefinierte URL-Slugs
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
        tags: ["KI-Lösungen", "Praxis", "Implementierung"],
        content: "Die Einführung von KI ist kein Selbstläufer – aber gut geplant auch kein Hexenwerk. Entscheidend ist, nicht mit dem Tool zu starten, sondern mit dem Problem.\n\n**Drei Tipps aus unserer Praxis:**\n\n- Fokussiere dich auf einen echten Schmerzpunkt – das spart Diskussionen.\n- Starte klein, aber konkret – ein klar umrissener Use Case liefert greifbare Ergebnisse.\n- Hole Mitarbeitende früh ins Boot – Akzeptanz entscheidet über Erfolg oder Scheitern.\n\nOb automatisierte Kommunikation, Angebotserstellung oder Datenanalyse – KI entfaltet ihr Potenzial dann, wenn sie Prozesse verbessert statt verkompliziert. Und genau dabei unterstützen wir unsere Kunden Schritt für Schritt."
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
        tags: ["Automatisierung", "Angebotserstellung", "SEVDESK"],
        content: "Vor der Automatisierung lief die Angebotserstellung bei Wesa-Solar klassisch: Der Außendienst erfasste Kundeninformationen, die dann manuell vom Innendienst in ein Angebot überführt wurden – oft mit Verzögerungen von bis zu zwei Tagen.\n\nHeute läuft das deutlich effizienter. Über ein zentrales Formularsystem kann der Außendienst direkt vor Ort alle relevanten Informationen erfassen. Diese fließen automatisiert in die Angebotsstrecke, die mit SEVDESK verbunden ist.\n\nIn weniger als zwei Minuten – außer bei Sonderfällen – steht das fertige Angebot. Der Innendienst erhält automatisch eine Kopie, die direkt im System abgelegt wird.\n\n**Ergebnis:** Höhere Geschwindigkeit, weniger Fehler, bessere Nachverfolgbarkeit. Die Vertriebsperformance hat messbar zugelegt."
      },
      {
        title: "Voice-Agenten im Vertrieb: Automatische Qualifizierung und Terminvereinbarung (Wesa-Solar)",
        excerpt: "Automatisierte Sprachassistenten als Schlüssel zur Effizienzsteigerung im Vertrieb kleiner und mittlerer Unternehmen.",
        date: "14. Februar 2025",
        category: "Case Study",
        tags: ["Voice-Agenten", "Vertrieb", "Automatisierung"],
        content: "Bei Wesa-Solar fehlte eine konstante Vorqualifizierung von Leads – oft abhängig von Auslastung und manueller Nachverfolgung.\n\nHeute übernimmt das ein KI-gestützter Voice-Agent: Er kontaktiert Interessent:innen automatisiert, stellt gezielte Fragen zur Bedarfsklärung und vereinbart bei positiver Bewertung direkt einen Termin.\n\nDie Integration erfolgt nahtlos ins CRM-System (Bitrix24). Leads werden je nach Status direkt in die passende Pipeline eingesteuert.\n\n**Die Vorteile:** Gleichmäßige Auslastung des Vertriebs, klare Datenlage, professionelle Erstansprache – und deutlich weniger verlorene Leads."
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
        tags: ["Sprachagenten", "KMU", "Digitalisierung"],
        content: "Sprachagenten sind längst nicht mehr nur Spielerei großer Konzerne. Auch kleine und mittlere Unternehmen können von dieser Technologie profitieren – besonders in Bereichen mit hohem Kommunikationsaufwand.\n\n**Typische Einsatzgebiete:**\n\n- Handwerksbetriebe: Terminanfragen automatisch beantworten und einplanen\n- Immobilienmakler: Interessenten vorqualifizieren, Besichtigungen abstimmen\n- Finanzdienstleister: Informationen abfragen und strukturiert erfassen\n\n**Technisch basiert** ein moderner Sprachagent auf Spracherkennung, NLP (Natural Language Processing) und Anbindung an CRM-Systeme. Die Systeme arbeiten rund um die Uhr, skalieren flexibel und ermöglichen einen reibungslosen Dialog – oft sogar mehrsprachig.\n\n**Ergebnis für KMUs:** Weniger manuelle Kommunikation, strukturiertere Prozesse, zufriedene Kunden – und das ohne zusätzliches Personal."
      }
    ],
  },
];
