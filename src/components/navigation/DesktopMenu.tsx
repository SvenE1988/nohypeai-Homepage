
import React from "react";
import { motion } from "framer-motion";
import { Tab } from "./Tab";
import { Cursor } from "./Cursor";
import { Link } from "react-router-dom";
import { NavItem } from "@/hooks/useHeaderNavigation";

interface DesktopMenuProps {
  navItems: Array<NavItem>;
  position: {
    left: number;
    width: number;
    opacity: number;
  };
  setPosition: (position: { width: number; opacity: number; left: number }) => void;
  activeSection: string;
  location: { pathname: string };
  handleNavigation: (
    item: NavItem,
    e: React.MouseEvent
  ) => void;
}

export const DesktopMenu = ({
  navItems,
  position,
  setPosition,
  activeSection,
  location,
  handleNavigation,
}: DesktopMenuProps) => {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleNavigation({ href: '/', label: 'Start' }, e);
  };

  return (
    <motion.ul
      className="relative mx-auto hidden md:flex items-center w-auto max-w-3xl rounded-full border-2 border-white/30 bg-black/70 backdrop-blur-md p-1 fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 justify-center shadow-lg"
      onMouseLeave={() => setPosition({ ...position, opacity: 0 })}
      style={{ position: 'fixed' }}
    >
      {/* Logo - always visible */}
      <Link 
        to="/" 
        className="mr-2 sm:mr-3 pl-2 flex items-center"
        onClick={handleLogoClick}
      >
        <img 
          src="/lovable-uploads/4ffd568e-264d-468e-9e61-0e0df2de32c0.png" 
          alt="nohype Logo" 
          className="h-8 sm:h-10 w-auto"
          style={{ aspectRatio: "4.19/1", display: "block", objectFit: "contain" }}
        />
      </Link>
      
      {/* Navigation tabs */}
      {navItems.map((item) => (
        <Tab 
          key={item.label}
          setPosition={setPosition} 
          href={item.href} 
          isActive={
            (activeSection === item.href.replace('#', '') && item.href.startsWith('#')) || 
            (item.href === '/' && location.pathname === '/') ||
            (item.href === '/blog' && location.pathname === '/blog') ||
            (item.href === '/karriere' && location.pathname === '/karriere')
          }
          onClick={(e) => handleNavigation(item, e)}
        >
          <span className="whitespace-nowrap">{item.label}</span>
        </Tab>
      ))}
      
      <Cursor position={position} />
    </motion.ul>
  );
};
