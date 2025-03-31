
import { Badge } from "./ui/badge";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import ProjectCarousel from "./projects/ProjectCarousel";
import ProjectDetails from "./projects/ProjectDetails";
import { Project } from "./projects/types";
import { projectsData } from "./projects/ProjectsData";

const Projects = () => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (project: Project) => {
    setCurrentProject(project);
    setIsDetailsOpen(true);
  };

  return (
    <section id="projekte" className="w-full py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/70 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Badge variant="outline" className="text-primary border-primary">
            Projekte
          </Badge>
        </div>
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Erfolgsgeschichten unserer Kunden
        </h2>

        <ProjectCarousel 
          projects={projectsData} 
          onViewDetails={handleViewDetails} 
        />

        <AnimatePresence>
          {isDetailsOpen && currentProject && (
            <ProjectDetails 
              project={currentProject} 
              isOpen={isDetailsOpen} 
              onClose={() => setIsDetailsOpen(false)} 
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
