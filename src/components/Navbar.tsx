'use client';

import { motion } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <button
            type="button"
            className="p-2 -ml-2 text-foreground hover:text-primary transition-colors md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <span className="font-sans text-xl tracking-[0.2em] font-medium text-foreground">
              NORATO<span className="text-primary mx-1">•</span>B
            </span>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-foreground hover:text-primary transition-colors text-sm uppercase tracking-wide">
              Servicios
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors text-sm uppercase tracking-wide">
              Contacto
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 text-foreground hover:text-primary transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 -mr-2 text-foreground hover:text-primary transition-colors md:hidden"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-surface border-t border-border"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#services"
              className="block px-3 py-2 text-foreground hover:text-primary transition-colors text-sm uppercase tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              Servicios
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-foreground hover:text-primary transition-colors text-sm uppercase tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contacto
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}