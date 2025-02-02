import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { BookOpen } from "lucide-react";

export function FloatingNavDemo() {
  const navItems = [
    {
      name: "Partner",
      link: "#partnerprojekte",
    },
    {
      name: "Projekte",
      link: "#projekte",
    },
    {
      name: "Vorteile",
      link: "#vorteile",
    },
    {
      name: "Prozess",
      link: "#prozess",
    },
    {
      name: "Über Uns",
      link: "#ueber-uns",
    },
    {
      name: "Testimonials",
      link: "#testimonials",
    },
    {
      name: "Blog",
      link: "#blog",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      name: "Termin vereinbaren",
      link: "#kontakt",
      isAction: true,
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}