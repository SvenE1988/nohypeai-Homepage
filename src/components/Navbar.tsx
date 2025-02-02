import { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Partner", href: "#partner" },
    { name: "Projekte", href: "#projekte" },
    { name: "Vorteile", href: "#vorteile" },
    { name: "Einsparungen", href: "#einsparungen" },
    { name: "Prozess", href: "#prozess" },
    { name: "Über Uns", href: "#ueber-uns" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Blog", href: "#blog", icon: BookOpen },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="text-white text-2xl font-bold">
            F2x
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2 py-2"
              >
                {item.name}
                {item.icon && <item.icon className="w-4 h-4" />}
              </a>
            ))}
            <a
              href="#kontakt"
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full text-sm transition-colors"
            >
              Kontakt
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-white/10">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  {item.icon && <item.icon className="w-4 h-4" />}
                </a>
              ))}
              <a
                href="#kontakt"
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full text-center transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Kontakt
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;