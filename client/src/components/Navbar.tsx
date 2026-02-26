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
    // Only show Dashboard if authenticated === true
    ...(isAuthenticated
      ? [{ href: "/dashboard", label: "Dashboard" }]
      : [{ href: "/contact", label: "Hire me" }]),
  ];

  if (loading) return <Preloader />;
  return (
    <header className="backdrop-blur-sm sticky top-0 z-50 w-full py-1.5 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 py-2">

          {/* Logo */}
          <div>
            <Link href="/" aria-label="Home">
              <Image
                src="/emons-logo.png"
                alt="Saeid Emon Logo"
                width={120}
                height={40}
                className="w-16 h-auto p-1  "
                priority
              />
            </Link>
          </div>

          {/* Navigation Links & Theme Changer */}
          <div className="flex items-center gap-6">
           <nav aria-label="Primary Navigation" className="flex items-center gap-8">
              {navLinks.map((link: any) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-300 pb-1 ${
                      isActive ? "text-seRed" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {link.label}

                    {/* Animated Active Underline */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-seRed"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
