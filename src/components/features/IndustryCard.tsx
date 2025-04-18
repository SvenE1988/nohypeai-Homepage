
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInAnimation } from '@/utils/animation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '../ui/neon-button';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface IndustryCardProps {
  icon: LucideIcon;
  title: string;
  problem: string;
  pain: string;
  solutions: string[];
}

const IndustryCard = ({ icon: Icon, title, problem, pain, solutions }: IndustryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div {...fadeInAnimation} className="w-full">
      <Card className="h-full bg-gradient-to-br from-black/60 to-black/40 hover:from-primary/10 hover:to-secondary/10 border border-gray-800 hover:border-primary/50 transition-all duration-300">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-primary/80 mb-1">Problem:</p>
            <p className="text-gray-200">{problem}</p>
          </div>
          
          <Button
            variant="ghost"
            className="w-full justify-between"
            onClick={() => setIsExpanded(!isExpanded)}
            neon={true}
          >
            <span>Details anzeigen</span>
            <ChevronDown className={cn(
              "transition-transform duration-300",
              isExpanded ? "rotate-180" : ""
            )} />
          </Button>

          <div className={cn(
            "space-y-4 transition-all duration-300",
            isExpanded ? "block" : "hidden"
          )}>
            <div>
              <p className="text-primary/80 mb-1">Pain Point:</p>
              <p className="text-gray-200">{pain}</p>
            </div>
            <div>
              <p className="text-primary/80 mb-1">Lösungen:</p>
              <ul className="list-none space-y-2">
                {solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-gray-200">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IndustryCard;
