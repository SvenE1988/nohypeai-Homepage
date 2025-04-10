
import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ProposalSection } from "../types";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2 } from "lucide-react";
import { SectionEditor } from "../sections/SectionEditor";

interface SectionListProps {
  sections: ProposalSection[];
  handleDragEnd: (result: any) => void;
  removeSection: (id: string) => void;
  onChange: (section: ProposalSection) => void;
}

export const SectionList: React.FC<SectionListProps> = ({
  sections,
  handleDragEnd,
  removeSection,
  onChange
}) => {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {sections.map((section, index) => (
              <Draggable key={section.id} draggableId={section.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="bg-black/30 border border-white/10 rounded-lg p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div {...provided.dragHandleProps} className="mr-2 cursor-grab">
                          <GripVertical className="text-gray-400" size={16} />
                        </div>
                        <h3 className="text-white font-medium capitalize text-sm">
                          {section.type} Sektion
                        </h3>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeSection(section.id)}
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-8 w-8"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    <div className="text-sm">
                      <SectionEditor 
                        section={section} 
                        onChange={onChange} 
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
