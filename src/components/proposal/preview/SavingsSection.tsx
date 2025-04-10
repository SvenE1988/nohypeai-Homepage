
import React from "react";
import { SavingsCalculatorData } from "@/hooks/useWebsiteContent";

interface SavingsSectionContent {
  title?: string;
  calculatorData: SavingsCalculatorData;
  hours?: number;
  rate?: number;
}

interface SavingsSectionProps {
  content: SavingsSectionContent;
}

export const SavingsSection: React.FC<SavingsSectionProps> = ({ content }) => {
  const { 
    title = "Potenzielle Einsparungen", 
    calculatorData,
    hours = calculatorData.defaultHours,
    rate = calculatorData.defaultRate
  } = content;
  
  // Berechnungen
  const weeklySavings = hours * rate;
  const monthlySavings = weeklySavings * 4;
  const yearlySavings = monthlySavings * 12;
  
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold text-secondary mb-4">{title}</h3>
      
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Wöchentliche Einsparung</p>
            <p className="text-xl font-bold text-primary">{weeklySavings.toLocaleString()} €</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Monatliche Einsparung</p>
            <p className="text-xl font-bold text-primary">{monthlySavings.toLocaleString()} €</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Jährliche Einsparung</p>
            <p className="text-xl font-bold text-primary">{yearlySavings.toLocaleString()} €</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-500">Eingesparte Stunden pro Woche</p>
            <p className="text-lg font-medium">{hours} Stunden</p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-500">Stundensatz</p>
            <p className="text-lg font-medium">{rate} € / Stunde</p>
          </div>
        </div>
      </div>
    </div>
  );
};
