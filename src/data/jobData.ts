
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
  aboutUs?: string;
  role?: string;
}

export const jobPostings: JobPosting[] = [
  {
    id: "automatisierungsentwickler",
    title: "Automatisierungsentwickler/in (m/w/d)",
    type: "Vollzeit",
    location: "Remote / Karlsruhe",
    postedDate: "24.02.2025",
    aboutUs: "Mit unseren Sprachbots und intelligenten Automatisierungslösungen helfen wir Unternehmen, ihre Prozesse zu optimieren und neue Möglichkeiten zu erschließen. Für die Weiterentwicklung unserer Automatisierungsplattform suchen wir eine technisch versierte Person, die unser Team verstärkt.",
    role: "Als Automatisierungsentwickler/in sind Sie die treibende Kraft hinter unseren intelligenten Prozesslösungen. Sie identifizieren Automatisierungspotenziale, entwickeln kreative Lösungsansätze und setzen diese mit modernsten Tools um. Dabei verbinden Sie verschiedene Systeme zu nahtlosen Workflows und sorgen dafür, dass unsere KI-Komponenten optimal in bestehende Prozesse integriert werden.",
    shortDescription: "Wir suchen einen engagierten Automatisierungsentwickler, der unser Team verstärkt und innovative KI-gestützte Automatisierungslösungen für unsere Kunden entwickelt.",
    responsibilities: [
      "Entwicklung intelligenter Automatisierungslösungen unter Verwendung von Tools wie n8n, Zapier und Make.com",
      "Integration von KI-Diensten (OpenAI, Google AI, etc.) in Automatisierungsworkflows",
      "Analyse bestehender Prozesse und Identifikation von Optimierungspotenzialen",
      "Implementierung von Workflows für die Verarbeitung natürlicher Sprache",
      "Testing und kontinuierliche Verbesserung der entwickelten Systeme",
      "Zusammenarbeit mit Stakeholdern zur Anforderungsanalyse und Lösungsimplementierung",
      "Dokumentation und Wissenstransfer für entwickelte Lösungen"
    ],
    requirements: [
      "Erfahrung mit Programmiersprachen wie Python oder JavaScript",
      "Kenntnisse in der Arbeit mit Automatisierungstools und Workflow-Plattformen",
      "Verständnis von API-Integrationen und Webservices",
      "Erfahrung mit Versionskontrollsystemen (Git)",
      "Analytisches Denkvermögen und kreative Problemlösungsfähigkeiten",
      "Selbstständige und strukturierte Arbeitsweise",
      "Lernbereitschaft und Interesse an neuen Technologien",
      "Teamfähigkeit und gute Kommunikationsfähigkeiten"
    ],
    benefits: [
      "Dynamisches Arbeitsumfeld mit flachen Hierarchien und kurzen Entscheidungswegen",
      "Flexible Arbeitszeiten und vollständig remote oder aus unserem Büro in Karlsruhe",
      "Arbeit an innovativen KI-Projekten mit direktem Kundennutzen",
      "Kontinuierliche Weiterbildungsmöglichkeiten im KI-Bereich",
      "Teil eines dynamischen Teams mit einer klaren Vision: KI ohne Hype, mit echtem Mehrwert",
      "Modernes Arbeitsumfeld mit neuester Technologie",
      "Wettbewerbsfähige Vergütung"
    ],
    skills: ["n8n", "Zapier", "Make.com", "Python", "JavaScript", "API-Integration", "KI-Dienste", "Automatisierung"]
  },
  {
    id: "backend-developer",
    title: "Backend-Entwickler/in (m/w/d)",
    type: "Vollzeit",
    location: "Remote / Karlsruhe",
    postedDate: "24.02.2025",
    aboutUs: "Mit unseren Sprachbots, intelligenten Datenbanksystemen und RAG-Anwendungen helfen wir Unternehmen, ihre Prozesse zu optimieren und neue Möglichkeiten zu erschließen. Für die Weiterentwicklung unserer technischen Infrastruktur suchen wir eine/n erfahrene/n Backend-Entwickler/in.",
    role: "Als Backend-Entwickler/in sind Sie verantwortlich für das Herzstück unserer Anwendungen. Sie entwickeln robuste, skalierbare Systeme, die unsere KI-Lösungen zum Leben erwecken, und sorgen dafür, dass Daten effizient verarbeitet und bereitgestellt werden. Mit Ihrem technischen Know-how tragen Sie maßgeblich zur Qualität und Performance unserer Produkte bei.",
    shortDescription: "Wir suchen einen talentierten Backend-Entwickler, der unser Entwicklungsteam bei der Erstellung skalierbarer Systeme und der Integration von KI-Diensten unterstützt.",
    responsibilities: [
      "Entwicklung und Wartung skalierbarer Backend-Systeme mit modernen Technologien und Frameworks",
      "Design und Implementierung von APIs, die eine nahtlose Kommunikation zwischen verschiedenen Systemkomponenten ermöglichen",
      "Integration von KI-Modellen in bestehende Backend-Strukturen",
      "Optimierung von Datenbankstrukturen für effiziente Abfragen und Datenintegrität",
      "Implementierung von Sicherheitsprotokollen zum Schutz sensibler Daten",
      "Performance-Optimierung für schnelle Antwortzeiten und hohe Verfügbarkeit",
      "Zusammenarbeit mit Frontend-Entwicklern zur Integration von Benutzeroberflächen"
    ],
    requirements: [
      "Fundierte Kenntnisse in mindestens einer Backend-Programmiersprache (z.B. Node.js, Python, Java)",
      "Erfahrung mit Datenbanktechnologien (SQL, NoSQL)",
      "Kenntnisse in API-Design und -Entwicklung",
      "Verständnis von Cloud-Infrastrukturen und Serverarchitekturen",
      "Erfahrung mit Versionskontrollsystemen und CI/CD-Pipelines",
      "Analytisches Denkvermögen und strukturierte Arbeitsweise",
      "Qualitätsbewusstsein und Liebe zum Detail",
      "Proaktive Problemlösungsfähigkeit",
      "Teamfähigkeit und gute Kommunikationsfähigkeiten"
    ],
    benefits: [
      "Dynamisches Arbeitsumfeld mit flachen Hierarchien und kurzen Entscheidungswegen",
      "Flexible Arbeitszeiten und vollständig remote oder aus unserem Büro in Karlsruhe",
      "Arbeit an innovativen KI-Projekten mit direktem Kundennutzen",
      "Kontinuierliche Weiterbildungsmöglichkeiten im KI- und Backend-Bereich",
      "Teil eines dynamischen Teams mit einer klaren Vision: KI ohne Hype, mit echtem Mehrwert",
      "Modernes Arbeitsumfeld mit neuester Technologie",
      "Wettbewerbsfähige Vergütung"
    ],
    skills: ["Node.js", "Python", "Java", "APIs", "Docker", "Cloud", "Datenbanken", "CI/CD", "KI-Integration"]
  }
];
