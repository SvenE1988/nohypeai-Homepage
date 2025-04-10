
import React from "react";
import { PricingItem } from "../types";

interface PricingSectionContent {
  title: string;
  items: PricingItem[];
}

interface PricingSectionProps {
  content: PricingSectionContent;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ content }) => {
  const calculateTotal = () => {
    return content.items
      .filter(item => !item.unit || !item.unit.includes("pro"))
      .reduce((sum, item) => sum + item.price, 0);
  };
  
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold text-secondary mb-4">{content.title}</h3>
      
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-2 text-left text-gray-700">Beschreibung</th>
            <th className="py-2 text-right text-gray-700">Preis (EUR)</th>
            <th className="py-2 text-right text-gray-700">Einheit</th>
          </tr>
        </thead>
        <tbody>
          {content.items.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-3 text-gray-700">{item.description}</td>
              <td className="py-3 text-right text-gray-700">{item.price.toLocaleString('de-DE')}</td>
              <td className="py-3 text-right text-gray-500">{item.unit || 'einmalig'}</td>
            </tr>
          ))}
          <tr className="bg-gray-50">
            <td className="py-3 font-semibold text-gray-800">Summe (einmalige Kosten)</td>
            <td className="py-3 text-right font-semibold text-gray-800">
              {calculateTotal().toLocaleString('de-DE')}
            </td>
            <td className="py-3 text-right text-gray-500">EUR</td>
          </tr>
        </tbody>
      </table>
      
      <p className="text-sm text-gray-500">
        Alle Preise verstehen sich zuzüglich der gesetzlichen Mehrwertsteuer.
      </p>
    </div>
  );
};
