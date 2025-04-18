
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "./types";

interface ProjectCardProps {
  project: Project;
  isActive?: boolean;
  onViewDetails: (project: Project) => void;
}

const ProjectCard = ({ 
  project, 
  isActive = false, 
  onViewDetails 
}: ProjectCardProps) => {
  return (
    <Card 
      className={cn(
        "bg-gradient-to-br from-black/60 to-black/40 border transition-all duration-300 h-full overflow-hidden group",
        isActive 
          ? "border-primary/60 shadow-[0_0_15px_rgba(255,0,153,0.2)]" 
          : "border-gray-800 hover:border-primary/50 hover:scale-[1.02]"
      )}
    >
      <div className="p-5 h-full flex flex-col">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div 
              className={cn(
                "flex-shrink-0 rounded-md flex items-center justify-center text-primary border transition-all duration-300",
                isActive 
                  ? "bg-primary/20 border-primary" 
                  : "bg-primary/10 border-primary/40 group-hover:border-primary group-hover:bg-primary/20",
                "px-3 py-1.5 text-sm"
              )}
            >
              {project.year}
            </div>
            <div className="text-sm text-gray-400">{project.industry}</div>
          </div>
          
          {project.logoUrl && (
            <div className="flex-shrink-0">
              <img 
                src={project.logoUrl} 
                alt={`${project.company} Logo`}
                className="h-8 w-auto"
                style={{
                  aspectRatio: project.logoAspectRatio,
                  display: "block",
                  objectFit: "contain"
                }}
              />
            </div>
          )}
        </div>
        <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-gray-300 text-sm line-clamp-4 mb-4 flex-grow">
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
  );
};

export default ProjectCard;
