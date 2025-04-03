
import React, { useRef } from "react";

interface TabProps {
  children: React.ReactNode;
  setPosition: (position: { width: number; opacity: number; left: number }) => void;
  href: string;
  isAction?: boolean;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export const Tab = ({
  children,
  setPosition,
  href,
  isAction,
  isActive,
  onClick,
}: TabProps) => {
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
        onClick={onClick}
        className={`relative z-10 block cursor-pointer px-3 py-2 text-sm uppercase text-white mix-blend-difference transition-all duration-300 hover:text-primary ${
          isAction ? "font-medium" : ""
        } ${isActive ? "text-primary font-semibold" : ""}`}
      >
        {children}
      </a>
    </li>
  );
};
