"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-0 rounded-md text-xs md:text-sm font-semibold hover:bg-default dark:hover:bg-default"
    >
      {theme === "dark" ? (
        <span className="flex items-center justify-center gap-2">
          <Sun className="h-5 w-5" />
          Light Mode
        </span>
      ) : (
        <span className="flex items-center justify-between gap-2">
          <Moon className="h-5 w-5" />
          Dark Mode
        </span>
      )}
    </Button>
  );
}
