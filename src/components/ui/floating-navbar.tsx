
"use client";
import React, { useState, useCallback, memo, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  name: string;
  link: string;
  icon?: JSX.Element;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
}

export const FloatingNav = memo(({
  navItems,
  className,
}: FloatingNavProps) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  // The animation variants
  const navVariants = {
    hidden: { 
      opacity: 0, 
      y: -100,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2 }
    },
  };

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      
      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  // Check for active link based on current route
  const isActiveLink = useCallback((link: string): boolean => {
    if (link === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(link);
  }, [location.pathname]);

  // Memoize link click handler for better performance
  const handleLinkClick = useCallback((e: React.MouseEvent, link: string) => {
    // Handle internal links with smooth scrolling
    if (link.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Make navbar appear immediately when navigating to a new page
  useEffect(() => {
    setVisible(true);
    
    // Hide after 3 seconds if at the top of the page
    const timer = setTimeout(() => {
      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [location.pathname, scrollYProgress]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="floating-nav"
          variants={navVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={cn(
            "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_8px_40px_-12px_rgba(0,0,0,0.2)] z-[5000] pr-2 pl-2 py-2 items-center justify-center space-x-4",
            className
          )}
          role="navigation"
          aria-label="Floating navigation"
        >
          {/* Logo in the floating navbar */}
          <Link
            to="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center mr-2 pl-3"
          >
            <img 
              src="/lovable-uploads/4ffd568e-264d-468e-9e61-0e0df2de32c0.png" 
              alt="nohype Logo" 
              className="h-6 w-auto"
              style={{ aspectRatio: "4.19/1", display: "block", objectFit: "contain" }}
            />
          </Link>
          
          {navItems.map((navItem: NavItem, idx: number) => (
            <Link
              key={`nav-link-${idx}`}
              to={navItem.link}
              onClick={(e) => handleLinkClick(e, navItem.link)}
              className={cn(
                "relative text-neutral-600 dark:text-neutral-200 items-center flex space-x-1 hover:text-neutral-500 dark:hover:text-white transition-colors",
                isActiveLink(navItem.link) && "text-primary dark:text-primary font-medium"
              )}
              aria-current={isActiveLink(navItem.link) ? "page" : undefined}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
              {isActiveLink(navItem.link) && (
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" 
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <button 
            className="border text-sm font-medium relative border-neutral-200 dark:border-white/10 text-black dark:text-white px-4 py-2 rounded-full hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-black"
            onClick={() => window.location.href = '/login'}
          >
            <span>Login</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

FloatingNav.displayName = "FloatingNav";
