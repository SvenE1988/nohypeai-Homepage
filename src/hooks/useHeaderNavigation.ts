
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '@/contexts/NavigationContext';

export type NavItem = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

export function useHeaderNavigation() {
  // State for the desktop navigation cursor position
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get current location and navigation context
  const location = useLocation();
  const { activeSection, navigateTo, resetScrollPosition } = useNavigation();

  // Common navigation items used across components
  const navItems = [
    { href: "/", label: "Start" },
    { href: "#nutzen", label: "Nutzen" },
    { href: "#einsparungen", label: "Rechner" },
    { href: "#prozess", label: "Prozess" },
    { href: "#ueber-uns", label: "Über Uns" },
    { href: "/blog", label: "Blog" }, 
    { href: "/karriere", label: "Karriere" },
  ];

  // Handle navigation click
  const handleNavigation = (item: NavItem, e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(item.href);
    setIsMobileMenuOpen(false);
  };

  // Handle logo click
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleNavigation({ href: '/', label: 'Start' }, e);
  };

  return {
    position,
    setPosition,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    location,
    activeSection,
    navItems,
    handleNavigation,
    handleLogoClick
  };
}
