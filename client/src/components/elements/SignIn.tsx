"use client";

import Link from "next/link";
import React, { useState } from "react";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload
        console.log("Email:", email);
        console.log("Password:", password);
setLoading(false)
        // 👉 Later: call API here
        // await fetch("/api/login", { method: "POST", body: JSON.stringify({ email, password }) })
    };
    return (
        <div className="flex justify-center items-center">
            <div className="w-[350px] h-[70vh] bg-seWhite rounded-2xl p-6 shadow-md text-center">
                {/* Logo */}
                <div className="w-20 h-20 bg-seRed/80 rounded-full mx-auto mb-6 flex justify-center items-center">
                    <span className="text-4xl text-seWhite">&#9679;&#9679;&#9679;</span>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-4 text-left">
                        <label className="block text-sm font-medium text-seSlack">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Username@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border border-seGray/50 rounded-lg outline-none text-sm focus:ring-2 focus:ring-seSlack/50"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4 text-left">
                        <label className="block text-sm font-medium text-seSlack">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border border-seGray/50 rounded-lg outline-none text-sm focus:ring-2 focus:ring-seSlack/50"
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <button disabled={loading}
                        type="submit"
                        className="w-full py-2 bg-seRed/80 text-seWhite rounded-full font-semibold hover:bg-seBlue/80 cursor-pointer transition"
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>

                {/* Footer Links */}
                <div className="mt-4 text-sm text-right">                    
                    <Link href="/forget-password" className="text-seSlack/50 hover:underline">
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;