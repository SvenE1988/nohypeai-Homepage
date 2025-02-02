"use client"; 

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative mx-auto flex w-3/4 rounded-full border-2 border-white/20 bg-black/50 backdrop-blur-sm p-1 fixed top-4 left-1/2 -translate-x-1/2 z-50 justify-center items-center"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
      style={{ position: 'fixed' }}
    >
      <Tab setPosition={setPosition} href="#partnerprojekte">Partner</Tab>
      <Tab setPosition={setPosition} href="#projekte">Projekte</Tab>
      <Tab setPosition={setPosition} href="#vorteile">Vorteile</Tab>
      <Tab setPosition={setPosition} href="#prozess">Prozess</Tab>
      <Tab setPosition={setPosition} href="#ueber">Über</Tab>
      <Tab setPosition={setPosition} href="#testimonials">Testimonials</Tab>
      <Tab setPosition={setPosition} href="#blog">Blog</Tab>
      <Tab setPosition={setPosition} href="/pricing">Preis</Tab>
      <Tab setPosition={setPosition} href="#kontakt" isAction>Termin</Tab>

      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
  href,
  isAction,
}: {
  children: React.ReactNode;
  setPosition: any;
  href: string;
  isAction?: boolean;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
    >
      <a
        href={href}
        className={`relative z-10 block cursor-pointer px-2 py-1 text-[11px] uppercase text-white mix-blend-difference md:px-3 md:py-2 md:text-sm ${
          isAction ? "font-medium" : ""
        }`}
      >
        {children}
      </a>
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full bg-white/10 md:h-12"
    />
  );
};

export default NavHeader;