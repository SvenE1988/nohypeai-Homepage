import { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const SavingsCalculator = () => {
  const [hours, setHours] = useState([20]);
  const [rate, setRate] = useState([50]);
  const [savings, setSavings] = useState({
    weekly: 0,
    monthly: 0,
    yearly: 0
  });

  const calculateSavings = () => {
    const weeklySavings = hours[0] * rate[0];
    const monthlySavings = weeklySavings * 4;
    const yearlySavings = monthlySavings * 12;
    
    setSavings({
      weekly: weeklySavings,
      monthly: monthlySavings,
      yearly: yearlySavings
    });
  };

  useEffect(() => {
    calculateSavings();
  }, [hours, rate]);

  return (
    <section id="einsparungen" className="w-full py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
          Berechnen Sie Ihre{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            KI-Einsparungen
          </span>
        </h2>
        
        <Card className="max-w-5xl mx-auto bg-black/40 backdrop-blur-sm border-gray-800">
          <CardContent className="p-4 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left column - Input area */}
              <div className="space-y-6 md:space-y-8">
                <div className="space-y-4">
                  <label className="text-base md:text-lg text-gray-200">
                    Erwartete eingesparte Stunden pro Woche:
                  </label>
                  <Slider
                    value={hours}
                    onValueChange={setHours}
                    max={40}
                    step={1}
                    className="py-4"
                  />
                  <span className="text-2xl md:text-3xl font-semibold text-white block">
                    {hours[0]} Stunden
                  </span>
                </div>

                <div className="space-y-4">
                  <label className="text-base md:text-lg text-gray-200">
                    Kosten pro Arbeitsstunde (€):
                  </label>
                  <Slider
                    value={rate}
                    onValueChange={setRate}
                    max={200}
                    step={5}
                    className="py-4"
                  />
                  <span className="text-2xl md:text-3xl font-semibold text-white block">
                    {rate[0]} €
                  </span>
                </div>
              </div>

              {/* Right column - Results area */}
              <div className="space-y-4 md:space-y-6 p-4 md:p-6 bg-white/5 rounded-xl">
                <h3 className="text-lg md:text-xl text-gray-200 mb-4 md:mb-6">
                  Ihre potentiellen Einsparungen:
                </h3>
                
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between p-3 md:p-4 bg-black/20 rounded-lg">
                    <span className="text-sm md:text-base text-gray-300">Wöchentlich:</span>
                    <span className="text-xl md:text-2xl font-bold text-primary">
                      {savings.weekly.toLocaleString()} €
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 md:p-4 bg-black/20 rounded-lg">
                    <span className="text-sm md:text-base text-gray-300">Monatlich:</span>
                    <span className="text-xl md:text-2xl font-bold text-primary">
                      {savings.monthly.toLocaleString()} €
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 md:p-4 bg-black/20 rounded-lg">
                    <span className="text-sm md:text-base text-gray-300">Jährlich:</span>
                    <span className="text-2xl md:text-3xl font-bold text-primary">
                      {savings.yearly.toLocaleString()} €
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-4 md:mt-6 text-base md:text-lg py-4 md:py-6"
                  variant="default"
                >
                  Kostenloses Erstgespräch vereinbaren
                  <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 md:mt-12">
          <Button 
            variant="secondary"
            size="lg"
            className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6"
          >
            Jetzt Beratungstermin sichern
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;