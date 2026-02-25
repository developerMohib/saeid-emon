import Image from 'next/image';
import React from 'react';

const Works2 = () => {

    const projects = [
        { title: "Aether Brand Identity", category: "Branding", size: "col-span-2" },
        { title: "Nebula App UI", category: "Product Design", size: "col-span-1" },
        { title: "Chronos Watch Co.", category: "3D Modeling", size: "col-span-1" },
        { title: "Luminal Digital Experience", category: "Web Design", size: "col-span-2" },
    ];

    return (
        <section className="relative py-24 sm:py-32 bg-transparent overflow-visible">
            {/* Seamless Glow Transition (The "Blue" Bridge) */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-10 container mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-sm font-mono tracking-[0.3em] text-purple-400 uppercase mb-4">Selected Works</h2>
                        <p className="text-4xl font-light tracking-tight text-white sm:text-5xl">
                            Crafting digital <span className="italic font-serif text-gray-400">narratives</span> through design.
                        </p>
                    </div>
                    <button className="text-white border-b border-white/20 pb-1 hover:border-purple-500 transition-colors duration-300">
                        View All Projects
                    </button>
                </div>

                {/* The Grid - Irregular sizing for a "Designer" feel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className={`group relative  overflow-hidden rounded-3xl border border-white/10 bg-white/2 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/5]`}
                        >
                            {/* Aspect Ratio Container */}
                            <div className="relative">
                                {/* Image Placeholder with Gradient Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60 z-10" />

                                {/* This is where your high-res image goes */}
                                <div className="h-full w-full bg-neutral-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-out">
                                    <Image
                                        src="https://images.pexels.com/photos/35903239/pexels-photo-35903239.jpeg"
                                        alt="User Avatar"
                                        width={450}
                                        height={600}
                                        className="border-2 border-seWhite/80 object-cover"
                                        priority
                                    />
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-xs font-medium text-purple-400 uppercase tracking-widest mb-2">{project.category}</p>
                                    <h3 className="text-2xl font-medium text-white">{project.title}</h3>
                                </div>
                            </div>

                            {/* Decorative Corner Blur (Only visible on hover) */}
                            <div className="absolute -top-12 -right-12 w-24 h-24 bg-purple-500/0 group-hover:bg-purple-500/20 blur-2xl transition-all duration-500 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Works2;