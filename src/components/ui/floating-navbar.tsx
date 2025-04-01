
"use client";
import React, { useState, useCallback, memo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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
            "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
            className
          )}
        >
          {navItems.map((navItem: NavItem, idx: number) => (
            <Link
              key={`nav-link-${idx}`}
              to={navItem.link}
              onClick={(e) => handleLinkClick(e, navItem.link)}
              className={cn(
                "relative text-neutral-600 dark:text-neutral-200 items-center flex space-x-1 hover:text-neutral-500 dark:hover:text-white transition-colors"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </Link>
          ))}
          <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/10 text-black dark:text-white px-4 py-2 rounded-full hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
            <span>Login</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

FloatingNav.displayName = "FloatingNav";
