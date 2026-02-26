"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FiArrowUpRight, FiCheckCircle, FiPenTool, FiInstagram, FiDribbble } from "react-icons/fi";

const Author2 = () => {
    // Animation Variants
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i = 0) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        })
    };

    return (
        <section className="relative py-24 bg-transparent overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 container mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">


                    {/* left: Content */}
                    <article className="flex-1 text-left">
                        <header>
                            <motion.h2
                                custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                                className="text-sm font-mono tracking-[0.5em] text-purple-400 uppercase font-bold mb-4"
                            >
                                Senior Graphic Designer
                            </motion.h2>

                            <motion.h3
                                custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                                className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl leading-tight mb-4"
                            >
                                Design That{" "}
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500 italic">
                                    Speaks
                                </span>
                            </motion.h3>

                            <motion.p
                                custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                                className="text-xl text-gray-400 leading-relaxed mb-8 font-light max-w-2xl"
                            >
                                I build strong brand identities and clean visual systems
                                that connect, communicate, and convert.
                            </motion.p>
                        </header>

                        {/* Skills Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <motion.div
                                custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                                className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/3 hover:bg-white/5 transition-colors"
                            >
                                <FiPenTool className="text-purple-400 mt-1" size={20} />
                                <div>
                                    <h4 className="text-white font-bold tracking-widest uppercase text-xs">Branding</h4>
                                    <p className="text-gray-500 text-sm mt-1">Logos, identity systems, brand guidelines.</p>
                                </div>
                            </motion.div>

                            <motion.div
                                custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                                className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/3 hover:bg-white/5 transition-colors"
                            >
                                <FiCheckCircle className="text-pink-500 mt-1" size={20} />
                                <div>
                                    <h4 className="text-white font-bold tracking-widest uppercase text-xs">Creative Assets</h4>
                                    <p className="text-gray-500 text-sm mt-1">Social media, print, packaging, campaigns.</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Footer Links */}
                        <motion.footer
                            custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                            className="flex flex-col sm:flex-row sm:items-center gap-8"
                        >
                            <Link href={'/about-me'} className="flex items-center gap-2 text-white font-mono text-xs font-bold tracking-[0.2em] uppercase group border-b border-purple-500 pb-2 hover:text-seRed transition-all w-fit">
                                Read More{" "}
                                <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>

                            <nav className="flex items-center gap-6 border-l border-white/10 pl-0 sm:pl-8">
                                <Link
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-gray-500 hover:text-purple-400 transition-colors text-xs font-mono tracking-widest uppercase"
                                >
                                    <FiInstagram size={18} /> Freelancer
                                </Link>

                                <Link
                                    href="https://dribbble.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors text-xs font-mono tracking-widest uppercase"
                                >
                                    <FiDribbble size={18} /> Fiverr
                                </Link>
                            </nav>
                        </motion.footer>
                    </article>


                    {/* Right: Visual Representation */}
                    <motion.aside
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative w-full lg:w-1/3 max-w-[400px]"
                    >
                        <div className="relative overflow-hidden backdrop-blur-sm group">
                            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/80 z-10" />
                            <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                                <Image
                                    src="https://res.cloudinary.com/dxcn3f9lu/image/upload/v1772104292/EMON_BANNERr_cge27q.png"
                                    alt="Saeid Emon"
                                    width={450}
                                    height={450}
                                    className="border-[3px] border-white/80 object-cover group-hover:grayscale grayscale-0 transition-all duration-700 rounded-md"
                                    priority
                                />
                            </div>

                            <div className="absolute bottom-4 left-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                                <p className="text-white text-[10px] font-mono uppercase tracking-[0.2em]">
                                    Experience
                                </p>
                                <p className="text-2xl font-bold text-white">
                                    08 Years
                                </p>
                            </div>
                        </div>
                    </motion.aside>



                </div>
            </div>
        </section>
    );
};

export default Author2;