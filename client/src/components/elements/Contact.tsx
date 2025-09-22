"use client"
import React from "react";

const Contact = () => {
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
        console.log(formData);
        const res = await fetch("/contact/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        alert(data.message);
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
                                className="w-full px-4 py-3 rounded-lg bg-seWhite border border-seWhite 
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
                                className="w-full px-4 py-3 rounded-lg bg-seWhite border border-seWhite 
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
                                className="w-full px-4 py-3 rounded-lg bg-seWhite border border-seWhite 
          focus:outline-none focus:ring-2 focus:ring-seRed
          placeholder:text-seGray text-seBlack"
                                placeholder="Your message here..."
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-seRed hover:bg-seGreen text-black font-bold py-3 px-6 rounded-lg transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};


export default Contact;