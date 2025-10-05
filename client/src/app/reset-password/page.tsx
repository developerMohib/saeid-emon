"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import instance from "@/hooks/instance";
import axios from "axios";

const ResetPasswordPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const token = searchParams.get("token");
    const [confirm, setConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // optionally redirect if missing
        if (!token || !email) {
            // router.push("/forget-password");
        }
    }, [token, email, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (password !== confirm) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            // Axios POST request
            const res = await instance.post("/auth/reset-password", {
                newPassword : password,
                confirm,
                token,email
            });

            // res.data already parsed by Axios
            if (res.data.success) {
                toast.success(res.data.message || "Password reset successful");
                router.push("/auth/login");
            } else {
                toast.error(res.data.message || "Reset failed");
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Something went wrong");
            } else {
                toast.error("Unexpected error occurred");
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="w-[400px] rounded-2xl p-6 shadow-md text-center">
                <h2 className="text-lg font-semibold mb-4">Reset Password</h2>
                <form onSubmit={handleSubmit}>

                    <div className="mb-4 text-left relative">
                        <label className="block text-sm font-medium text-seSlack">
                            Your Email
                        </label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border border-seGray/50 rounded-lg outline-none text-sm focus:ring-2 focus:ring-seSlack/50"
                            required
                        />
                    </div>
                    <div className="mb-4 text-left relative">
                        <label className="block text-sm font-medium text-seSlack">
                            New Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border border-seGray/50 rounded-lg outline-none text-sm focus:ring-2 focus:ring-seSlack/50"
                            required
                        />

                        {password && (<button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-seSlack/70 hover:text-seSlack"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>)}
                    </div>

                    <div className="mb-4 text-left relative">
                        <label className="block text-sm font-medium text-seSlack">
                            Confirm Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border border-seGray/50 rounded-lg outline-none text-sm focus:ring-2 focus:ring-seSlack/50"
                            required
                        />

                        {password && (<button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-seSlack/70 hover:text-seSlack"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>)}
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-2 bg-[#2c3e73] text-white rounded-full font-semibold hover:bg-[#1f2d52] transition disabled:opacity-60">
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
