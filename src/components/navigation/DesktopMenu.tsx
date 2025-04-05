
import React from "react";
import { motion } from "framer-motion";
import { Tab } from "./Tab";
import { Cursor } from "./Cursor";
import { Link } from "react-router-dom";

interface DesktopMenuProps {
  navItems: Array<{
    href: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  position: {
    left: number;
    width: number;
    opacity: number;
  };
  setPosition: (position: { width: number; opacity: number; left: number }) => void;
  activeSection: string;
  location: { pathname: string };
  handleNavigation: (
    item: { href: string; label: string; icon?: React.ReactNode },
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
  return (
    <motion.ul
      className="relative mx-auto hidden md:flex items-center w-auto max-w-2xl rounded-full border-2 border-white/30 bg-black/70 backdrop-blur-md p-1 fixed top-4 left-1/2 -translate-x-1/2 z-50 justify-center shadow-lg"
      onMouseLeave={() => setPosition({ ...position, opacity: 0 })}
      style={{ position: 'fixed' }}
    >
      {/* Logo auf der linken Seite */}
      <Link 
        to="/" 
        className="mr-3 pl-2 flex items-center"
        onClick={(e) => handleNavigation({ href: '/', label: 'Start' }, e)}
      >
        <img 
          src="/lovable-uploads/4ffd568e-264d-468e-9e61-0e0df2de32c0.png" 
          alt="nohype Logo" 
          className="h-10 w-auto"
        />
      </Link>
      
      {navItems.map((item) => (
        <Tab 
          key={item.label}
          setPosition={setPosition} 
          href={item.href} 
          isActive={
            (activeSection === item.href.replace('#', '') && item.href.startsWith('#')) || 
            (item.href === '/' && location.pathname === '/') ||
            (item.href === '/blog' && location.pathname === '/blog')
          }
          onClick={(e) => handleNavigation(item, e)}
        >
          <span className="flex items-center gap-2">
            {item.icon}
            {item.label}
          </span>
        </Tab>
      ))}
      <Cursor position={position} />
    </motion.ul>
  );
};
