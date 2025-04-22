
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '@/contexts/NavigationContext';

export type NavItem = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

export function useHeaderNavigation() {
  // State für die Desktop-Navigation
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { activeSection, navigateTo, resetScrollPosition } = useNavigation();

  // Neue Navigation inklusive Über Uns & FAQ
  const navItems = [
    { href: "/", label: "Start" },
    { href: "/live-tests", label: "Live Tests" },
    { href: "#nutzen", label: "Nutzen" },
    { href: "#einsparungen", label: "Rechner" },
    { href: "#prozess", label: "Prozess" },
    { href: "/ueber-uns", label: "Über uns" },
    { href: "/faq", label: "FAQ" },
    { href: "#ueber-uns", label: "Über Uns (alt)" },
    { href: "/blog", label: "Blog" }, 
    { href: "/karriere", label: "Karriere" },
  ];

  const handleNavigation = (item: NavItem, e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(item.href);
    setIsMobileMenuOpen(false);
  };

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
