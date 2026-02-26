"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion, Variants } from 'framer-motion'; // Added for animation
import { FiArrowUpRight } from 'react-icons/fi';
import useTopDesign from '@/hooks/useTopDesign';
import Loader from '../Loader';

const Works2card = () => {
    const { data: latestDesign, isPending, error } = useTopDesign()

    // Animation Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 } // Staggers the cards loading
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
    if (isPending) return <Loader />
    if (error) {
        return (
            <p className="text-gray-500 mt-2">
                {error instanceof Error ? error.message : "An unexpected error occurred"}
            </p>
        )
    }
    return (
        <section className="relative py-12 sm:py-16 bg-transparent overflow-visible">
            {/* Seamless Glow Transition */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 container mx-auto px-6 lg:px-8">

                {/* Section Header - Semantic <header> */}
                <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-sm tracking-[0.3em] text-purple-400 uppercase mb-4 font-bold"
                        >
                            People choice&apos;s Designs
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
                        >
                            Crafting digital <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500 italic">
                                narratives
                            </span> through design.
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-xs tracking-[0.3em] text-purple-400 uppercase mt-4 font-bold"
                        >
                            Latest Designs
                        </motion.h2>
                    </div>

                    <nav>
                        <Link href={'/all-designs'} className="flex items-center gap-2 text-white border-b border-white/20 font-bold tracking-wider text-[18px] group pb-2 hover:text-seRed transition-all w-fit">
                            View All Designs{" "}
                            <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </nav>
                </header>

                {/* The Grid - Animated with motion.div */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-10"
                >
                    {latestDesign?.map((card, index) => (
                        <motion.article
                            key={`${card._id}-${index}`}
                            variants={cardVariants}
                            className="group relative overflow-hidden rounded-4xl border border-white/5 bg-[#111] transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] md:my-0 my-4"
                        >
                            {/* Image Section */}
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src={card.images[0]}
                                    alt={card.title}
                                    fill
                                    priority={index < 3}
                                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1"
                                />



                                {/* Category Tag */}
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-seRed backdrop-blur-md border border-white/10 text-white transition-all duration-300">
                                        {card.category}
                                    </span>
                                </div>
                            </div>

                            {/* Overlay Details */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-linear-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                <div className="space-y-3">
                                    <Link href={`/design-details/${card._id}`}>
                                        <h3 className="text-2xl font-bold text-white tracking-tighter leading-none hover:text-purple-400 transition-colors line-clamp-1 mb-2.5">
                                            {card.title}
                                        </h3>
                                    </Link>

                                    <div className="flex items-center justify-between">
                                        <Link href={`/design-details/${card._id}`} className="w-full">
                                            <button className="relative w-full overflow-hidden rounded-xl bg-white/10 px-4 py-3 text-xs font-bold text-white backdrop-blur-xl border border-white/10 transition-all hover:bg-white hover:text-black uppercase tracking-widest">
                                                View Project
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Project Number Indicator */}
                            <div className="absolute bottom-4 right-6 text-[10px] font-mono text-white/20 group-hover:opacity-0 transition-opacity uppercase tracking-tighter" aria-hidden="true">
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