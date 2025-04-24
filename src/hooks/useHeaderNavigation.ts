
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '@/contexts/NavigationContext';

export type NavItem = {
  href: string;
  label: string;
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

  // Neue Navigation laut Anweisung
  const navItems = [
    { href: "/live-tests", label: "Sprach-KI" },
    { href: "/automatisierung", label: "Automatisierung" },
    { href: "/blog", label: "Blog" }, 
    { href: "/ueber-uns", label: "Über uns" },
    { href: "/faq", label: "FAQ" },
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
