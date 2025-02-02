import { Avatar } from "./ui/avatar";
import { Linkedin, Youtube } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Niklas",
      role: "Gründer & Inhaber",
      image: "/placeholder.svg",
      linkedin: "#",
      youtube: "#"
    },
    {
      name: "Benedikt",
      role: "Gründer & Inhaber",
      image: "/placeholder.svg",
      linkedin: "#",
      youtube: "#"
    }
  ];

  return (
    <section id="ueber-uns" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <span className="text-primary mb-4 block text-center">Über Uns</span>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {team.map((member, index) => (
            <div key={index} className="bg-[#0D0F1A] rounded-2xl p-6">
              <Avatar className="w-full h-[300px] rounded-xl mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </Avatar>
              <h3 className="text-2xl font-semibold text-white mb-2">
                {member.name}
              </h3>
              <p className="text-gray-400 mb-4">{member.role}</p>
              <div className="flex gap-4 justify-center">
                <a href={member.linkedin} className="text-gray-400 hover:text-primary">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={member.youtube} className="text-gray-400 hover:text-primary">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Über Uns
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Wir sind eine Automatisierungsagentur aus Heidelberg und haben uns darauf spezialisiert, 
              Unternehmen wie deinem den Alltag zu erleichtern. Mit modernsten Tools wie Make, 
              Relevance und Co. schaffen wir Freiräume, damit du dich auf Kunden, Ideen und Wachstum 
              konzentrieren kannst.
            </p>
            <p className="text-gray-400 leading-relaxed mt-4">
              Seit 2023 entwickeln wir Lösungen, die Vertriebs-, Support- und Arbeitsprozesse 
              schneller und effizienter machen. Gemeinsam finden wir heraus, wie wir auch dein 
              Unternehmen digitalisieren können.
            </p>
          </div>
          <div className="bg-[#0D0F1A] rounded-2xl p-6">
            <img
              src="/placeholder.svg"
              alt="Team"
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
