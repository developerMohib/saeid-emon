"use client"
import Link from 'next/link';
import React from 'react';

const page = () => {
    return (
        <main>
            <div className="max-w-6xl mx-auto pb-5 md:pb-20 px-4 sm:px-6 lg:px-10">
                {/* top buttons */}
                <div className="py-6 sm:py-10 gap-4 text-right">
                    <button className="text-seBlack px-4 py-2 rounded-full border border-seGray/30 shadow-sm hover:bg-seGray/10 transition-colors cursor-pointer w-full sm:w-auto">
                        Print Resume
                    </button>
                </div>

                {/* resume card */}
                <div className="py-10 sm:py-16 px-4 sm:px-8 md:px-14 lg:px-24 rounded-lg shadow-lg bg-seWhite">
                    <div className="divide-y divide-seGray/20">
                        {/* header */}
                        <header className="text-start py-6">
                            <h1 className="text-2xl sm:text-3xl font-bold text-seBlack/90">Saeid Emon</h1>
                            <h2 className="text-lg sm:text-xl text-seBlack/90">Graphic Designer</h2>
                            <p className="text-seBlack/60 text-sm sm:text-base">Toronto, Ontario, Canada</p>
                        </header>

                        {/* about */}
                        <div className="md:pt-6 pt-3 divide-y divide-seWhite/20">
                            <p className="text-seBlack font-medium py-6 text-sm sm:text-base">
                                Experienced Graphic Designer with 6 years of expertise in print and
                                social media post design, as well as merchandise and branding.
                                Let&apos;s create captivating visuals together! 🎨✨
                            </p>
                        </div>

                        {/* work experience */}
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-4 text-seBlack my-10 gap-6">
                                <div>
                                    <h1 className="font-semibold text-lg">Work Experience</h1>
                                </div>
                                <div className="md:col-span-3 space-y-6">
                                    <div className="border-b border-slate-300 pb-4">
                                        <Link
                                            className="text-blue-600 font-semibold hover:underline"
                                            href="https://santossoulproductions.com"
                                        >
                                            Santos Soul Productions
                                        </Link>
                                        <h1 className="font-medium">Graphic Designer</h1>
                                        <p className="text-sm sm:text-base">
                                            As a remote Graphic Designer at Santos Soul Productions since
                                            2018, I&apos;ve had the privilege of contributing to the
                                            company&apos;s promotional efforts through my creative
                                            expertise...
                                        </p>
                                        <p className="text-gray-400 text-xs mt-2 flex flex-wrap items-center gap-2">
                                            <span>January 2018 -</span>
                                            <span className="text-seGray/30">|</span>
                                            <span>California, United States</span>
                                        </p>
                                    </div>

                                    <div>
                                        <Link
                                            className="text-blue-600 font-semibold hover:underline"
                                            href="https://santossoulproductions.com"
                                        >
                                            Studio Norman
                                        </Link>
                                        <h1 className="font-medium">Senior Graphic Designer</h1>
                                        <p className="text-sm sm:text-base">
                                            At Studio Norman, I had the privilege of being part of the team
                                            from its inception, serving as a remote Senior Graphic Designer...
                                        </p>
                                        <p className="text-gray-400 text-xs mt-2 flex flex-wrap items-center gap-2">
                                            <span>March 2020 - December 2021</span>
                                            <span className="text-seGray/30">|</span>
                                            <span>Israel</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* education */}
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-4 text-seBlack my-10 gap-6">
                                <div>
                                    <h1 className="font-semibold text-lg">Education</h1>
                                </div>
                                <div className="md:col-span-3">
                                    <Link
                                        className="text-blue-600 font-semibold hover:underline"
                                        href="https://www.centennialcollege.ca"
                                    >
                                        Centennial College
                                    </Link>
                                    <h1 className="font-medium">Computer System Technician</h1>
                                    <p className="text-sm sm:text-base">
                                        Studied Computer System Technician at Centennial College,
                                        acquiring a solid foundation in technology and problem-solving
                                        skills...
                                    </p>
                                    <p className="text-gray-400 text-xs mt-2 flex flex-wrap items-center gap-2">
                                        <span>September 2022 - April 2024</span>
                                        <span className="text-seGray/30">|</span>
                                        <span>Toronto, Ontario, Canada</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* languages */}
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-4 text-seBlack my-10 gap-6">
                                <div>
                                    <h1 className="font-semibold text-lg">Languages</h1>
                                </div>
                                <div className="md:col-span-3 space-y-3">
                                    <div className="border-b border-slate-300 pb-2">
                                        <h1>English (Fluent)</h1>
                                    </div>
                                    <div>
                                        <h1>Bengali (Native)</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* skills */}
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-4 text-seBlack my-10 gap-6">
                                <div>
                                    <h1 className="font-semibold text-lg">Skills</h1>
                                </div>
                                <div className="md:col-span-3">
                                    <p className="text-sm sm:text-base">
                                        Adobe Illustrator, Adobe Photoshop, Adobe Premiere Pro, Camtasia
                                        Studio, Microsoft Office
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
};

export default page;