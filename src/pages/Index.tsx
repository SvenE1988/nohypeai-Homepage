import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import Services from "../components/Services";
import Projects from "../components/Projects";

const Index = () => {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Partners />
      <Services />
      <Projects />
    </main>
  );
};

export default Index;