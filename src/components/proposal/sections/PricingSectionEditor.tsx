
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingItem } from "../types";

interface PricingSectionContent {
  title: string;
  items: PricingItem[];
}

interface PricingSectionEditorProps {
  content: PricingSectionContent;
  onChange: (content: PricingSectionContent) => void;
}

export const PricingSectionEditor: React.FC<PricingSectionEditorProps> = ({ content, onChange }) => {
  const updateItem = (index: number, item: PricingItem) => {
    const newItems = [...content.items];
    newItems[index] = item;
    onChange({ ...content, items: newItems });
  };
  
  const removeItem = (index: number) => {
    const newItems = content.items.filter((_, i) => i !== index);
    onChange({ ...content, items: newItems });
  };
  
  const addItem = () => {
    onChange({
      ...content,
      items: [...content.items, { description: "Neue Position", price: 0, unit: "pauschal" }]
    });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Titel</label>
        <input
          type="text"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-400">Preispositionen</label>
          <Button 
            onClick={addItem} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus size={14} /> Hinzufügen
          </Button>
        </div>
        
        {content.items.map((item, index) => (
          <div key={index} className="flex gap-2 mb-3">
            <div className="flex-grow">
              <input
                type="text"
                value={item.description}
                onChange={(e) => updateItem(index, { ...item, description: e.target.value })}
                className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white mb-1"
                placeholder="Beschreibung"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => updateItem(index, { ...item, price: parseFloat(e.target.value) })}
                  className="w-1/2 bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
                  placeholder="Preis"
                />
                <input
                  type="text"
                  value={item.unit || ''}
                  onChange={(e) => updateItem(index, { ...item, unit: e.target.value })}
                  className="w-1/2 bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
                  placeholder="Einheit (z.B. pro Stunde)"
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
              className="h-10 w-10 text-red-500 hover:text-red-400 hover:bg-red-500/10 self-start"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
