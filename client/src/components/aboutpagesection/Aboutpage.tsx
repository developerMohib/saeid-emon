"use client";
import { motion, Variants } from "framer-motion";
import HeroVisual from "@/components/aboutpagesection/HeroVisual";
import ToolsGrid from "@/components/aboutpagesection/ToolsGrid";
import { FiArrowDown, FiLayers } from "react-icons/fi";

// Animation Variants
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

export default function AboutPage() {
    return (
        <main className="bg-background text-foreground transition-colors duration-300 overflow-hidden">

            {/* 1. HERO SECTION */}
            <section className="relative py-24 px-6 lg:px-8 container mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
                >
                    <header className="lg:col-span-7">
                        <motion.p variants={fadeInUp} className="text-seRed text-xs tracking-[0.5em] uppercase mb-6 font-bold">
                            Est. 2018 — Legacy of Craft
                        </motion.p>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black tracking-tighter text-seBlack leading-[0.9] mb-6">
                            Saeid Emon. <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent via-sered to-seRed italic">
                                Visual Architect.
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-xl text-seBlack leading-relaxed max-w-2xl mb-6">
                            With nearly a decade of experience, I’ve transitioned from creating simple graphics to engineering
                            comprehensive visual identities.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex items-center gap-6">
                            <div className="text-left">
                                <p className="text-6xl font-black text-seBlack leading-none">08</p>
                                <p className="text-seGray uppercase tracking-widest text-[10px] mt-2">Years of <br /> Industry Grit</p>
                            </div>
                        </motion.div>
                    </header>

                    <motion.aside
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5 flex justify-center lg:justify-end"
                    >
                        <HeroVisual />
                    </motion.aside>
                </motion.div>
            </section>

            {/* 2. THE SPEC SHEET - Reveal on Scroll */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="py-20 bg-foreground/3 backdrop-blur-sm border-y border-foreground/5"
            >
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <motion.article variants={fadeInUp}>
                            <div className="flex items-center gap-3 mb-8 text-accent">
                                <FiLayers size={20} />
                                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold">Core Disciplines</h3>
                            </div>
                            <ul className="space-y-6 text-seBlack text-lg font-medium">
                                {["Identity Construction", "Technical Apparel Design", "Vector Mathematics", "Brand Strategy"].map((item) => (
                                    <motion.li
                                        key={item}
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-3 group cursor-default"
                                    >
                                        <span className="h-px w-4 bg-seRed group-hover:w-8 transition-all" />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.article>

                        <motion.div variants={fadeInUp} className="md:col-span-2">
                            <ToolsGrid />
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* 3. DESIGN PHILOSOPHY */}
            <section className="py-32 px-6 lg:px-8 container mx-auto text-center">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="inline-block p-4 rounded-full border border-foreground/10 mb-12"
                >
                    <FiArrowDown className="text-seRed" />
                </motion.div>

                <motion.blockquote
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="border-none p-0 m-0"
                >
                    <h2 className="text-3xl md:text-6xl font-bold text-seBlack tracking-tighter max-w-5xl mx-auto leading-tight">
                        &quot;A logo is not a brand. <br /> It is a <span className="italic text-seRed">trigger</span> for a brand&apos;s entire story.&quot;
                    </h2>
                </motion.blockquote>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    <StatCard block="Agencies" value="04" />
                    <StatCard block="Projects" value="250+" />
                    <StatCard block="Sublimation" value="100%" />
                    <StatCard block="Precision" value="0.01mm" />
                </motion.div>
            </section>
        </main>
    );
}

function StatCard({ block, value }: { block: string; value: string }) {
    return (
        <motion.div
            variants={fadeInUp}
            // 1. Removed hardcoded backgroundColor animation
            whileHover={{ y: -5 }} 
            className="p-10 border border-foreground/5 rounded-[2.5rem] transition-all group shadow-sm 
                       bg-seWhite text-seBlack 
                       hover:bg-background hover:border-accent/20" 
        >
            <p className="text-seGray text-[10px] uppercase tracking-[0.3em] mb-3 group-hover:text-seRed transition-colors">
                {block}
            </p>
            <p className="text-4xl font-black tracking-tighter">
                {value}
            </p>
        </motion.div>
    );
}