"use client";

import React, { useState } from "react";
const ForgetPassword = () => {
     const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // console.log("Send reset link to:", email);

    // 👉 Later: call your backend API to send reset email
    // await fetch("/api/forgot-password", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    // });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#e7edf5]">
      <div className="w-[350px] bg-white rounded-2xl p-6 shadow-md text-center">
        <h2 className="text-lg font-semibold mb-4">Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-gray-700">
              Enter your email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-[#2c3e73]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#2c3e73] text-white rounded-full font-semibold hover:bg-[#1f2d52] transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
    );
};

export default ForgetPassword;