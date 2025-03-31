
import React from "react";
import { Link } from "react-router-dom";
import NavHeader from "../components/blocks/nav-header";
import Footer from "../components/Footer";
import JobCard from "../components/career/JobCard";
import { jobPostings } from "../data/jobData";

const Karriere = () => {
  return (
    <div className="min-h-screen bg-black">
      <NavHeader />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Karriere bei noHype.ai
          </h1>
          
          <p className="text-xl text-white/80 mb-8">
            Wir suchen talentierte Menschen, die mit uns die Zukunft der KI-Integration für Unternehmen gestalten möchten. Werde Teil unseres Teams und hilf uns, echten Mehrwert ohne Hype zu schaffen.
          </p>
          
          <div className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1F35] border border-white/10 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Warum noHype.ai?
            </h2>
            
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Arbeite mit neuester KI-Technologie und innovativen Lösungsansätzen</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Flexible Arbeitszeiten und Möglichkeiten für remote Arbeit</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Flache Hierarchien und direkte Kommunikationswege</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Chancen zur persönlichen und beruflichen Weiterentwicklung</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Ein engagiertes Team mit einer klaren Vision</span>
              </li>
            </ul>
          </div>
        </div>
        
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Aktuelle Stellenangebote
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {jobPostings.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#0A0A0A] to-[#1A1F35] border border-white/10 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">
              Keine passende Stelle gefunden?
            </h3>
            
            <p className="text-white/80 mb-6">
              Wir sind immer auf der Suche nach talentierten Menschen. Schick uns deine Initiativbewerbung!
            </p>
            
            <Link
              to="#kontakt"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary/20 hover:bg-primary/30 border border-primary/40 rounded-lg text-white transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('button[onClick="setContactDialogOpen(true)"]')?.dispatchEvent(
                  new MouseEvent('click', { bubbles: true })
                );
              }}
            >
              Initiativbewerbung senden
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Karriere;
