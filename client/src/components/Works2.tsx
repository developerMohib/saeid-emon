"use client"
import useProducts from '@/hooks/useProducts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Works2 = () => {
    const {
        data: cardsData,
    } = useProducts();

    return (
        <section className="relative py-12 sm:py-16 bg-transparent overflow-visible">
            {/* Seamless Glow Transition (The "Blue" Bridge) */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-10 container mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-sm tracking-[0.3em] text-purple-400 uppercase mb-4">Selected Works</h2>
                        <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            Crafting digital <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">narratives</span> <br /> through design.
                        </p>
                    </div>
                    <button className="text-white border-b border-white/20 pb-1 hover:border-purple-500 transition-colors duration-300">
                        View All Projects
                    </button>
                </div>

                {/* The Grid - Irregular sizing for a "Designer" feel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cardsData?.map((card, index) => (
                        <article
                            key={`${card._id}-${index}`}
                            className="group relative overflow-hidden rounded-4xl border border-white/5 bg-[#111] transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] md:my-0 my-4"
                        >
                            {/* Image Section */}
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src={card.images[0]}
                                    alt={card.title}
                                    fill // Using fill for consistent designer grid look
                                    priority={index < 3}
                                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1"
                                />

                                {/* Designer construction grid overlay - purely aesthetic */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graph-paper.png')]" />

                                {/* Category Tag - Top Left */}
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-seRed backdrop-blur-md border border-white/10 text-white translate-y-1 opacity-100 transition-all duration-300">
                                        {card.category}
                                    </span>
                                </div>
                            </div>

                            {/* Overlay Details */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-linear-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">

                                <div className="space-y-3">
                                    <Link href={`/design-details/${card._id}`}>
                                        <h3 className="text-2xl font-bold text-white tracking-tighter leading-none hover:text-purple-400 transition-colors line-clamp-1 mb-2.5">
                                            {card.title}
                                        </h3>
                                    </Link>

                                    <div className="flex items-center justify-between">
                                        <Link href={`/design-details/${card._id}`} className="w-full">
                                            <button className="group/btn relative w-full overflow-hidden rounded-xl bg-white/10 px-4 py-3 text-xs font-bold text-white backdrop-blur-xl border border-white/10 transition-all hover:bg-white hover:text-black">
                                                <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest">
                                                    View Project
                                                </span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Project Number Indicator - Bottom Right (Static) */}
                            <div className="absolute bottom-4 right-6 text-[10px] font-mono text-white/20 group-hover:opacity-0 transition-opacity uppercase tracking-tighter">
                                PRJ-0{index + 1}
                            </div>
                        </article>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Works2;