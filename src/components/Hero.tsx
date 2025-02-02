import { Hero } from "./blocks/hero"

const HeroSection = () => {
  return (
    <div className="relative z-10">
      <Hero
        title="Wachse schneller mit KI-Agenten"
        subtitle={
          <>
            <div className="text-xl md:text-2xl text-gray-300 mt-4">
              <span className="text-primary font-semibold">Mehr Profit?</span> Wir bringen dich nach vorn.
            </div>
            <div className="text-xl md:text-2xl text-gray-300">
              <span className="text-primary font-semibold">Höhere Effizienz?</span> Wir machen es möglich.
            </div>
            <div className="text-xl md:text-2xl text-gray-300">
              <span className="text-primary font-semibold">Dein Business?</span> Wir heben es auf das nächste Level.
            </div>
          </>
        }
        actions={[
          {
            label: "Gespräch buchen",
            href: "#gespraech",
            variant: "default"
          },
          {
            label: "Mehr erfahren",
            href: "#mehr",
            variant: "outline"
          }
        ]}
        titleClassName="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
        subtitleClassName="text-lg md:text-xl max-w-[800px]"
        actionsClassName="mt-8"
      />
    </div>
  )
}

export default HeroSection