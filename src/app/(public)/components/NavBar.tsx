"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`px-4 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white shadow-md"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-16">
            {/* Left Logo */}
            <div className="shrink-0">
              <Link
                href="/"
                className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
              >
                DevCollab
              </Link>
            </div>

            {/* Center Navigation Links */}
            <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Right Buttons */}
            <div className="flex items-center space-x-4">
              <Link href="/login" className="px-4 py-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                Log In
              </Link>
              <Link href="/register" className="px-5 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div
          className={`bg-white transition-all duration-300 ${
            isScrolled ? "shadow-lg" : "shadow-md"
          }`}
        >
          <div className="flex justify-between items-center px-4 h-16">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              onClick={closeMobileMenu}
            >
              BrandLogo
            </Link>

            {/* Burger Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none group"
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 transition-all duration-300 z-40 ${
            isMobileMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }`}
          onClick={closeMobileMenu}
        />

        {/* Mobile Menu Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-full max-w-64 bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out transform ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <Link
              href="/"
              className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              onClick={closeMobileMenu}
            >
              DevCollab
            </Link>
            <button
              onClick={closeMobileMenu}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col p-6 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200 transform hover:translate-x-2"
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Auth Buttons */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-white">
            <div className="space-y-3">
              <button className="w-full px-4 py-3 text-blue-600 font-semibold border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200">
                Log In
              </button>
              <button className="w-full px-4 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16 md:h-16" />
    </>
  );
};

export default NavBar;