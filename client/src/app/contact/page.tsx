"use client";
import instance from "@/hooks/instance";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiSend } from "react-icons/fi";
import { motion, Variants } from "framer-motion";

const fadeInUp :Variants= {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Contact: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const message = (form.elements.namedItem("message") as HTMLInputElement).value;

        const formData = { name, email, message };
        
        try {
            if (!name || !email || !message) {
                toast.error("Please fill in all fields");
                return;
            }
            setLoading(true);
            const response = await instance.post("/api/contact", formData);
            toast.success(response.data.message || "Message sent successfully");
            form.reset();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.error || "Failed to send message");
            } else {
                toast.error("Failed to send message");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="relative py-24 sm:py-32 bg-background text-foreground transition-colors duration-300 overflow-hidden">
            {/* 1. Dynamic Background Accents */}
            <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-accent/10 blur-[150px] rounded-full pointer-events-none opacity-50" />
            <div className="absolute bottom-[-5%] right-[-5%] bg-seBlue/10 blur-[130px] rounded-full pointer-events-none opacity-50" />

            <div className="relative z-10 container mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16 items-center">

                    {/* Left Side: Branding & Info */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.2 }}
                        className="flex flex-col justify-between"
                    >
                        <div>
                            <motion.h2 variants={fadeInUp} className="text-sm font-mono tracking-[0.4em] text-seRed uppercase mb-4">
                                Let&apos;s Connect
                            </motion.h2>
                            <motion.h3 variants={fadeInUp} className="text-5xl md:text-6xl font-black text-seBlack tracking-tight leading-tight">
                                Ready to define your <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-seRed italic">visual legacy?</span>
                            </motion.h3>
                            <motion.p variants={fadeInUp} className="mt-6 text-lg text-seGray max-w-md">
                                Whether you need a timeless logo or a full teamwear identity, I’m here to help you stand out.
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* Right Side: The Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative rounded-[2.5rem] border border-foreground/10 bg-seWhite backdrop-blur-2xl p-8 sm:p-12 shadow-2xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-seGray mb-2 px-1">Name</label>
                                    <input
                                        id="name"
                                        required
                                        type="text"
                                        className="w-full bg-background border border-foreground/10 rounded-xl py-3 px-4 text-seBlack focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-seGray/30"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-seGray mb-2 px-1">Email</label>
                                    <input
                                        id="email"
                                        required
                                        type="email"
                                        className="w-full bg-background border border-foreground/10 rounded-xl py-3 px-4 text-seBlack focus:outline-none focus:ring-2 focus:ring-seBlue/50 transition-all placeholder:text-seGray/30"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="projectType" className="block text-xs font-mono uppercase tracking-widest text-seGray mb-2 px-1">Project Type</label>
                                <select id="projectType" className="w-full bg-background border border-foreground/10 rounded-xl py-3 px-4 text-seBlack focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none cursor-pointer">
                                    <option className="bg-background">Logo & Branding</option>
                                    <option className="bg-background">Jersey & Apparel</option>
                                    <option className="bg-background">Illustration</option>
                                    <option className="bg-background">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-seGray mb-2 px-1">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    className="w-full bg-background border border-foreground/10 rounded-xl py-3 px-4 text-seBlack focus:outline-none focus:ring-2 focus:ring-seBlue/50 transition-all placeholder:text-seGray/30"
                                    placeholder="Tell me about your vision..."
                                ></textarea>
                            </div>

                            <button
                                disabled={loading}
                                type="submit"
                                className={`group relative w-full overflow-hidden rounded-xl bg-linear-to-r from-accent to-seRed p-px transition-all hover:scale-[1.01] active:scale-[0.98] ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                            >
                                <div className="flex items-center justify-center gap-2 rounded-xl bg-seWhite py-4 transition-all group-hover:bg-transparent">
                                    <span className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${loading ? "text-seGray" : "text-seBlack group-hover:text-white"}`}>
                                        {loading ? "Sending..." : "Send Message"}
                                    </span>
                                    {!loading && <FiSend className="text-seRed group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />}
                                </div>
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Contact;