
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
  heading: "Unsere AI-Tech-Partner",
  logos: [
    {
      id: "logo-chatgpt",
      description: "ChatGPT",
      image: "public/lovable-uploads/9ca12b09-9e4c-4e40-be0f-4fe28b44e08d.png",
      className: "h-12 w-auto",
    },
    {
      id: "logo-gemini",
      description: "Gemini",
      image: "public/lovable-uploads/05626a4a-7cf4-4677-b23e-458e44a690c3.png",
      className: "h-10 w-auto",
    },
    {
      id: "logo-lovable",
      description: "Lovable",
      image: "public/lovable-uploads/af11bd9a-17dc-44cf-b100-de117721696d.png",
      className: "h-10 w-auto",
    },
    {
      id: "logo-n8n",
      description: "n8n",
      image: "public/lovable-uploads/beb2f31a-56bf-4f78-880a-7a68f16a37f6.png",
      className: "h-10 w-auto",
    },
    {
      id: "logo-perplexity",
      description: "Perplexity",
      image: "public/lovable-uploads/f512757e-3cbb-43c7-a856-a1d39548dbb2.png",
      className: "h-11 w-auto",
    }
  ],
};

const Index = () => {
  return (
    <main className="min-h-screen bg-black">
      <NavHeader />
      <AIFirstSection />
      <Logos3 {...logoData} />
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
