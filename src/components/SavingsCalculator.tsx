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
    <section className="w-full py-24 bg-gradient-to-b from-black/90 to-black/50">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto bg-black/40 backdrop-blur-sm border-gray-800">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-12 text-white text-center">
              Einsparungen durch KI-Automatisierung
            </h2>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-lg text-gray-200">
                  Erwartete eingesparte Stunden pro Woche:
                </label>
                <Slider
                  value={hours}
                  onValueChange={setHours}
                  max={40}
                  step={1}
                  className="py-4"
                />
                <span className="text-3xl font-semibold text-white block mt-2">
                  {hours[0]}
                </span>
              </div>

              <div className="space-y-4">
                <label className="text-lg text-gray-200">
                  Kosten pro Arbeitsstunde (€):
                </label>
                <Slider
                  value={rate}
                  onValueChange={setRate}
                  max={200}
                  step={5}
                  className="py-4"
                />
                <span className="text-3xl font-semibold text-white block mt-2">
                  {rate[0]} €
                </span>
              </div>

              <div className="pt-8">
                <h3 className="text-xl text-gray-200 mb-4">
                  Deine wöchentliche Ersparnis:
                </h3>
                <p className="text-4xl font-bold text-primary">
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