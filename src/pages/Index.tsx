
import AIFirstSection from "../components/AIFirstSection";
import AIHereSection from "../components/AIHereSection";
import Benefits from "../components/Benefits";
import GrowthSection from "../components/GrowthSection";
import Process from "../components/Process";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import About from "../components/About";
import SavingsCalculator from "../components/SavingsCalculator";
import NavHeader from "../components/blocks/nav-header";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import { Logos3 } from "../components/blocks/logos3";
import TechStack from "../components/TechStack";

// Logo data for the marquee
const logoData = {
  heading: "Wir arbeiten mit diesen Technologien",
  logos: [
    {
      id: "logo-1",
      description: "OpenAI",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1280px-OpenAI_Logo.svg.png",
      className: "h-10 w-auto",
    },
    {
      id: "logo-2",
      description: "Anthropic",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Anthropic_logo.svg/2560px-Anthropic_logo.svg.png",
      className: "h-6 w-auto",
    },
    {
      id: "logo-3",
      description: "Google",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png",
      className: "h-8 w-auto",
    },
    {
      id: "logo-4",
      description: "Microsoft",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png",
      className: "h-8 w-auto",
    },
    {
      id: "logo-5",
      description: "AWS",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/2560px-Amazon_Web_Services_Logo.svg.png",
      className: "h-8 w-auto",
    },
    {
      id: "logo-6",
      description: "Zapier",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zapier_logo.svg/2560px-Zapier_logo.svg.png",
      className: "h-8 w-auto",
    },
    {
      id: "logo-7",
      description: "HubSpot",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Hubspot_Logo.svg/2560px-Hubspot_Logo.svg.png",
      className: "h-9 w-auto",
    },
    {
      id: "logo-8",
      description: "Salesforce",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png",
      className: "h-6 w-auto",
    },
  ],
};

const Index = () => {
  return (
    <main className="min-h-screen bg-black">
      <NavHeader />
      <Logos3 {...logoData} />
      <AIFirstSection />
      <Benefits />
      <AIHereSection />
      <section id="nutzen">
        <GrowthSection />
      </section>
      <section id="einsparungen">
        <SavingsCalculator />
      </section>
      <Projects />
      <section id="prozess">
        <Process />
      </section>
      <section id="ueber-uns">
        <About />
      </section>
      <TechStack />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Index;

