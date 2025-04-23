
import React, { memo, useCallback } from "react";
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

// Animation variants with will-change for better GPU utilization
const menuVariants = {
  open: { 
    x: "0%", 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30 
    }
  },
  closed: { 
    x: "100%", 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30 
    }
  }
};

// Memoized component to prevent unnecessary re-renders
export const MobileMenu = memo(({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  navItems,
  handleNavigation,
}: MobileMenuProps) => {
  
  // Memoized toggle handler
  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Top Bar with Logo */}
      <div className="fixed top-2 left-2 z-50 md:hidden flex items-center">
        <Link to="/" onClick={(e) => handleNavigation({ href: '/', label: 'Start' }, e)}>
          <img 
            src="/lovable-uploads/4ffd568e-264d-468e-9e61-0e0df2de32c0.png" 
            alt="nohype Logo" 
            className="h-7 w-auto sm:h-8"
            style={{ 
              aspectRatio: "4.19/1", 
              display: "block", 
              objectFit: "contain",
              width: "auto", 
              height: "auto",
              maxHeight: "2rem"
            }}
            width={84} 
            height={20}
            loading="eager"
          />
        </Link>
      </div>
      
      {/* Mobile Menu Button with improved accessibility */}
      <button
        className="fixed top-2 right-4 z-50 p-2 rounded-full bg-black/80 backdrop-blur-md border border-white/30 md:hidden"
        onClick={toggleMenu}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Mobile Menu Overlay with optimized animation */}
      <motion.div 
        id="mobile-menu"
        initial={false}
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={menuVariants}
        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden"
        aria-hidden={!isMobileMenuOpen}
        style={{ willChange: "transform" }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-lg sm:text-xl text-white hover:text-primary transition-colors flex items-center gap-2 px-2 py-2"
              style={{ minWidth: 120 }}
              onClick={(e) => {
                handleNavigation(item, e);
                // Close menu after navigation on mobile
                setIsMobileMenuOpen(false);
              }}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>
    </>
  );
});

// Set displayName for better debugging
MobileMenu.displayName = 'MobileMenu';
