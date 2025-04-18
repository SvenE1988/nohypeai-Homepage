
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInAnimation } from '@/utils/animation';
import { BaseCard } from '@/components/ui/base-card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '../ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface IndustryCardProps {
  icon: LucideIcon;
  title: string;
  problem: string;
  pain: string;
  solutions: string[];
}

const IndustryCard = ({ icon: Icon, title, problem, pain, solutions }: IndustryCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div {...fadeInAnimation} className="w-full">
      <BaseCard className="h-full">
        <div>
          <div className="flex items-center gap-4 pb-2">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>

          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-1">Problem:</p>
              <p className="text-gray-200">{problem}</p>
            </div>
            
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost"
                className="w-full justify-between text-primary border border-[#3A3F55] bg-[#252A40] hover:bg-primary/20 transition-colors duration-300"
              >
                <span>{isOpen ? "Weniger anzeigen" : "Mehr anzeigen"}</span>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-4 pt-4 bg-[#252A40]/80 mt-4 p-4 rounded-lg border border-[#3A3F55]">
              <div>
                <p className="text-gray-400 text-sm mb-1">Pain Point:</p>
                <p className="text-gray-200">{pain}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Lösungen:</p>
                <ul className="list-disc list-inside space-y-2">
                  {solutions.map((solution, index) => (
                    <li key={index} className="text-gray-200 text-sm">
                      <span className="text-primary mr-2">•</span>
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </BaseCard>
    </motion.div>
  );
};

export default IndustryCard;
