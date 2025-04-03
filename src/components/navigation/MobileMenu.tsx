
import React from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  navItems: Array<{
    href: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  handleNavigation: (
    item: { href: string; label: string; icon?: React.ReactNode },
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
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 right-16 z-50 p-2 rounded-full bg-black/70 backdrop-blur-md border border-white/30 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xl text-white hover:text-primary transition-colors flex items-center gap-2"
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
