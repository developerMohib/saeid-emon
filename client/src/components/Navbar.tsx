/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import useCheckAuth from "@/hooks/useCheckAuth";
import { usePathname } from "next/navigation";
import Loader from "./Loader";
import ThemeChanger from "./ThemeChanger";
import { Menu, X } from "lucide-react"; 
import Image from "next/image";

const Navbar = () => {
  const { isAuthenticated, loading } = useCheckAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-me", label: "About Me" },
    { href: "/all-designs", label: "Portfolio" },
    ...(isAuthenticated
      ? [{ href: "/dashboard", label: "Dashboard" }]
      : [{ href: "/contact", label: "Hire me" }]),
  ];

  if (loading) return <Loader />;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="backdrop-blur-md sticky top-0 z-50 w-full bg-black/90 border-b border-white/5"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* LOGO - Stays Left */}
          <div className="shrink-0">
            <Link href="/">
              <Image width={80} height={80}
                src="/emons-logo.png"
                alt="Logo"
                className="w-auto h-8 p-1"
              />
            </Link>
          </div>

          {/* RIGHT SIDE: Desktop Nav, Theme, and Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-6">
            
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-6 lg:gap-8">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`relative text-[10px] lg:text-xs uppercase tracking-[0.2em] font-bold transition-colors ${
                        pathname === link.href ? "text-white" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {link.label}
                      {pathname === link.href && (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-seRed"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Theme Changer - Always visible */}
            <ThemeChanger />

            {/* Mobile Hamburger - Right Side */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Open Menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER SYSTEM */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black backdrop-blur-md z-60 md:hidden"
            />

            {/* Slide from LEFT Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-full bg-black border-r border-white/10 z-70 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4">
                <Image width={80} height={80} src="/emons-logo.png" alt="Logo" className="w-auto h-6" />
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-white bg-white/5 rounded-full"
                >
                  <X size={28} />
                </button>
              </div>

              <nav className="flex flex-col gap-4 bg-black border-t border-seGray p-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`text-base uppercase font-black ${
                        pathname === link.href ? "text-seRed" : "text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;