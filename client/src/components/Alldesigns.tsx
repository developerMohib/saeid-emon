"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import useProducts from '@/hooks/useProducts';
import Loader from "./Loader";
import { Loader2 } from "lucide-react";

const Alldesigns = () => {
    const {
        data: cardsData,
        error,
        isPending,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useProducts();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    };

    if (isPending) return <Loader />;

    if (isError) {
        return (
            <section role="alert" className="flex justify-center items-center min-h-64">
                <p className="text-red-600 text-lg">
                    An error has occurred: {error?.message || "Failed to load products"}
                </p>
            </section>
        );
    }

    return (
        <main className="py-20 overflow-hidden relative bg-transparent">
            {/* Background Accents */}
            <div className="absolute top-0 left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" aria-hidden="true" />

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <header className="mb-20 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm tracking-[0.4em] text-seRed uppercase mb-4 font-bold"
                    >
                        Archive & Works
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black tracking-wider text-white"
                    >
                        Curated Visual <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-500 to-seRed">
                            Excellence.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/80 mt-6 max-w-lg mx-auto font-medium leading-relaxed"
                    >
                        An extensive collection of brand identities, packaging solutions,
                        and digital merchandise crafted over 8 years of design exploration.
                    </motion.p>
                </header>

                {/* The Animated Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {cardsData?.map((card, index) => (
                        <motion.article
                            key={`${card._id}-${index}`}
                            variants={itemVariants}
                            className="group relative overflow-hidden rounded-4xl border border-white/5 bg-[#0f0f0f] transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_20px_50px_rgba(168,85,247,0.1)]"
                        >
                            <div className="relative aspect-4/5 overflow-hidden">
                                <Image
                                    src={card.images[0]}
                                    alt={`Design for ${card.title}`}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                />

                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graph-paper.png')]" aria-hidden="true" />

                                <div className="absolute top-5 left-5 z-10">
                                    <span className="px-4 py-1.5 rounded-full text-[9px] font-bold tracking-[0.2em] uppercase bg-seRed/90 backdrop-blur-md text-white border border-white/10">
                                        {card.category}
                                    </span>
                                </div>

                                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-linear-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
                                        {card.title}
                                    </h2>
                                    <Link
                                        href={`/design-details/${card._id}`}
                                        className="w-full py-3 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-seRed hover:text-white transition-all group shadow-sm active:scale-[0.98]"
                                    >
                                        View The Design
                                        <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>

            {/* Load More Button */}
            {hasNextPage && (
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-xl hover:bg-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed group w-64 shadow-lg active:scale-95"
                    >
                        {isFetchingNextPage ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Loading...</span>
                            </>
                        ) : (
                            <>
                                <span className="text-[10px] font-bold uppercase tracking-widest">Load More</span>
                                <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* End of Results */}
            {!hasNextPage && cardsData?.length > 0 && (
                <footer className="text-center py-12">
                    <div className="inline-flex items-center gap-4 text-gray-500">
                        <div className="h-px w-16 bg-white/10"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">All projects loaded</span>
                        <div className="h-px w-16 bg-white/10"></div>
                    </div>
                </footer>
            )}
        </main>
    );
};

export default Alldesigns;