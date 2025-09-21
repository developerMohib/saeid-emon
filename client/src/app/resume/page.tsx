"use client"
import Link from 'next/link';
import React from 'react';

const page = () => {
    return (
        <main>
            <div className='max-w-6xl mx-auto pb-20'>
                <div className='flex justify-between items-center py-10'>
                    <Link href={"/"}>
                    <button className='text-black px-4 py-2 rounded-full border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer'>
                        Back Home
                    </button></Link>

                    <button className='text-black px-4 py-2 rounded-full border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer'>
                        Print Resume
                    </button>
                </div>
                <div className='py-16 px-20 rounded-lg shadow-lg'>
                    {/* Using divide-y properly */}
                    <div className="divide-y divide-slate-500">
                        <header className="text-start py-6">
                            <h1 className="text-3xl font-bold text-black">Saeid Emon</h1>
                            <h2 className="text-xl text-black">Graphic Designer</h2>
                            <p className="text-gray-700">Toronto, Ontario, Canada</p>
                        </header>

                        <div className="pt-6 divide-y divide-slate-500">
                            <p className="text-gray-800 py-6">
                                Experienced Graphic Designer with 6 years of expertise in print and social media post design, as well as merchandise and branding. Let&apos;s create captivating visuals together! 🎨✨
                            </p>
                        </div>

                        {/* experience */}
                        <div>
                            <div className="grid grid-cols-4 text-gray-800 my-10">
                                <div className="grid-col-1">
                                    <h1>Work Experience</h1>
                                </div>
                                <div className='col-span-3'>
                                    <div className='border-b border-slate-500'>
                                        <Link className='text-blue-600 font-semibold hover:underline' href={"https://santossoulproductions.com"}>Santos Soul Productions</Link>
                                        <h1>Graphic Designer</h1>
                                        <p>As a remote Graphic Designer at Santos Soul Productions since 2018, I&apos;ve had the privilege of contributing to the company&apos;s promotional efforts through my creative expertise. Specializing in visual storytelling, I&apos;ve been instrumental in crafting captivating designs for various projects, including movie posters, t-shirts, and more.
                                            <br />
                                            Collaborating closely with the team, I&apos;ve translated concepts and ideas into visually stunning promotional materials that resonate with audiences. From concept development to final execution, I&apos;ve played a key role in enhancing the company&apos;s brand identity and promoting its diverse range of projects
                                        </p>
                                        <p className='text-gray-400 text-xs my-4 flex items-center'>
                                            <span>January 2018 -</span>
                                            <span className="mx-2 text-gray-300">|</span>
                                            <span>California, United States</span>
                                        </p>
                                    </div>

                                    <div className='mt-3'>
                                        <Link className='text-blue-600 font-semibold hover:underline' href={"https://santossoulproductions.com"}>Studio Norman</Link>
                                        <h1>Senior Graphic Designer</h1>
                                        <p>At Studio Norman, I had the privilege of being part of the team from its inception, serving as a remote Senior Graphic Designer. Leading the graphic design team, I played a pivotal role in shaping the studio&apos;s creative direction and ensuring the delivery of high-quality designs.
                                            <br />
                                            As a customized product design studio, I thrived on challenges, consistently adapting and modifying designs to meet the unique requirements of our diverse clientele. From conceptualization to execution, I led the charge in creating visually stunning and innovative products that exceeded customer expectations.
                                        </p>
                                        <p className='text-gray-400 text-xs my-4 flex items-center'>
                                            <span>March 2020 - December 2021</span>
                                            <span className="mx-2 text-gray-300">|</span>
                                            <span>Israel</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* education */}
                        <div>
                            <div className="grid grid-cols-4 text-gray-800 my-10">
                                <div className="grid-col-1">
                                    <h1>Education</h1>
                                </div>
                                <div className='col-span-3'>
                                    <div>
                                        <Link className='text-blue-600 font-semibold hover:underline' href={"https://www.centennialcollege.ca"}>
                                            Centennial College</Link>
                                        <h1>Computer System Technician</h1>
                                        <p>Studied Computer System Technician at Centennial College, acquiring a solid foundation in technology and problem-solving skills. While my education provided a strong technical background, my passion lies in graphic design, which I am pursuing as a career path.
                                        </p>
                                        <p className='text-gray-400 text-xs my-4 flex items-center'>
                                            <span>September 2022 - April 2024</span>
                                            <span className="mx-2 text-gray-300">|</span>
                                            <span>Toronto, Ontario, Canada</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Language */}
                        <div>
                            <div className="grid grid-cols-4 text-gray-800 my-10">
                                <div className="grid-col-1">
                                    <h1>Languages</h1>
                                </div>
                                <div className='col-span-3'>
                                    <div className='border-b border-slate-500'>
                                        <h1> English (Fluent)</h1>
                                    </div>

                                    <div className='mt-3'>
                                        <h1>Bengali (Native)</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* skills*/}
                        <div>
                            <div className="grid grid-cols-4 text-gray-800 my-10">
                                <div className="grid-col-1">
                                    <h1>Skills</h1>
                                </div>
                                <div className='col-span-3'>
                                    <div >
                                        <p>
                                            Adobe Illustator, Adobe Photoshop, Adobe Primer Pro , Camtasia Studio, Microsoft Office
                                        </p>
                                    </div>
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