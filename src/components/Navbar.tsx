import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dienstleistungen", href: "#" },
    { name: "Projekte", href: "#" },
    { name: "Testimonials", href: "#" },
    { name: "Prozess", href: "#" },
    { name: "Vorteile", href: "#" },
    { name: "Über Uns", href: "#" },
    { name: "Blog", href: "#" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-transparent py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="/" className="text-white text-2xl font-bold">
            F2x
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#kontakt"
              className="bg-transparent border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors"
            >
              Kontakt
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-black bg-opacity-95 p-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-300 hover:text-white py-2"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#kontakt"
              className="block text-white py-2 mt-2 text-center border border-white rounded-full"
            >
              Kontakt
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;