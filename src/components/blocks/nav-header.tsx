"use client"; 

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "#vorteile", label: "Vorteile" },
    { href: "#einsparungen", label: "Einsparungen" },
    { href: "#prozess", label: "Prozess" },
    { href: "/pricing", label: "Preis" },
    { href: "#blog", label: "Blog" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-black/70 backdrop-blur-md border border-white/30 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div className="w-6 h-5 relative flex flex-col justify-between">
          <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-lg transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xl text-white hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Desktop Menu */}
      <ul
        className="relative mx-auto hidden md:flex w-auto max-w-2xl rounded-full border-2 border-white/30 bg-black/70 backdrop-blur-md p-1 fixed top-4 left-1/2 -translate-x-1/2 z-50 justify-center items-center shadow-lg"
        onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
        style={{ position: 'fixed' }}
      >
        {navItems.map((item) => (
          <Tab 
            key={item.label}
            setPosition={setPosition} 
            href={item.href} 
            isActive={activeSection === item.href.replace('#', '')}
          >
            {item.label}
          </Tab>
        ))}
        <Cursor position={position} />
      </ul>
    </>
  );
}

const Tab = ({
  children,
  setPosition,
  href,
  isAction,
  isActive,
}: {
  children: React.ReactNode;
  setPosition: any;
  href: string;
  isAction?: boolean;
  isActive?: boolean;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
    >
      <a
        href={href}
        className={`relative z-10 block cursor-pointer px-3 py-2 text-sm uppercase text-white mix-blend-difference transition-all duration-300 ${
          isAction ? "font-medium" : ""
        } ${isActive ? "text-primary font-semibold" : ""}`}
      >
        {children}
      </a>
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-8 rounded-full bg-white/10 md:h-10"
    />
  );
};

export default NavHeader;