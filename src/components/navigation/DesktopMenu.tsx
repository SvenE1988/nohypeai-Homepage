
import React from "react";
import { motion } from "framer-motion";
import { Tab } from "./Tab";
import { Cursor } from "./Cursor";
import { NavItem } from "@/hooks/useHeaderNavigation";

// Removed logo from route items and Home icon from nav
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
  // No logo or home icon inside here: logo is shown above nav bar in NavHeader

  return (
    <motion.ul
      className="relative mx-auto hidden md:flex items-center w-auto max-w-2xl rounded-full border-2 border-white/30 bg-black/70 backdrop-blur-md p-1 fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-50 justify-center shadow-lg"
      onMouseLeave={() => setPosition({ ...position, opacity: 0 })}
      style={{ position: 'fixed' }}
    >
      {/* Navigation tabs only, no logo or Home icon */}
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
          <span className="flex items-center gap-2 text-sm sm:text-base">
            {/* No item.icon */}
            {item.label}
          </span>
        </Tab>
      ))}
      
      {/* Animated cursor */}
      <Cursor position={position} />
    </motion.ul>
  );
};
