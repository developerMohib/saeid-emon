"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import instance from "@/hooks/instance";
import toast from "react-hot-toast";

interface ForgotPasswordResponse {
  success?: boolean;
  message?: string;
}

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);
    try {
      const res = await instance.post(
        "/auth/forget-password",
        { email }
      );

      toast.success(
        res.data?.message || "If the email exists, a reset link has been sent."
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ForgotPasswordResponse>;
        toast.error(
          axiosError.response?.data?.message ||
            "Something went wrong, please try again."
        );
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-[350px] rounded-2xl p-6 shadow-md text-center">
        <h2 className="text-lg font-semibold mb-4">Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter your email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-[#2c3e73]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#2c3e73] text-white rounded-full font-semibold hover:bg-[#1f2d52] transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
