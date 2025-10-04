"use client"
import React from 'react';
import ThemeChanger from './ThemeChanger';
import Link from 'next/link';
import useRequireAuth from '@/hooks/useRequireAuth';
import Image from 'next/image';

const Navbar = () => {
    const checked = useRequireAuth("token");
    console.log("Auth check in Navbar:", checked);
    // Navigation links data
    const navLinks = [
        { href: "/", label: "Home" },
        // Only show Dashboard if checked === true
        ...(checked
            ? [{ href: "/dashboard", label: "Dashboard" }]
            : [
                { href: "/contact", label: "Hire me" },
                { href: "/login", label: "Login" }
            ]),
    ];
    return (
        <header className="backdrop-blur-sm sticky top-0 z-50 w-full py-1.5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-6">
                    <div>
                       <Image className='w-16 h-auto' src="/emons-logo.png" alt="Logo" width={120} height={40} />
                    </div>
                    <div className='flex items-center gap-6'>
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
            </div>
        </header>
    );
};

export default Navbar;