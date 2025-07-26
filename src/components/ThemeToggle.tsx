"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // --- For Recoverable Error Hydration failed
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="px-0 rounded-md text-xs md:text-sm font-semibold hover:bg-default dark:hover:bg-default"
    >
      {resolvedTheme === "dark" ? (
        <span className="flex items-center justify-between gap-2">
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
