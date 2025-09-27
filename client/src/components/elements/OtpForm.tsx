"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { verifyOtpRequest } from "@/utils/otpsender";

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

            // ✅ On success, redirect to dashboard or home
            router.push("/dashboard");
        } catch (error: any) {
            setMessage(error?.response?.data?.message || "Invalid OTP");
        }
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Enter OTP</h2>
            <input
                type="text"
                placeholder="Enter OTP"
                className="w-full border px-3 py-2 rounded mb-3"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <button
                onClick={handleVerifyOtp}
                className="w-full bg-green-600 text-white py-2 rounded"
            >
                Verify OTP
            </button>
            {message && <p className="mt-2 text-sm">{message}</p>}
        </div>
    );
};

export default OtpForm;
