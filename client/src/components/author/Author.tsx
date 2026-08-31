"use client";

import { useState } from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FiArrowUpRight, FiCheckCircle, FiPenTool, FiDribbble } from "react-icons/fi";
import { RiFiverrLine } from "react-icons/ri";
import { PenLine } from "lucide-react";
import BannerModal from "../modals/BannerModal";
import useAuthor from "@/hooks/useAuthor";
import { SiFreelancer } from "react-icons/si";

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
    // const isAuthenticated = true;
    const [showModal, setShowModal] = useState(false);
    const [inputfield, setInputfield] = useState(false)
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const { isPending, data: author } = useAuthor();
    const isAuthenticated = Array.isArray(author) && author.length > 0;
    console.log(11, author);
    console.log(22, isAuthenticated);


    const [bannerData, setBannerData] = useState({
        badge: "Available for Freelance",
        titleLine: "Design That",
        highlight: "Works Harder",
        subTitleLine: "Than Works.",
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
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedImage(file);

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
    };
    const handleCancel = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setInputfield(false);
        setPreview(null);
        setSelectedImage(null);
    };
    const handleUpload = async () => {
        if (!selectedImage) return;

        try {
            // upload image to backend/cloudinary
        } catch (error) {
            console.error(error);
        }
    };

    if (isPending) {
        return <div>Loading...</div>;
    }
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
                                <SocialLink href="https://www.freelancer.com/u/saeidemon" icon={<SiFreelancer />} label="Freelancer" />
                                <SocialLink href="https://dribbble.com" icon={<FiDribbble />} label="Dribbble" />
                                <SocialLink href="https://www.fiverr.com/saeidemon" icon={<RiFiverrLine />} label="Fiverr" />
                            </nav>
                        </motion.footer>



                        


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
                        <div className="relative overflow-hidden rounded-2xl group">

                            {/* Main Image */}
                            <div className="w-full h-full flex items-center justify-center p-2">
                                <Image
                                    src={
                                        "https://res.cloudinary.com/dxcn3f9lu/image/upload/v1772104292/EMON_BANNERr_cge27q.png"
                                    }
                                    alt="Banner"
                                    width={450}
                                    height={450}
                                    className="object-cover transition-all duration-700 rounded-lg"
                                    priority
                                />
                            </div>

                            {/* Experience Badge */}
                            <div className="absolute bottom-4 left-6 z-20 bg-seBlack/80 backdrop-blur-md border border-seWhite/10 p-4 rounded-2xl">
                                <p className="text-seWhite opacity-70 text-[10px] uppercase tracking-[0.2em]">
                                    Experience
                                </p>
                                <p className="text-2xl font-black text-seWhite">08 Years</p>
                            </div>

                            {/* Edit Button */}
                            {isAuthenticated && (
                                <button
                                    title="Image change"
                                    onClick={() => setInputfield(true)}
                                    className="absolute top-4 right-4 bg-seRed p-2 rounded-full shadow cursor-pointer text-white hover:bg-red-700 transition"
                                >
                                    <PenLine size={16} />
                                </button>
                            )}

                            {/* Upload Modal */}
                            {inputfield && (
                                <div className="absolute top-5 right-6 z-50">
                                    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-md shadow-lg">

                                        <h2 className="text-xl font-semibold text-center mb-4 dark:text-white">
                                            Upload Image
                                        </h2>

                                        {/* Upload Box */}
                                        <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md px-2 py-3 text-center">

                                            <input
                                                type="file"
                                                className="hidden"
                                                id="fileInput"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />

                                            {!preview ? (
                                                <>
                                                    <svg
                                                        className="mx-auto h-16 w-16 text-gray-400 mb-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M16 17l-4 4m0 0l-4-4m4 4V3"
                                                        />
                                                    </svg>

                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Drag & Drop or{" "}
                                                        <label
                                                            htmlFor="fileInput"
                                                            className="cursor-pointer text-blue-500 hover:underline"
                                                        >
                                                            browse
                                                        </label>
                                                    </p>
                                                </>
                                            ) : (
                                                <div className="relative">
                                                    <Image
                                                        src={preview}
                                                        alt="Preview"
                                                        width={400}
                                                        height={200}
                                                        className="w-full h-40 object-cover rounded-md"
                                                    />

                                                    <label
                                                        htmlFor="fileInput"
                                                        className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded cursor-pointer"
                                                    >
                                                        Change
                                                    </label>
                                                </div>
                                            )}
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex gap-2 mt-4">
                                            <button
                                                onClick={handleCancel}
                                                className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                onClick={handleUpload}
                                                disabled={!selectedImage}
                                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded disabled:opacity-50"
                                            >
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
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
        className="flex items-center gap-2 text-seGray hover:text-seRed transition-colors text-sm tracking-widest uppercase font-bold"
    >
        {icon} {label}
    </Link>
);