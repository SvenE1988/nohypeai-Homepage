
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/neon-button';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  benefits: string[];
  targetAudience: string;
}

const FeatureCard = ({ title, subtitle, benefits, targetAudience }: FeatureCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full">
      <motion.div 
        className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-black/60 to-black/40 border border-gray-800 hover:border-primary/50 transition-all duration-300 group hover:scale-[1.03]"
        layout
      >
        {/* Main Card Content */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-300 mb-4">{subtitle}</p>
          
          <Button
            variant="ghost"
            className="w-full justify-between group-hover:bg-primary/10"
            onClick={() => setIsExpanded(!isExpanded)}
            neon={true}
          >
            <span>Mehr erfahren</span>
            <ChevronDown 
              className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            />
          </Button>
        </div>

        {/* Expandable Section */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-800"
            >
              <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">Nutzen</h4>
                    <ul className="space-y-2">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-300">
                          <span className="text-primary mt-1">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">Für wen?</h4>
                    <p className="text-gray-300">{targetAudience}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FeatureCard;
