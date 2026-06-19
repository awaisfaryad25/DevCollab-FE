"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/assets";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <>
      <nav
        className={`px-4 sm:px-6 lg:px-8 sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 dark:bg-[#171717] backdrop-blur-md shadow-lg" : "bg-white dark:bg-[#171717] shadow-md"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="lg:pr-10">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={Logo}
                className="w-10 4xl:w-[40px] h-7 4xl:h-[28px]"
                alt="hexa-rgb"
              />
              <p className="font-medium text-lg md:text-xl text-dark-gray cursor-pointer">
                DevCollab
              </p>
            </Link>
            </div>

            <div className="hidden md:flex items-center justify-center transform space-x-4 lg:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm 4xl:text-base text-[#6C757D] hover:text-[#010066] dark:hover:text-[#0EA5E9] font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px rounded-full bg-[#010066] dark:bg-[#0EA5E9] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={toggleMobileMenu}
              className="relative z-50 size-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none md:hidden cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`w-6 h-0.5 bg-[#333333] transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-[#333333] transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-[#333333] transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>

            <div className="hidden md:flex items-center space-x-2">
              <Link href="/login" className="px-4 py-2 text-dark-gray font-semibold hover:bg-linear-to-r from-[#0EA5E9] to-[#010066] hover:bg-clip-text hover:text-transparent transition-colors duration-200">
                Log In
              </Link>
              <Link href="/register" className="px-5 py-2 bg-linear-to-r from-[#0EA5E9] to-[#010066] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu panel: fixed, transform-only slide, no max-height clipping */}
      <div
        className={`md:hidden fixed inset-0 top-20 w-full max-w-11/12 mx-auto z-40 origin-bottom transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? "scale-y-100" : "scale-y-0"
        }`}
      >
        <div className="bg-white shadow-lg border-t border-gray-100 px-4 sm:px-6 py-4 flex flex-col gap-1 rounded-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="px-2 py-3 text-sm text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 border-b border-gray-50 last:border-b-0"
            >
              {link.label}
            </Link>
          ))}
            <Link
              href="/login"
              onClick={closeMobileMenu}
              className="px-3 py-2 text-cent text-[#6C757D] font-semibold hover:text-blue-700 transition-colors duration-200"
            >
              Log In
            </Link>
          <div className="flex flex-col gap-2 pt-1">
            {/* <Link
              href="/login"
              onClick={closeMobileMenu}
              className="px-4 py-2 text-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 border border-blue-600 rounded-lg"
            >
              Log In
            </Link> */}
            <Link
              href="/register"
              onClick={closeMobileMenu}
              className="px-5 py-2 text-center bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-black/10 backdrop-blur-[2px] z-30"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default NavBar;