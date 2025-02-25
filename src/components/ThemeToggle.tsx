import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-4 right-4 z-50"
    >
      <Button
        variant="outline"
        size="icon"
        // For light mode, we use a solid light-gray background with a contrasting border.
        // In dark mode, a darker gray provides good contrast.
        className="rounded-full w-10 h-10 bg-gray-300 dark:bg-gray-800 backdrop-blur-lg border border-gray-400 dark:border-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 transition-all duration-200"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-teal-600" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-teal-600" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  );
}
