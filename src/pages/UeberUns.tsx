
import About from "../components/About";
import NavHeader from "../components/blocks/nav-header";
import Footer from "../components/Footer";

export default function UeberUnsPage() {
  return (
    <main className="min-h-screen bg-black w-full overflow-x-hidden">
      <NavHeader />
      <About />
      <Footer />
    </main>
  );
}
