/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import useCheckAuth from "@/hooks/useCheckAuth";
import Preloader from "./Preloader";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { isAuthenticated, loading } = useCheckAuth();
  const pathname = usePathname();

  // Navigation links data
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-me", label: "About Me" },
    { href: "/all-designs", label: "All Designs" },
    ...(isAuthenticated
      ? [{ href: "/dashboard", label: "Dashboard" }]
      : [{ href: "/contact", label: "Hire me" }]),
  ];

  if (loading) return <Preloader />;

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="backdrop-blur-md sticky top-0 z-50 w-full py-2 bg-black/80 border-b border-white/5"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 py-2">

          {/* Logo Section */}
          <div className="shrink-0">
            <Link href="/" aria-label="Saeid Emon - Home">
              <Image
                src="/emons-logo.png"
                alt="Saeid Emon Logo"
                width={120}
                height={40}
                className="w-16 h-auto p-1 hover:opacity-80 transition-opacity"
                priority
              />
            </Link>
          </div>

          {/* Primary Navigation */}
          <nav aria-label="Main Navigation">
            <ul className="flex items-center gap-4 sm:gap-8">
              {navLinks.map((link: any, index: number) => {
                const isActive = pathname === link.href;

                return (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index + 0.5 }}
                  >
                    <Link
                      href={link.href}
                      className={`relative text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-300 pb-2 ${
                        isActive ? "text-white" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {link.label}

                      {/* Animated Active Underline */}
                      {isActive && (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;