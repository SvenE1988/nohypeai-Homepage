
import NavHeader from "../components/blocks/nav-header";
import Footer from "../components/Footer";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-black w-full overflow-x-hidden">
      <NavHeader />
      {/* Der FAQ-Inhalt wird später ergänzt */}
      <div className="max-w-2xl mx-auto py-20 px-4 text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Häufig gestellte Fragen</h1>
        <p className="text-gray-400">Die FAQ-Inhalte werden in Kürze ergänzt.</p>
      </div>
      <Footer />
    </main>
  );
}
