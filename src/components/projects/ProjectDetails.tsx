
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Project } from "./types";
import { X, Calendar } from "lucide-react";

interface ProjectDetailsProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetails = ({ project, isOpen, onClose }: ProjectDetailsProps) => {
  if (!isOpen || !project) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1F35] border border-primary/20 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-primary border border-primary p-2 rounded-lg bg-[#1A1F35]/50">
              <Calendar size={16} />
              <span>{project.year}</span>
            </div>
            <div>
              <div className="text-gray-400 text-sm">{project.industry}</div>
              <h3 className="text-2xl font-bold text-primary">
                {project.title}
              </h3>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-primary/10 text-primary"
            onClick={onClose}
          >
            <X size={20} />
            <span className="sr-only">Schließen</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium text-white mb-3">Überblick</h4>
            <p className="text-gray-300 leading-relaxed mb-6">{project.overview}</p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-white mb-2">Challenge</h4>
              <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Solution</h4>
              <p className="text-gray-300 leading-relaxed">{project.solution}</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Result</h4>
              <p className="text-gray-300 leading-relaxed">{project.result}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetails;
