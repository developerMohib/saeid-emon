"use client"
import React from 'react';
import ThemeChanger from './ThemeChanger';
import Link from 'next/link';

const Navbar = () => {
    // Navigation links data
    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/contact", label: "Hire me" },
        { href: "/login", label: "Login" },
    ];
    return (
        <header className="backdrop-blur-sm sticky top-0 z-50 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-end gap-6">
                    <nav className="flex items-center gap-6">
                        {navLinks.map((link) => (
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
        </header>
    );
};

export default Navbar;