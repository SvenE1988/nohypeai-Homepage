
import React from "react";
import { ArrowLeft, Briefcase, Calendar, MapPin, Share2 } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NavHeader from "../components/blocks/nav-header";
import Footer from "../components/Footer";
import { jobPostings } from "@/data/jobData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/neon-button";
import { useToast } from "@/hooks/use-toast";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Job mit der angegebenen ID finden
  const job = jobPostings.find(job => job.id === id);
  
  // Wenn kein Job gefunden wurde, zur Karriere-Übersicht zurückleiten
  if (!job) {
    navigate("/karriere");
    return null;
  }
  
  // Funktion zum Kopieren des Job-Links in die Zwischenablage
  const shareJob = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        toast({
          title: "Link kopiert!",
          description: "Der Link wurde in die Zwischenablage kopiert.",
          duration: 3000,
        });
      })
      .catch(err => {
        console.error("Fehler beim Kopieren des Links:", err);
        toast({
          title: "Fehler beim Kopieren",
          description: "Der Link konnte nicht kopiert werden.",
          variant: "destructive",
          duration: 3000,
        });
      });
  };

  return (
    <div className="min-h-screen bg-black">
      <NavHeader />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="flex items-center justify-between mb-12">
          <Link 
            to="/karriere" 
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück zu allen Stellenangeboten
          </Link>
          
          <Button 
            onClick={shareJob}
            className="flex items-center gap-2 text-white/60 hover:text-white"
            variant="ghost"
          >
            <Share2 className="w-5 h-5" />
            Teilen
          </Button>
        </div>

        <article className="max-w-4xl mx-auto bg-gradient-to-br from-[#0A0A0A] to-[#1A1F35] border border-white/10 rounded-xl p-8 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Badge 
              variant="outline" 
              className="bg-primary/10 text-primary border-primary/30"
            >
              <Briefcase className="w-3 h-3 mr-1" />
              {job.type}
            </Badge>
            
            <div className="flex items-center gap-1 text-white/60 text-sm">
              <MapPin className="w-3 h-3" />
              <span>{job.location}</span>
            </div>
            
            <div className="flex items-center gap-1 text-white/60 text-sm">
              <Calendar className="w-3 h-3" />
              <span>Veröffentlicht am {job.postedDate}</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {job.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {job.skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-white/5 text-primary/90 hover:bg-white/10 border-primary/20"
              >
                {skill}
              </Badge>
            ))}
          </div>
          
          {/* Job-Beschreibung */}
          <div className="text-white/80 leading-relaxed space-y-6 mb-10">
            {job.aboutUs && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Über uns:</h3>
                <p className="text-white/80">{job.aboutUs}</p>
              </div>
            )}
            
            {job.role && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Ihre Rolle:</h3>
                <p className="text-white/80">{job.role}</p>
              </div>
            )}
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Ihre Aufgaben:</h3>
              <ul className="list-disc pl-5 space-y-2">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="text-white/80">{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Ihr Profil:</h3>
              <ul className="list-disc pl-5 space-y-2">
                {job.requirements.map((item, index) => (
                  <li key={index} className="text-white/80">{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Was wir bieten:</h3>
              <ul className="list-disc pl-5 space-y-2">
                {job.benefits.map((item, index) => (
                  <li key={index} className="text-white/80">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Button
              className="w-full sm:w-auto px-8 py-3 text-base"
              onClick={() => {
                document.querySelector('button[onClick="setContactDialogOpen(true)"]')?.dispatchEvent(
                  new MouseEvent('click', { bubbles: true })
                );
              }}
            >
              Jetzt bewerben
            </Button>
            
            <Button
              variant="ghost" 
              className="w-full sm:w-auto px-8 py-3 text-base"
              onClick={shareJob}
            >
              Stelle teilen
            </Button>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default JobDetails;
