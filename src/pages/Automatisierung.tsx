
import NavHeader from "../components/blocks/nav-header";
import Footer from "../components/Footer";

export default function AutomatisierungPage() {
  return (
    <main className="min-h-screen bg-black w-full overflow-x-hidden">
      <NavHeader />
      <div className="max-w-2xl mx-auto py-20 px-4 text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Automatisierung</h1>
        <p className="text-gray-400">Hier entsteht bald unsere Unterseite zum Thema Automatisierung & KI-Workflows.</p>
      </div>
      <Footer />
    </main>
  );
}
