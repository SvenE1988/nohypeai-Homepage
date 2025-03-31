
import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JobPosting } from "@/data/jobData";
import { Button } from "@/components/ui/neon-button";

interface JobCardProps {
  job: JobPosting;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <article className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1F35] border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary">{job.type}</span>
        </div>
        <div className="flex items-center gap-2 text-white/60">
          <span className="text-xs flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {job.postedDate}
          </span>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-3">
        {job.title}
      </h3>
      
      <div className="flex items-center gap-1 text-white/60 mb-4 text-sm">
        <MapPin className="w-3 h-3" />
        <span>{job.location}</span>
      </div>
      
      <p className="text-white/70 text-sm mb-4">
        {job.shortDescription}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-5">
        {job.skills.map((skill, index) => (
          <Badge 
            key={index} 
            variant="outline" 
            className="bg-white/5 text-primary/90 hover:bg-white/10 border-primary/20 text-xs"
          >
            {skill}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-auto">
        <Link 
          to={`/karriere/${job.id}`}
          className="text-primary hover:text-white transition-colors self-start group flex items-center"
        >
          Details anzeigen
          <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="text-white"
          onClick={() => {
            document.querySelector('button[onClick="setContactDialogOpen(true)"]')?.dispatchEvent(
              new MouseEvent('click', { bubbles: true })
            );
          }}
        >
          Bewerben
        </Button>
      </div>
    </article>
  );
};

export default JobCard;
