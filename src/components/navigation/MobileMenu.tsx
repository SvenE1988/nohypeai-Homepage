import React from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { NavItem } from "@/hooks/useHeaderNavigation";

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  navItems: Array<NavItem>;
  handleNavigation: (
    item: NavItem,
    e: React.MouseEvent
  ) => void;
}

export const MobileMenu = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  navItems,
  handleNavigation,
}: MobileMenuProps) => {
  return (
    <>
      {/* Mobile Menu Top Bar with Logo */}
      <div className="fixed top-2 left-2 z-50 md:hidden flex items-center">
        <Link to="/" onClick={(e) => handleNavigation({ href: '/', label: 'Start' }, e)}>
          <img 
            src="/lovable-uploads/4ffd568e-264d-468e-9e61-0e0df2de32c0.png" 
            alt="nohype Logo" 
            className="h-7 w-auto sm:h-8"
            style={{ aspectRatio: "4.19/1", display: "block", objectFit: "contain" }}
          />
        </Link>
      </div>
      
      {/* Mobile Menu Button */}
      <button
        className="fixed top-2 right-4 z-50 p-2 rounded-full bg-black/80 backdrop-blur-md border border-white/30 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <motion.div 
        initial={false}
        animate={{
          x: isMobileMenuOpen ? "0%" : "100%",
        }}
        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-lg sm:text-xl text-white hover:text-primary transition-colors flex items-center gap-2 px-2 py-2"
              style={{ minWidth: 120 }}
              onClick={(e) => handleNavigation(item, e)}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>
    </>
  );
};
