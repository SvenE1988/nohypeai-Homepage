import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";

const Index = () => {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Partners />
      <Services />
      <Process />
      <Projects />
      <Testimonials />
    </main>
  );
};

export default Index;