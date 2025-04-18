
import { ReactNode } from 'react';
import { Building, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInAnimation } from '@/utils/animation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface IndustryCardProps {
  icon: LucideIcon;
  title: string;
  problem: string;
  pain: string;
  solutions: string[];
}

const IndustryCard = ({ icon: Icon, title, problem, pain, solutions }: IndustryCardProps) => {
  return (
    <motion.div {...fadeInAnimation} className="w-full">
      <Card className="h-full bg-gradient-to-br from-black/60 to-black/40 border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] group">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-gray-400 mb-1">Problem:</p>
            <p className="text-gray-200">{problem}</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Pain Point:</p>
            <p className="text-gray-200">{pain}</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Lösungen:</p>
            <ul className="list-disc list-inside space-y-1">
              {solutions.map((solution, index) => (
                <li key={index} className="text-gray-200">{solution}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IndustryCard;
