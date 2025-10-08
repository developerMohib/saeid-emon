"use client"
import instance from "@/hooks/instance";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
        <section id="contact" className="py-20 md:px-8 container mx-auto px-4">
            <div className="container-custom">
                {/* Contact Form */}
                <div className="p-8 rounded-xl">
                    <h3 className="text-2xl font-bold mb-6 text-seBlack">Send Us a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-seum mb-1 text-seBlack">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-3 rounded-lg bg-seGray/20 border border-seWhite 
          focus:outline-none focus:ring-2 focus:ring-seRed
          placeholder:text-seGray text-seBlack"
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-seum mb-1 text-seBlack">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 rounded-lg bg-seGray/20 border border-seWhite 
          focus:outline-none focus:ring-2 focus:ring-seRed
          placeholder:text-seGray text-seBlack"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-seum mb-1 text-seBlack">
                                Message
                            </label>
                            <textarea
                                id="message"
                                className="w-full px-4 py-3 rounded-lg bg-seGray/20 border border-seWhite 
          focus:outline-none focus:ring-2 focus:ring-seRed
          placeholder:text-seGray text-seBlack"
                                placeholder="Your message here..."
                            />
                        </div>

                        {/* Submit */}
                        <button disabled={loading}
                            type="submit"
                            className={`w-full bg-seRed text-seWhite font-seum py-3 rounded-lg hover:bg-seDarkRed transition-colors cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};


export default Contact;