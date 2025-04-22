
import React from "react";
import { Button } from "./ui/neon-button";

// Link zu deiner Buchungsseite
const BOOKING_URL = "https://cal.com/nohypeai/beratung"; // <---- Hier ggf. Link anpassen!

const MainCtaSection = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-br from-primary/10 to-secondary/10 border-t border-primary/10 px-2 sm:px-0 overflow-hidden">
      <div
        className="absolute -inset-3 pointer-events-none blur-2xl opacity-60 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(255,0,153,0.16) 0%, transparent 70%), radial-gradient(ellipse at 5% 20%, rgba(107,70,193,0.09) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight drop-shadow-md">
          Bereit für den nächsten Schritt?
        </h2>
        <p className="mb-10 text-base sm:text-lg text-gray-300 font-medium">
          Vereinbare ein unverbindliches Beratungsgespräch und erfahre, wie NoHype dein Unternehmen unterstützen kann.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="solid"
            size="lg"
            neon
            asChild
            className="min-w-[200px] text-lg font-semibold rounded-xl shadow-md"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Termin buchen"
            >
              Termin buchen
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MainCtaSection;
