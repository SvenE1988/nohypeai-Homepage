
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { SocialLinks } from "../navigation/SocialLinks";
import { MobileMenu } from "../navigation/MobileMenu";
import { DesktopMenu } from "../navigation/DesktopMenu";

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
    handleScroll(); // Initial check when component mounts
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
    e.preventDefault();
    
    // Für Blog oder Karriere direkt zur entsprechenden Seite navigieren
    if (item.href === "/blog" || item.href === "/karriere" || item.href === "/pricing") {
      navigate(item.href);
      setIsMobileMenuOpen(false);
      return;
    }
    
    if (location.pathname !== '/' && item.href.startsWith('#')) {
      // Von einer anderen Seite zur Hauptseite und dann zum Anker scrollen
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (item.href.startsWith('#') && location.pathname === '/') {
      // Auf der Hauptseite zum Anker scrollen
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item.href === '/') {
      // Zum Seitenanfang scrollen oder zur Startseite navigieren
      scrollToTop();
    } else {
      // Zu einer anderen Seite navigieren
      navigate(item.href);
    }
    
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { href: "/", label: "Start", icon: <Home className="w-4 h-4" /> },
    { href: "#nutzen", label: "Nutzen" },
    { href: "#einsparungen", label: "Rechner" },
    { href: "#prozess", label: "Prozess" },
    { href: "#ueber-uns", label: "Über Uns" },
    { href: "/pricing", label: "Preise" },
    { href: "/blog", label: "Blog" }, 
    { href: "/karriere", label: "Karriere" },
  ];

  return (
    <>
      {/* Social Media Links */}
      <SocialLinks />

      {/* Mobile Menu */}
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navItems={navItems}
        handleNavigation={handleNavigation}
      />

      {/* Desktop Menu */}
      <DesktopMenu
        navItems={navItems}
        position={position}
        setPosition={setPosition}
        activeSection={activeSection}
        location={location}
        handleNavigation={handleNavigation}
      />
    </>
  );
}

export default NavHeader;
