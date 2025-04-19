import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  // In a real application, this would interact with a theme context
  // For this demo, we'll just toggle a local state
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-midnight-300 hover:bg-midnight-200 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-sunny-400" />
      ) : (
        <Moon className="h-5 w-5 text-electric-400" />
      )}
    </button>
  );
};

export default ThemeToggle;