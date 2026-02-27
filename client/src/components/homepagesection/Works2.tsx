"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import useTopDesign from '@/hooks/useTopDesign';
import Loader from '../Loader';

const Works2card = () => {
    const { data: latestDesign, isPending, error } = useTopDesign();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    if (isPending) return <Loader />;
    if (error) {
        return (
            <p className="text-seGray mt-2 text-center">
                {error instanceof Error ? error.message : "An unexpected error occurred"}
            </p>
        );
    }

    return (
        <section className="relative py-12 sm:py-24 bg-background overflow-visible transition-colors duration-500">
            {/* Seamless Glow - Uses theme accent */}
            <div className="absolute top-[-10%] right-[-5%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-accent/10 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 container mx-auto px-6 lg:px-8">

                {/* Section Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
                    <div className="max-w-xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-xs sm:text-sm tracking-[0.3em] text-accent uppercase mb-3 sm:mb-4 font-bold"
                        >
                            People choice&apos;s Designs
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl sm:text-5xl font-black tracking-tight text-seBlack leading-[1.1]"
                        >
                            Crafting digital <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-seRed italic">
                                narratives
                            </span> through design.
                        </motion.p>
                    </div>

                    <nav>
                        <Link href={'/all-designs'} className="flex items-center gap-2 text-seBlack border-b-2 border-seRed font-bold tracking-wider text-base sm:text-lg group pb-1 sm:pb-2 hover:text-seRed transition-all w-fit">
                            View All Designs{" "}
                            <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </nav>
                </header>

                {/* The Grid - Responsive Breakpoints Adjusted */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-10"
                >
                    {latestDesign?.map((card, index) => (
                        <motion.article
                            key={`${card._id}-${index}`}
                            variants={cardVariants}
                            className="group relative overflow-hidden rounded-4xl border border-seGray/10 bg-seWhite transition-all duration-500 hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(124,58,237,0.1)]"
                        >
                            {/* Image Section */}
                            <div className="relative aspect-square overflow-hidden bg-seSlack/5">
                                <Image
                                    src={card.images[0]}
                                    alt={card.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    priority={index < 4}
                                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1"
                                />

                                {/* Category Tag */}
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-widest uppercase bg-seRed text-white shadow-lg">
                                        {card.category}
                                    </span>
                                </div>
                            </div>

                            {/* Hover Overlay - Keeps Dark Contrast for legibility */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-linear-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20">
                                <div className="space-y-4">
                                    <Link href={`/design-details/${card._id}`}>
                                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tighter leading-tight hover:text-accent transition-colors line-clamp-2">
                                            {card.title}
                                        </h3>
                                    </Link>

                                    <Link href={`/design-details/${card._id}`} className="block">
                                        <button className="w-full rounded-xl bg-white/20 px-4 py-3 text-xs font-black text-white backdrop-blur-md border border-white/20 transition-all hover:bg-seWhite hover:text-seBlack uppercase tracking-widest active:scale-95">
                                            View Project
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Project Number Indicator - Visible in idle state */}
                            <div className="absolute bottom-4 right-6 text-[10px] font-mono text-seGray/30 group-hover:opacity-0 transition-opacity uppercase font-bold" aria-hidden="true">
                                PRJ-0{index + 1}
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Works2card;