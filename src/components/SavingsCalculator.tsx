import { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SavingsCalculator = () => {
  const [hours, setHours] = useState([20]);
  const [rate, setRate] = useState([50]);
  const [savings, setSavings] = useState(0);

  const calculateSavings = () => {
    const weeklySavings = hours[0] * rate[0];
    setSavings(weeklySavings);
  };

  useEffect(() => {
    calculateSavings();
  }, [hours, rate]);

  return (
    <section id="einsparungen" className="w-full py-16 bg-gradient-to-b from-black/90 to-black/50">
      <div className="container mx-auto px-4">
        <Card className="max-w-xl mx-auto bg-black/40 backdrop-blur-sm border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-8 text-white text-center">
              Einsparungen durch KI-Automatisierung
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm text-gray-200">
                  Erwartete eingesparte Stunden pro Woche:
                </label>
                <Slider
                  value={hours}
                  onValueChange={setHours}
                  max={40}
                  step={1}
                  className="py-2"
                />
                <span className="text-2xl font-semibold text-white block">
                  {hours[0]}
                </span>
              </div>

              <div className="space-y-3">
                <label className="text-sm text-gray-200">
                  Kosten pro Arbeitsstunde (€):
                </label>
                <Slider
                  value={rate}
                  onValueChange={setRate}
                  max={200}
                  step={5}
                  className="py-2"
                />
                <span className="text-2xl font-semibold text-white block">
                  {rate[0]} €
                </span>
              </div>

              <div className="pt-4">
                <h3 className="text-lg text-gray-200 mb-2">
                  Deine wöchentliche Ersparnis:
                </h3>
                <p className="text-3xl font-bold text-primary">
                  {savings.toFixed(2)} €
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SavingsCalculator;