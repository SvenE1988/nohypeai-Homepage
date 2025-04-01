
export interface JobPosting {
  id: string;
  title: string;
  type: string;
  location: string;
  postedDate: string;
  shortDescription: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  skills: string[];
}

export const jobPostings: JobPosting[] = [
  {
    id: "frontend-developer",
    title: "Automatisierungsentwickler (m/w/d)",
    type: "Vollzeit",
    location: "Remote / Karlsruhe",
    postedDate: "24.02.2025",
    shortDescription: "Wir suchen einen engagierten Automatisierungsentwickler, der unser Team verstärkt und innovative KI-gestützte Automatisierungslösungen für unsere Kunden entwickelt.",
    responsibilities: [
      "Entwicklung von Automatisierungslösungen mit Tools wie n8n, Zapier, Make.com und anderen Low-Code-Plattformen",
      "Konzeption und Implementierung von KI-gestützten Automatisierungsprozessen für unsere Kunden",
      "Integration von APIs für KI-Dienste (OpenAI, Google AI, etc.) in bestehende Workflows",
      "Entwicklung intelligenter Workflows für die Verarbeitung natürlicher Sprache",
      "Analyse bestehender Kundenprozesse und Identifikation von Automatisierungspotenzialen",
      "Kombination verschiedener Systeme zu funktionierenden End-to-End-Automatisierungslösungen",
      "Testing, Debugging und kontinuierliche Verbesserung der Automatisierungssysteme",
      "Enge Zusammenarbeit mit Kunden zur Erstellung maßgeschneiderter Lösungen",
      "Dokumentation der entwickelten Lösungen und Erstellung von Schulungsunterlagen"
    ],
    requirements: [
      "Abgeschlossenes Studium im Bereich Informatik oder eine vergleichbare Qualifikation",
      "Praktische Erfahrung in der Automatisierung von Prozessen und Workflows",
      "Kenntnisse in Programmiersprachen wie Python, JavaScript oder TypeScript",
      "Erfahrung mit No-Code/Low-Code-Plattformen wie n8n, Make.com oder Zapier",
      "Verständnis von API-Integrationen und Webservices",
      "Erfahrung mit ChatGPT, OpenAI-API oder anderen KI-Diensten",
      "Erfahrung mit Versionskontrollsystemen (z.B. Git)",
      "Analytisches Denkvermögen und kreative Problemlösungsfähigkeiten",
      "Zielorientierte und autonome Arbeitsweise",
      "Fähigkeit, komplexe Systeme zu verstehen und zu optimieren",
      "Ausgezeichnete Kommunikationsfähigkeiten in Deutsch und Englisch"
    ],
    benefits: [
      "Flexible Arbeitszeiten und vollständig remote oder aus unserem Büro in Karlsruhe",
      "Arbeit an innovativen KI-Projekten mit direktem Kundennutzen",
      "Flache Hierarchien und direkte Kommunikationswege",
      "Die Möglichkeit, die Zukunft der Prozessautomatisierung aktiv mitzugestalten",
      "Kontinuierliche Weiterbildungsmöglichkeiten im KI-Bereich",
      "Teil eines dynamischen Teams mit einer klaren Vision: KI ohne Hype, mit echtem Mehrwert",
      "Modernes Arbeitsumfeld mit neuester Technologie",
      "Wettbewerbsfähige Vergütung"
    ],
    skills: ["Low-Code", "n8n", "Make.com", "Zapier", "API-Integration", "ChatGPT", "KI-Integration", "Automatisierung"]
  },
  {
    id: "backend-developer",
    title: "Backend Entwickler (m/w/d)",
    type: "Vollzeit",
    location: "Remote / Karlsruhe",
    postedDate: "24.02.2025",
    shortDescription: "Wir suchen einen talentierten Backend-Entwickler, der unser Entwicklungsteam bei der Erstellung skalierbarer Systeme und der Integration von KI-Diensten unterstützt.",
    responsibilities: [
      "Entwicklung und Implementierung robuster Backend-Lösungen für unsere KI-basierten Anwendungen",
      "Design und Verwaltung von Datenbankstrukturen (SQL, NoSQL) für optimale Leistung",
      "Implementierung von APIs, die eine nahtlose Kommunikation zwischen Frontend und Backend ermöglichen",
      "Integration von KI-Modellen und Large Language Models in Backend-Systeme",
      "Implementierung von Sicherheitsprotokollen und Authentifizierungssystemen",
      "Serverkonfiguration und Performance-Optimierung für KI-intensive Anwendungen",
      "Nutzung von Technologien wie Caching und Containerisierung für skalierbare Systeme",
      "Zusammenarbeit mit Frontend-Entwicklern und KI-Spezialisten",
      "Durchführung von Code-Reviews und Sicherstellung der Code-Qualität",
      "Wartung und kontinuierliche Verbesserung bestehender Systeme"
    ],
    requirements: [
      "Abgeschlossenes Studium im Bereich Informatik oder eine vergleichbare Qualifikation",
      "Nachgewiesene Berufserfahrung als Backend-Entwickler",
      "Ausgezeichnete Programmierkenntnisse in Node.js, Python oder einer anderen modernen Backend-Sprache",
      "Umfassende Kenntnisse in Datenbanktechnologien (SQL, NoSQL)",
      "Erfahrung mit Server- und Cloud-Infrastrukturen (AWS, Azure, Google Cloud)",
      "Kenntnisse in API-Design und -Entwicklung für KI-Dienste",
      "Erfahrung mit Versionskontrollsystemen (Git) und CI/CD-Pipelines",
      "Kenntnisse in IT-Sicherheit und Best Practices",
      "Verständnis von Skalierbarkeits- und Performance-Optimierungstechniken",
      "Analytisches Denkvermögen und strukturierte Arbeitsweise",
      "Ausgezeichnete Kommunikationsfähigkeiten in Deutsch und Englisch"
    ],
    benefits: [
      "Flexible Arbeitszeiten und vollständig remote oder aus unserem Büro in Karlsruhe",
      "Arbeit an innovativen KI-Projekten mit direktem Kundennutzen",
      "Flache Hierarchien und direkte Kommunikationswege",
      "Die Möglichkeit, die technische Infrastruktur von noHype.ai aktiv mitzugestalten",
      "Kontinuierliche Weiterbildungsmöglichkeiten im KI- und Backend-Bereich",
      "Teil eines dynamischen Teams mit einer klaren Vision: KI ohne Hype, mit echtem Mehrwert",
      "Modernes Arbeitsumfeld mit neuester Technologie",
      "Wettbewerbsfähige Vergütung"
    ],
    skills: ["Node.js", "Python", "APIs", "Datenbanken", "Cloud", "Docker", "CI/CD", "KI-Integration"]
  }
];
