
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/ThemeProvider";

interface ThemeToggleProps {
  variant?: "default" | "ghost" | "icon";
  className?: string;
}

export function ThemeToggle({ variant = "icon", className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return variant === "icon" ? (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`rounded-full p-0 hover:bg-white/5 ${className}`}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-black transition-all" />
      ) : (
        <Sun className="h-5 w-5 text-white transition-all" />
      )}
    </Button>
  ) : (
    <Button
      variant={variant}
      onClick={toggleTheme}
      className={className}
      size="sm"
    >
      {theme === "light" ? (
        <Moon className="mr-2 h-4 w-4" />
      ) : (
        <Sun className="mr-2 h-4 w-4" />
      )}
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </Button>
  );
}
