import { Request, Response } from "express";
import { otpStore } from "./sendEmailController";
import { User } from "../models/userModel";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const verifyOtp = async (req: Request, res: Response) => {
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

  // Try to find the user
  let user = await User.findOne({ email });

  // If user does not exist, create with default data
  if (!user) {
    user = new User({
      name: "Saeid Emon",
      email: email,
      role: "admin",
      bio: "",
      currentPosition: "",
      experience: "",
      location: "",
      avatar: "https://i.pravatar.cc/150?img=12",
      description: "",
      social: {
        fb: "",
        twitter: "",
        linkedin: "",
        instagram: "",
      },
    });

    await user.save();
  }

  // Create token/session here

  // Create JWT payload
  const payload = { id: user._id, email: user.email, role: user.role };

  // Sign token
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  // Set HTTP-only cookie
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      message: "OTP verified successfully",
      user,
    });

  return res.json({ message: "Login success", user });
};
