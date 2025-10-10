/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeChanger from "./ThemeChanger";
import useCheckAuth from "@/hooks/useCheckAuth";
import Loader from "./Loader";

const Navbar = () => {
  const { isAuthenticated, loading } = useCheckAuth();


  if (loading) return <Loader />;

  // Navigation links data
  const navLinks = [
    { href: "/", label: "Home" },
    // Only show Dashboard if authenticated === true
    ...(isAuthenticated
      ? [{ href: "/dashboard", label: "Dashboard" }]
      : [{ href: "/contact", label: "Hire me" }]),
  ];

  return (
    <header className="backdrop-blur-sm sticky top-0 z-50 w-full py-1.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">

          {/* Logo */}
          <div>
            <Link href="/" aria-label="Home">
              <Image
                src="/emons-logo.png"
                alt="Saeid Hasan Emon Logo"
                width={120}
                height={40}
                className="w-16 h-auto p-1  "
                priority
              />
            </Link>
          </div>

          {/* Navigation Links & Theme Changer */}
          <div className="flex items-center gap-6">
            <nav aria-label="Primary Navigation" className="flex items-center gap-6">
              {navLinks.map((link: any) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-seBlack hover:text-seRed transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <ThemeChanger />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
