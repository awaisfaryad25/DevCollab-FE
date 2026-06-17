import React, { useState, useRef, useEffect } from 'react'
import { Sun, Moon, Monitor, Check } from "lucide-react";

type Theme = 'light' | 'dark' | 'system'

const ModeToggle = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    // Get saved theme from localStorage or default to 'system'
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'system';
  });
  
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Apply theme to document
  useEffect(() => {
    const applyTheme = (theme: Theme) => {
      const root = document.documentElement;
      
      if (theme === 'system') {
        // Check system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark', systemPrefersDark);
        root.classList.toggle('light', !systemPrefersDark);
      } else {
        root.classList.toggle('dark', theme === 'dark');
        root.classList.toggle('light', theme === 'light');
      }
      
      // Save to localStorage
      localStorage.setItem('theme', theme);
    };

    applyTheme(currentTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      if (currentTheme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [currentTheme]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    setIsPopupOpen(false);
  };

  // Get icon and label for current theme
  const getThemeIcon = () => {
    switch (currentTheme) {
      case 'light':
        return (
          <Sun className="size-5 text-[#FBBB00]"/>
        );
      case 'dark':
        return (
          <Moon className="size-5 text-white"/>
        );
      case 'system':
      default:
        return (
          <Monitor className="size-5 text-indigo-500"/>
        );
    }
  };

  const getThemeLabel = () => {
    switch (currentTheme) {
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      case 'system': return 'System';
      default: return 'Theme';
    }
  };

  // Check if a theme option is currently active
  const isThemeActive = (theme: Theme) => {
    return currentTheme === theme;
  };

  return (
    <div className="relative" ref={popupRef}>
      <button
        onClick={togglePopup}
        className="flex items-center justify-center gap-2 p-3 rounded-lg  hover:bg-gray-200 dark:hover:bg-[#1f1f1f] transition-colors"
        aria-label="Toggle theme"
      >
        <span className="text-gray-700 dark:text-gray-300">
          {getThemeIcon()}
        </span>
        {/* <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {getThemeLabel()}
        </span> */}
      </button>

      {/* Theme Popup */}
      {isPopupOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Theme
            </p>
          </div>

          <button
            onClick={() => handleThemeChange('light')}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
              isThemeActive('light')
                ? 'text-[#FBBB00] dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <Sun className="size-4 text-[#FBBB00]"/>
            <span>Light</span>
            {isThemeActive('light') && (<Check className="size-4 ml-auto"/>)}
          </button>

          <button
            onClick={() => handleThemeChange('dark')}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
              isThemeActive('dark')
                ? 'text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <Moon className="size-4"/>
            <span>Dark</span>
            {isThemeActive('dark') && (<Check className="size-4 ml-auto"/>)}
          </button>

          <button
            onClick={() => handleThemeChange('system')}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
              isThemeActive('system')
                   ? 'text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <Monitor className="size-4"/>
            <span>System</span>
            {isThemeActive('system') && (<Check className="size-4 ml-auto"/>)}
          </button>
        </div>
      )}
    </div>
  )
}

export default ModeToggle