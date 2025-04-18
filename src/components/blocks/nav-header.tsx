
"use client";

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import { SocialLinks } from "../navigation/SocialLinks";
import { MobileMenu } from "../navigation/MobileMenu";
import { DesktopMenu } from "../navigation/DesktopMenu";
import { useNavigation } from "@/contexts/NavigationContext";

function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { activeSection, navigateTo } = useNavigation();

  const handleNavigation = (item: any, e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(item.href);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { href: "/", label: "Start", icon: <Home className="w-4 h-4" /> },
    { href: "#nutzen", label: "Nutzen" },
    { href: "#einsparungen", label: "Rechner" },
    { href: "#prozess", label: "Prozess" },
    { href: "#ueber-uns", label: "Über Uns" },
    { href: "/blog", label: "Blog" }, 
    { href: "/karriere", label: "Karriere" },
  ];

  return (
    <>
      <SocialLinks />
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navItems={navItems}
        handleNavigation={handleNavigation}
      />
      <DesktopMenu
        navItems={navItems}
        position={position}
        setPosition={setPosition}
        activeSection={activeSection}
        location={location}
        handleNavigation={handleNavigation}
      />
    </>
  );
}

export default NavHeader;
