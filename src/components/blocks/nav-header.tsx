
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
  const [previousPath, setPreviousPath] = useState("");

  useEffect(() => {
    // Store previous path when location changes
    setPreviousPath(location.pathname);
  }, [location]);

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
      
      // Force layout recalculation when coming from proposals page
      if (previousPath === '/proposals') {
        setTimeout(() => {
          window.scrollTo(0, 0);
          window.dispatchEvent(new Event('resize'));
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigation = (item: any, e: React.MouseEvent) => {
    e.preventDefault();
    
    const comingFromProposals = location.pathname === '/proposals';
    
    if (item.href === "/blog" || item.href === "/karriere" || item.href === "/pricing") {
      navigate(item.href);
      setIsMobileMenuOpen(false);
      return;
    }
    
    if (location.pathname !== '/' && item.href.startsWith('#')) {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (item.href.startsWith('#') && location.pathname === '/') {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item.href === '/') {
      scrollToTop();
      
      // Special handling when coming from proposals page
      if (comingFromProposals) {
        setTimeout(() => {
          window.location.reload();
        }, 50);
      }
    } else {
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
    { href: "/blog", label: "Blog" }, 
    { href: "/karriere", label: "Karriere" },
  ];

  return (
    <>
      <SocialLinks />
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navItems={navItems}
        handleNavigation={handleNavigation}
      />
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
