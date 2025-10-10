"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyOtpRequest } from "@/utils/otpsender";
import axios from "axios";

type Props = {
  email: string;
};

const OtpForm = ({ email }: Props) => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtpRequest(email, otp);
      setMessage(res.data.message);

      // On success, redirect to dashboard
      router.push("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "Error sending OTP");
      } else {
        setMessage("Error sending OTP");
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleVerifyOtp();
      }}
      className="w-full max-w-sm mx-auto"
      aria-label="OTP Verification Form"
    >
      <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>

      <label htmlFor="otp" className="sr-only">
        OTP
      </label>
      <input
        id="otp"
        type="text"
        inputMode="numeric"
        pattern="\d*"
        placeholder="Enter OTP"
        className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
      >
        Verify OTP
      </button>

      {message && (
        <p className="mt-3 text-sm text-center text-seBlack">{message}</p>
      )}
    </form>
  );
};

export default OtpForm;
