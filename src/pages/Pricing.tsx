import React from 'react';
import { Check } from 'lucide-react';
import Navbar from '../components/Navbar';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Vereinfachte Pakete
        </h1>
        <p className="text-xl text-center text-gray-400 mb-16">
          Wählen Sie das passende Paket für Sie
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Custom Voice Agent */}
          <div className="rounded-lg border border-white/10 p-8 backdrop-blur-sm hover:border-primary/50 transition-all">
            <h3 className="text-2xl font-semibold mb-2">Custom Voice Agent</h3>
            <p className="text-gray-400 text-sm mb-6">
              Ideal für diejenigen, die einen einzelnen Voice Agent für eine einzelne Telefonnummer einsetzen möchten
            </p>
            <div className="mb-6">
              <p className="text-sm text-gray-400">Setup-Gebühren ab</p>
              <p className="text-5xl font-bold">4.000€*</p>
            </div>
            <button className="w-full py-2 px-4 rounded bg-white/10 hover:bg-white/20 transition-colors mb-8">
              Mehr erfahren
            </button>
            <div className="space-y-4">
              <h4 className="font-medium mb-4">Was Sie bekommen:</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <span>Voice Agent Pilot-Tests & Deployment-Prozess</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <span>Angepasstes Dashboard für Call-Metriken</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <span>Call-Flow-Design (bis zu 4 Call-Pfade)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <span>Custom API-Integrationen (bis zu 2)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <span>Wissensbasis-Optimierung (bis zu 50 Seiten)</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-6">* Bei komplexen Projekten kann der Preis abweichen.</p>
          </div>

          {/* Support Packages */}
          <div className="rounded-lg border border-white/10 p-8 backdrop-blur-sm hover:border-primary/50 transition-all">
            <h3 className="text-2xl font-semibold mb-2">Support Pakete</h3>
            <p className="text-gray-400 text-sm mb-6">
              Ideal für diejenigen, die kontinuierliche Voice Agent Verwaltung und Verbesserungen benötigen
            </p>
            <div className="mb-6">
              <p className="text-sm text-gray-400">Ab</p>
              <p className="text-5xl font-bold">700€/Mo*</p>
            </div>
            <button className="w-full py-2 px-4 rounded bg-white/10 hover:bg-white/20 transition-colors mb-8">
              Mehr erfahren
            </button>
            <div className="space-y-4">
              <h4 className="font-medium mb-4">Was Sie bekommen:</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <span>Laufende Tech-Stack-Verwaltung</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <span>Monatliche Voice Agent Empfehlungen</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <span>3 monatliche Prompt-Anpassungen</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <span>On-Call Entwicklungsteam</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-6">* Bei komplexen Projekten kann der Preis abweichen.</p>
          </div>

          {/* Custom Voice Platform */}
          <div className="rounded-lg border border-white/10 p-8 backdrop-blur-sm hover:border-primary/50 transition-all">
            <h3 className="text-2xl font-semibold mb-2">Custom Voice Platform</h3>
            <p className="text-gray-400 text-sm mb-6">
              Ideal für diejenigen, die eine eigene Plattform zur Verwaltung mehrerer Voice Agents und Kampagnen aufbauen möchten
            </p>
            <div className="mb-6">
              <p className="text-sm text-gray-400">Setup-Gebühren ab</p>
              <p className="text-5xl font-bold">15.000€*</p>
            </div>
            <button className="w-full py-2 px-4 rounded bg-white/10 hover:bg-white/20 transition-colors mb-8">
              Mehr erfahren
            </button>
            <div className="space-y-4">
              <h4 className="font-medium mb-4">Was Sie bekommen:</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <span>Custom Deployment & Domain-Setup</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <span>Feste Zeitpläne, Umfang & Budget</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <span>Custom Feature-Entwicklung (limitiert)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <span>Hosting und Support ab 450€/Mo</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-6">* Bei komplexen Projekten kann der Preis abweichen.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;