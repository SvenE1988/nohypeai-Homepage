import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface Project {
  year: string;
  industry: string;
  title: string;
  overview: string;
  challenge: string;
  solution: string;
  result: string;
}

const Projects = () => {
  const projects: Project[] = [
    {
      year: "2024",
      industry: "Versicherungsbranche",
      title: "KI Email Automatisierung",
      overview:
        "In diesem Erfahrungsbericht zeigen wir, wie ein Versicherungsmakler seinen Arbeitsalltag revolutionierte, indem er eine KI-basierte E-Mail-Automatisierung einführte. Durch den Einsatz eines Systems, das E-Mails automatisch analysiert, priorisiert und Antworten erstellt, konnte der Makler seine Effizienz steigern, seinen Kundenservice verbessern und sich auf das Wesentliche konzentrieren.",
      challenge:
        "Manuelles Bearbeiten von E-Mails führte zu langen Bearbeitungszeiten, unübersichtlichen Prioritäten und einem eingeschränkten Fokus auf Kundenberatung.",
      solution:
        "Implementierung einer KI-gestützten E-Mail-Automatisierung, die eingehende Nachrichten priorisiert, Antworten vorbereitet und tägliche Berichte über den Posteingang erstellt.",
      result:
        "Bearbeitungszeiten wurden um 80% reduziert, die Übersichtlichkeit der E-Mails verbessert und der Versicherungsmakler konnte sich wieder verstärkt auf seine Kunden konzentrieren – mit zusätzlicher Freizeit am Ende des Tages.",
    },
    {
      year: "2024",
      industry: "Handwerksbranche",
      title: "Voice AI Lead Vorqualifizierung",
      overview:
        "In diesem Erfahrungsbericht zeigen wir, wie ein Handwerksunternehmen seine Lead-Qualifizierung revolutionierte, indem es einen KI-gestützten Outbound Caller einsetzte. Das System kontaktierte neue Leads unmittelbar nach ihrer Anmeldung über ein Kontaktformular oder eine Meta-Ad, führte strukturierte Gespräche, qualifizierte die Leads anhand gezielter Fragen und übermittelte die Ergebnisse samt Ranking per E-Mail an den Geschäftsführer.",
      challenge:
        "Manuelle Nachverfolgung von Leads führte zu Verzögerungen, einer ungleichen Priorisierung und verpassten Chancen, potenzielle Kunden schnell zu erreichen und für sich zu gewinnen.",
      solution:
        "Implementierung eines KI-gestützten Outbound Callers, der Leads automatisch kurz nach ihrer Anmeldung kontaktiert, Fragen zur Qualifizierung stellt, die Ergebnisse rankt und den Geschäftsführer in Echtzeit per E-Mail benachrichtigt.",
      result:
        "Die Zeit bis zur ersten Kontaktaufnahme wurde um 90% reduziert, die Lead-Qualität erheblich gesteigert und der Geschäftsführer konnte sich auf die besten und vielversprechendsten Anfragen konzentrieren.",
    },
  ];

  return (
    <section className="w-full bg-black py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Badge variant="outline" className="text-primary border-primary">
            Projekte
          </Badge>
        </div>
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Ausschnitte unserer Arbeit
        </h2>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-[#0A0A0A] border-[#1A1A1A] overflow-hidden"
            >
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#1A1F35] flex items-center justify-center text-primary border border-primary">
                        {project.year}
                      </div>
                      <div className="text-gray-400">{project.industry}</div>
                    </div>
                    <h3 className="text-2xl font-semibold text-primary">
                      {project.title}
                    </h3>
                    <div className="text-gray-400">
                      <h4 className="font-medium mb-2">Overview:</h4>
                      <p className="leading-relaxed">{project.overview}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-white">Challenge:</h4>
                      <p className="text-gray-400 leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-white">Solution:</h4>
                      <p className="text-gray-400 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-white">Result:</h4>
                      <p className="text-gray-400 leading-relaxed">
                        {project.result}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;