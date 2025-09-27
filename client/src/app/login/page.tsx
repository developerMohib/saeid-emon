"use client";

import { sendOtpRequest, verifyOtpRequest } from "@/utils/otpsender";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter()
console.log(' emial',email)
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await sendOtpRequest(email);
      setMessage(res.data.message);
      setStep("otp");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await verifyOtpRequest(email, otp);
      setMessage(res.data.message);
      // Redirect later if needed
      router.push("/dashboard");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[350px] bg-seWhite rounded-2xl p-6 shadow-md text-center">
        {/* Logo */}
        <div className="w-20 h-20 bg-seRed/80 rounded-full mx-auto mb-6 flex justify-center items-center">
          <span className="text-4xl text-seWhite">&#9679;&#9679;&#9679;</span>
        </div>

        {/* STEP 1: Enter Email */}
        {step === "email" && (
          <form onSubmit={handleSendOtp}>
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

            <button
              disabled={loading}
              type="submit"
              className="w-full py-2 bg-seRed/80 text-seWhite rounded-full font-semibold hover:bg-seBlue/80 cursor-pointer transition"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

            {message && <p className="mt-3 text-sm">{message}</p>}
          </form>
        )}

        {/* STEP 2: Verify OTP */}
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
                className="w-full mt-1 px-3 py-2 border border-seGray/50 rounded-lg outline-none text-sm focus:ring-2 focus:ring-seSlack/50"
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
      </div>
    </div>
  );
};

export default SignIn;
