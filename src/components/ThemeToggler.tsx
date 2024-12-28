"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className="mr-6 cursor-pointer rounded-md bg-accent px-4 py-2 text-xl text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-secondary-foreground"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Moon className="h-6 w-6" />
      ) : (
        <Sun className="h-6 w-6" />
      )}
    </div>
  );
};

export default ThemeToggler;
