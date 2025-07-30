"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    }
    setMounted(true); // Make sure component is fully mounted before rendering
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`w-16 h-9 rounded-full flex items-center px-1 relative overflow-hidden
        transition-colors duration-500
        ${
          isDark
            ? "bg-gradient-to-r from-indigo-500 to-blue-700"
            : "bg-gradient-to-r from-yellow-300 to-orange-500"
        }
      `}
    >
      <motion.div
        className="w-7 h-7 rounded-full bg-white shadow-md absolute top-1 left-1 flex items-center justify-center"
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-4 h-4 text-gray-800" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-4 h-4 text-yellow-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
