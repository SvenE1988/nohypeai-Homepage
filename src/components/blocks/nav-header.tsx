"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== '/') return;
      
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
  }, [location]);

  const scrollToTop = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigation = (item: any, e: React.MouseEvent) => {
    if (location.pathname !== '/' && !item.href.startsWith('/')) {
      e.preventDefault();
      navigate('/');
      // Warten auf Navigation, dann scrollen
      setTimeout(() => {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (item.href.startsWith('#') && location.pathname === '/') {
      e.preventDefault();
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { href: "/", label: "Start", icon: <Home className="w-4 h-4" /> },
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
            <Link
              key={item.label}
              to={item.href}
              className="text-xl text-white hover:text-primary transition-colors flex items-center gap-2"
              onClick={(e) => handleNavigation(item, e)}
            >
              {item.icon}
              {item.label}
            </Link>
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
            isActive={activeSection === item.href.replace('#', '') || (item.href === '/' && location.pathname === '/')}
            onClick={(e) => handleNavigation(item, e)}
          >
            <span className="flex items-center gap-2">
              {item.icon}
              {item.label}
            </span>
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
  onClick,
}: {
  children: React.ReactNode;
  setPosition: any;
  href: string;
  isAction?: boolean;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
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
        onClick={onClick}
        className={`relative z-10 block cursor-pointer px-3 py-2 text-sm uppercase text-white mix-blend-difference transition-all duration-300 hover:text-primary ${
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