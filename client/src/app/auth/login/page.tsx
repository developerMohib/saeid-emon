"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import instance from "@/hooks/instance";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // ✅ STEP 1: Login with email & password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await instance.post("/auth/login", { email, password });

      if (res.data.success) {
        toast.success("OTP sent to email");
        setMessage("OTP sent to your email");
        setStep("otp");
      } else {
        setMessage(res.data.message || "Login failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "Login error");
      } else {
        setMessage("Login error");
      }
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await instance.post("/auth/verify-otp", { email, otp });

      if (res.data.success && res.data.user) {
        toast.success("OTP Verified! Logged in successfully");
        window.dispatchEvent(new Event("authChange"));
        router.push("/dashboard");
      } else {
        setMessage(res.data.message || "Invalid OTP");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "Error verifying OTP");
      } else {
        setMessage("Error verifying OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-87.5 bg-seWhite rounded-2xl p-6 shadow-md text-center">
        <div className="w-20 h-20 bg-seRed/80 rounded-full mx-auto mb-6 flex justify-center items-center">
          <span className="text-4xl text-seWhite">&#9679;&#9679;&#9679;</span>
        </div>

        {/* ✅ STEP 1: Email + Password */}
        {step === "email" && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-left">
              <label className="block text-sm font-medium text-seSlack">
                Your Email
              </label>
              <input
                type="email"
                placeholder="Username@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-seGray/50 rounded-lg outline-none text-sm focus:ring-2 focus:ring-seSlack/50 text-seGray/80"
                required
              />
            </div>
            <div className="mb-4 text-left relative">
              <label className="block text-sm font-medium text-seSlack">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="***"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-seGray/50 rounded-lg outline-none text-sm focus:ring-2 focus:ring-seSlack/50 text-seGray/80"
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

            <button
              disabled={loading}
              type="submit"
              className="w-full py-2 bg-seRed/80 text-seWhite rounded-full font-semibold hover:bg-seBlue/80 cursor-pointer transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {message && <p className="mt-3 text-sm">{message}</p>}
          </form>
        )}

        {/* ✅ STEP 2: OTP Input */}
        {step === "otp" && (
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-4 text-left">
              <label className="block text-sm font-medium text-seSlack">
                Enter OTP
              </label>
              <input
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-seGray/50 rounded-lg outline-none text-sm focus:ring-2 focus:ring-seSlack/50 text-seGray/80"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-seRed/80 text-seWhite rounded-full font-semibold hover:bg-seBlue/80 cursor-pointer transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            {message && <p className="mt-3 text-sm">{message}</p>}
          </form>
        )}
        <Link href={"/forget-password"} className="text-sm mt-5 text-seGray/80 hover:underline">
          <span>Forget Password</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;

