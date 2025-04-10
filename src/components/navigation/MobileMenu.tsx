
import React from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/providers/ThemeProvider";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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
  const { theme } = useTheme();
  const logoSrc = theme === "light" 
    ? "/lovable-uploads/b4a3ba59-8ec3-4409-8f86-f9e3df143d78.png" 
    : "/lovable-uploads/4ffd568e-264d-468e-9e61-0e0df2de32c0.png";

  return (
    <>
      {/* Mobile Menu Top Bar with Logo */}
      <div className="fixed top-4 left-4 z-50 md:hidden flex items-center">
        <Link to="/" onClick={(e) => handleNavigation({ href: '/', label: 'Start' }, e)}>
          <img 
            src={logoSrc}
            alt="nohype Logo" 
            className="h-8 w-auto"
            style={{ aspectRatio: "4.19/1", display: "block", objectFit: "contain" }}
          />
        </Link>
      </div>
      
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

      {/* Theme toggle button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <ThemeToggle />
      </div>

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
          <ThemeToggle variant="default" className="mt-8" />
        </div>
      </motion.div>
    </>
  );
};
