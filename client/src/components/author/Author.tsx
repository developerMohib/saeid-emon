"use client";

import { useState } from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FiArrowUpRight, FiCheckCircle, FiPenTool, FiInstagram, FiDribbble } from "react-icons/fi";
import { PenLine } from "lucide-react";
import BannerModal from "../modals/BannerModal";

export const metadata: Metadata = {
    title: "About | Saeid Emon - Graphics Designer",
    description: "Learn more about Saeid Emon — a passionate graphics designer specializing in logo design, branding, and visual storytelling.",
    openGraph: {
        title: "About | Saeid Emon",
        description: "Meet Saeid Emon, a creative professional graphics designer with years of experience in brand identity design.",
        url: "https://www.saeidemon.com",
        siteName: "Saeid Emon",
        images: [
            {
                url: "/emons-logo.png",
                width: 1200,
                height: 630,
                alt: "Saeid Emon - About Page",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About | Saeid Emon",
        description: "Learn more about Saeid Emon — a professional graphics designer specializing in logo and brand identity design.",
        images: ["/emons-logo.png"],
        creator: "@saeidemon",
    },
};

const Author = () => {
    const isAuthenticated = true;
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [bannerData, setBannerData] = useState({
        badge: "Available for Freelance",
        titleLine1: "Design That",
        highlight: "Works Harder",
        titleLine3: "Than Words.",
        description:
            "Distilling brand values into iconic marks and modern apparel through intentional, grid-based design.",
    });



    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i = 0) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        })
    };



    return (
        <section className="relative py-24 overflow-hidden transition-colors duration-500 bg-background">
            {/* Dynamic Background Glow - Uses your accent color */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 container mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left: Content */}
                    <article className="flex-1 text-left">
                        <header>
                            <motion.h2
                                custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                                className="text-sm tracking-[0.5em] text-accent uppercase font-bold mb-4"
                            >
                                Senior Graphic Designer
                            </motion.h2>

                            <motion.h3
                                custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                                className="text-4xl font-black tracking-tight text-seBlack sm:text-6xl leading-tight mb-4"
                            >
                                Design That{" "}
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-seRed italic">
                                    Speaks
                                </span>
                            </motion.h3>

                            <motion.p
                                custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                                className="text-xl text-seGray leading-relaxed mb-8 font-medium max-w-2xl"
                            >
                                I build strong brand identities and clean visual systems
                                that connect, communicate, and convert.
                            </motion.p>
                        </header>

                        {/* Skills Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            {[
                                { icon: <FiPenTool />, title: "Branding", desc: "Logos, identity systems, brand guidelines.", color: "text-accent" },
                                { icon: <FiCheckCircle />, title: "Creative Assets", desc: "Social media, print, packaging, campaigns.", color: "text-seRed" }
                            ].map((skill, idx) => (
                                <motion.div
                                    key={idx}
                                    custom={3 + idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                                    className="flex items-start gap-4 p-5 rounded-2xl border border-seGray/20 bg-seWhite hover:border-seRed/40 transition-all shadow-sm"
                                >
                                    <span className={`${skill.color} mt-1 text-xl`}>{skill.icon}</span>
                                    <div>
                                        <h4 className="text-seBlack font-bold tracking-widest uppercase text-xs">{skill.title}</h4>
                                        <p className="text-seGray text-sm mt-1">{skill.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Footer Links */}
                        <motion.footer
                            custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                            className="flex flex-col sm:flex-row sm:items-center gap-8"
                        >
                            <Link href={'/about-me'} className="flex items-center gap-2 text-seBlack text-xs font-bold tracking-[0.2em] uppercase group border-b-2 border-seRed pb-2 hover:text-seRed transition-all w-fit">
                                Read More{" "}
                                <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>

                            <nav className="flex items-center gap-6 border-l border-seGray/20 pl-0 sm:pl-8">
                                <SocialLink href="https://instagram.com" icon={<FiInstagram />} label="Freelancer" />
                                <SocialLink href="https://dribbble.com" icon={<FiDribbble />} label="Fiverr" />
                            </nav>
                        </motion.footer>



                        {isAuthenticated && (
                            <button
                                title="Edit Heading and Subheading"
                                onClick={() => setShowModal(true)}
                                className="absolute top-4 left-0 bg-seRed p-2 rounded-full shadow cursor-pointer text-white hover:bg-red-700 transition"
                                aria-label="Edit Banner"
                            >
                                <PenLine size={16} />
                            </button>
                        )}


                        {showModal && (
                            <BannerModal
                                initialData={bannerData}
                                onClose={() => setShowModal(false)}
                                onSave={(data) => setBannerData(data)}
                            />
                        )}


                    </article>

                    {/* Right: Visual Representation */}
                    <motion.aside
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative w-full lg:w-1/3 max-w-100"
                    >
                        <div className="relative overflow-hidden rounded-2xl group ">


                            <div className="w-full h-full flex items-center justify-center p-2">
                                <Image
                                    src="https://res.cloudinary.com/dxcn3f9lu/image/upload/v1772104292/EMON_BANNERr_cge27q.png"
                                    alt="Saeid Emon"
                                    width={450}
                                    height={450}
                                    className="object-cover grayscale-0 group-hover:grayscale transition-all duration-700 rounded-lg"
                                    priority
                                />
                            </div>

                            {/* Experience Badge - High contrast theme badge */}
                            <div className="absolute bottom-4 left-6 z-20 bg-seBlack/80 backdrop-blur-md border border-seWhite/10 p-4 rounded-2xl">
                                <p className="text-seWhite opacity-70 text-[10px] uppercase tracking-[0.2em]">
                                    Experience
                                </p>
                                <p className="text-2xl font-black text-seWhite">
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

export default Author;

/* Helper Component for Social Links */
const SocialLink = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => (
    <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 text-seGray hover:text-seRed transition-colors text-xs tracking-widest uppercase font-bold"
    >
        {icon} {label}
    </Link>
);