"use client"
import instance from "@/hooks/instance";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiSend } from "react-icons/fi";

const Contact: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const message = (form.elements.namedItem("message") as HTMLInputElement).value;

        const formData = {
            name,
            email,
            message,
        };
        try {
            if (!name || !email || !message) {
                toast.error("Please fill in all fields");
                return;
            }
            setLoading(true);
            const response = await instance.post(
                "/api/contact",
                formData
            );
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
        <section id="contact" className="relative py-24 sm:py-32 bg-transparent overflow-visible">
            {/* The Final Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none opacity-50" />
            <div className="absolute bottom-[-5%] right-[-5%]  bg-blue-600/10 blur-[130px] rounded-full pointer-events-none opacity-50" />

            <div className="relative z-10 container mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16">

                    {/* Left Side: Branding & Info */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h2 className="text-sm font-mono tracking-[0.4em] text-blue-400 uppercase mb-4">Let&apos;s Connect</h2>
                            <h3 className="text-5xl font-bold text-white tracking-tight leading-tight">
                                Ready to define your <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500 italic">visual legacy?</span>
                            </h3>
                            <p className="mt-6 text-lg text-gray-400 max-w-md">
                                Whether you need a timeless logo or a full teamwear identity, I’m here to help you stand out.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: The Form */}
                    <div className="relative rounded-[2.5rem] border border-white/10 bg-white/2 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl">
                        {/* Added your handleSubmit functionality here */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2 px-1">Name</label>
                                    <input
                                        id="name"
                                        required
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2 px-1">Email</label>
                                    <input
                                        id="email"
                                        required
                                        type="email"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="projectType" className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2 px-1">Project Type</label>
                                <select id="projectType" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none">
                                    <option>Logo & Branding</option>
                                    <option>Jersey & Apparel</option>
                                    <option>Illustration</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2 px-1">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                    placeholder="Tell me about your vision..."
                                ></textarea>
                            </div>

                            {/* Added your loading state and disabled logic here */}
                            <button
                                disabled={loading}
                                type="submit"
                                className={`group relative w-full overflow-hidden rounded-xl bg-linear-to-r from-purple-600 to-blue-600 p-px transition-all hover:scale-[1.02] active:scale-[0.98] ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                            >
                                <div className="flex items-center justify-center gap-2 rounded-xl bg-[#0a0a0a] py-4 transition-all group-hover:bg-transparent">
                                    <span className="text-sm font-bold uppercase tracking-widest text-white">
                                        {loading ? "Sending..." : "Send Message"}
                                    </span>
                                    {!loading && <FiSend className="text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                </div>
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};


export default Contact;