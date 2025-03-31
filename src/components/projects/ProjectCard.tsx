
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "./types";

interface ProjectCardProps {
  project: Project;
  index: number;
  selectedIndex: number;
  slidesInView: number[];
  onViewDetails: (project: Project) => void;
}

const ProjectCard = ({ 
  project, 
  index, 
  selectedIndex, 
  slidesInView, 
  onViewDetails 
}: ProjectCardProps) => {
  return (
    <div 
      className={cn(
        "h-full transition-all duration-500 ease-out transform",
        selectedIndex === index 
          ? "scale-100 opacity-100 z-10" 
          : slidesInView.includes(index) 
            ? "scale-[0.85] opacity-60 z-0" 
            : "scale-[0.75] opacity-30 z-0"
      )}
    >
      <Card 
        className={cn(
          "bg-gradient-to-br from-[#0A0A0A] to-[#1A1F35] border transition-all duration-300 h-full overflow-hidden group",
          selectedIndex === index 
            ? "border-primary/60 shadow-[0_0_15px_rgba(255,0,153,0.2)]" 
            : "border-[#1A1A1A] hover:border-primary/30"
        )}
      >
        <div className="p-5 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className={cn(
                "w-12 h-12 rounded-md flex items-center justify-center text-primary border transition-all duration-300 shrink-0",
                selectedIndex === index 
                  ? "bg-[#1A1F35]/80 border-primary" 
                  : "bg-[#1A1F35] border-primary/40 group-hover:border-primary"
              )}
            >
              {project.year}
            </div>
            <div className="text-sm text-gray-400">{project.industry}</div>
          </div>
          <h3 className="text-xl font-semibold text-primary mb-3">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-4 mb-4 flex-grow">
            {project.overview}
          </p>
          <Button 
            variant="ghost" 
            className="mt-auto self-start group-hover:text-primary hover:bg-primary/10 transition-all duration-300"
            onClick={() => onViewDetails(project)}
          >
            Details anzeigen
            <ExternalLink size={16} className="ml-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProjectCard;
