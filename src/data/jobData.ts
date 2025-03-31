
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
    title: "Frontend Entwickler (m/w/d)",
    type: "Vollzeit",
    location: "Remote / Berlin",
    postedDate: "01.07.2024",
    shortDescription: "Wir suchen einen erfahrenen Frontend-Entwickler mit Kenntnissen in Automatisierungstools wie make.com, n8n und ChatGPT-Integration.",
    responsibilities: [
      "Entwicklung und Pflege von benutzerfreundlichen Web-Oberflächen für unsere KI-basierten Lösungen",
      "Integration von KI-Automatisierungstools (make.com, n8n, etc.) in bestehende Anwendungen",
      "Implementierung von ChatGPT und anderen LLM-APIs in Kundenanwendungen",
      "Zusammenarbeit mit Backend-Entwicklern und UI/UX-Designern",
      "Optimierung der Anwendungen für maximale Geschwindigkeit und Skalierbarkeit"
    ],
    requirements: [
      "Umfangreiche Erfahrung in modernen Frontend-Technologien (React, Vue.js, etc.)",
      "Erfahrung mit Automatisierungsplattformen wie make.com, n8n, Retool oder ähnlichen Tools",
      "Praktische Erfahrung in der Integration von KI-APIs (insbesondere OpenAI/ChatGPT)",
      "Solide Kenntnisse in HTML, CSS, JavaScript/TypeScript",
      "Verständnis von UI/UX-Design-Prinzipien",
      "Erfahrung mit Git und modernen Entwicklungs-Workflows",
      "Fähigkeit, technische Konzepte klar zu kommunizieren",
      "Deutsch und Englisch in Wort und Schrift"
    ],
    benefits: [
      "Flexible Arbeitszeiten und Remote-Arbeitsoptionen",
      "Arbeit an innovativen KI-Projekten mit direktem Kundennutzen",
      "Flache Hierarchien und schnelle Entscheidungswege",
      "Kontinuierliche Weiterbildungsmöglichkeiten im KI-Bereich",
      "Wettbewerbsfähige Vergütung",
      "Modernes Arbeitsumfeld mit neuester Technologie"
    ],
    skills: ["React", "TypeScript", "make.com", "n8n", "ChatGPT", "API-Integration", "Automatisierung"]
  },
  {
    id: "backend-developer",
    title: "Backend Entwickler (m/w/d)",
    type: "Vollzeit / Teilzeit",
    location: "Remote / Berlin",
    postedDate: "01.07.2024",
    shortDescription: "Wir suchen einen Backend-Entwickler mit Erfahrung in der Entwicklung skalierbarer Systeme und der Integration von KI-Diensten.",
    responsibilities: [
      "Entwicklung und Optimierung unserer Backend-Systeme für KI-Anwendungen",
      "Implementierung und Verwaltung von Datenbanken und APIs",
      "Integration von Machine Learning-Modellen und KI-Diensten",
      "Sicherstellung der Skalierbarkeit, Zuverlässigkeit und Leistung unserer Systeme",
      "Technische Dokumentation und Code-Reviews"
    ],
    requirements: [
      "Erfahrung in der Backend-Entwicklung mit Python, Node.js oder ähnlichen Technologien",
      "Gute Kenntnisse in der Arbeit mit APIs und Datenbanken",
      "Erfahrung mit der Integration von KI-Diensten und Machine Learning-Modellen",
      "Verständnis von Cloud-Plattformen (AWS, GCP, Azure)",
      "Kenntnisse in Docker, Kubernetes oder anderen Container-Technologien",
      "Vertrautheit mit agilen Entwicklungsmethoden",
      "Deutsch und Englisch in Wort und Schrift"
    ],
    benefits: [
      "Flexible Arbeitszeiten und Remote-Arbeitsoptionen",
      "Arbeit an innovativen KI-Projekten mit direktem Kundennutzen",
      "Flache Hierarchien und schnelle Entscheidungswege",
      "Kontinuierliche Weiterbildungsmöglichkeiten im KI-Bereich",
      "Wettbewerbsfähige Vergütung",
      "Modernes Arbeitsumfeld mit neuester Technologie"
    ],
    skills: ["Python", "Node.js", "APIs", "Datenbanken", "Docker", "Cloud", "Machine Learning"]
  }
];
