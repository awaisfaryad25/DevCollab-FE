import React, { useState, useRef, useEffect } from 'react'
import { Sun, Moon, Monitor } from "lucide-react";

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
          <Sun className="w-5 h-5 text-yellow-500"/>
        );
      case 'dark':
        return (
          <Moon className="w-5 h-5 text-indigo-400"/>
        );
      case 'system':
      default:
        return (
          <Monitor className="w-5 h-5 text-gray-600"/>
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
        className="flex items-center justify-center gap-2 p-3 rounded-lg  hover:bg-gray-200 dark:hover:bg-[#f4f4f5] transition-colors"
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
                ? 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Light</span>
            {isThemeActive('light') && (
              <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          <button
            onClick={() => handleThemeChange('dark')}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
              isThemeActive('dark')
                ? 'text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <span>Dark</span>
            {isThemeActive('dark') && (
              <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          <button
            onClick={() => handleThemeChange('system')}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
              isThemeActive('system')
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>System</span>
            {isThemeActive('system') && (
              <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default ModeToggle