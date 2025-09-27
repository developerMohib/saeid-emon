import { Request, Response } from "express";
import { otpStore } from "./sendEmailController";

export const verifyOtp = (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const record = otpStore[email];
  if (!record) return res.status(400).json({ message: "No OTP requested" });

  if (Date.now() > record.expiresAt) {
    return res.status(400).json({ message: "OTP expired" });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete otpStore[email]; // optional: remove after success

  // TODO: Create token/session here
  return res.json({ message: "Login success" });
};
