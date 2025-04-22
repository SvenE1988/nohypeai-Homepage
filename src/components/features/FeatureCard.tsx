
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BaseCard } from '@/components/ui/base-card';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  benefits: string[];
  targetAudience: string;
}

const FeatureCard = ({ title, subtitle, benefits, targetAudience }: FeatureCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <BaseCard className="w-full" active={isExpanded}>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm mb-4">{subtitle}</p>
        
        <Button
          variant="ghost"
          className="w-full justify-between group-hover:bg-primary/10 text-primary border border-[#3A3F55] bg-[#252A40] transition-all duration-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-sm">Mehr Details</span>
          <ChevronDown 
            className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </Button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-[#3A3F55]"
          >
            <div className="p-6 bg-[#252A40]/80">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">Nutzen</h4>
                  <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-primary mt-1">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">Für wen?</h4>
                  <p className="text-gray-300 text-sm">{targetAudience}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BaseCard>
  );
};

export default FeatureCard;
