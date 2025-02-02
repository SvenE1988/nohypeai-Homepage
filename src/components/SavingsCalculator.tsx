import { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
    <section id="einsparungen" className="w-full py-12 md:py-24">
      <div className="container px-4 mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-center mb-12 text-white"
        >
          Berechnen Sie Ihre{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            KI-Einsparungen
          </span>
        </motion.h2>
        
        <Card className="max-w-5xl mx-auto bg-black/40 backdrop-blur-sm border-gray-800 hover:border-gray-700 transition-all duration-300">
          <CardContent className="p-4 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left column - Input area */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
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
              </motion.div>

              {/* Right column - Results area */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-4 p-4 bg-white/5 rounded-xl"
              >
                <h3 className="text-lg md:text-xl text-gray-200 mb-4">
                  Ihre potentiellen Einsparungen:
                </h3>
                
                <div className="space-y-3">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-3 bg-black/20 rounded-lg"
                  >
                    <span className="text-sm md:text-base text-gray-300">Wöchentlich:</span>
                    <span className="text-lg md:text-xl font-bold text-primary">
                      {savings.weekly.toLocaleString()} €
                    </span>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-3 bg-black/20 rounded-lg"
                  >
                    <span className="text-sm md:text-base text-gray-300">Monatlich:</span>
                    <span className="text-lg md:text-xl font-bold text-primary">
                      {savings.monthly.toLocaleString()} €
                    </span>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-3 bg-black/20 rounded-lg"
                  >
                    <span className="text-sm md:text-base text-gray-300">Jährlich:</span>
                    <span className="text-xl md:text-2xl font-bold text-primary">
                      {savings.yearly.toLocaleString()} €
                    </span>
                  </motion.div>
                </div>

                <Link to="/pricing" className="block w-full mt-4">
                  <Button 
                    className="w-full py-4 md:py-6 bg-primary hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span className="text-sm md:text-base">Kostenloses Erstgespräch vereinbaren</span>
                    <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SavingsCalculator;