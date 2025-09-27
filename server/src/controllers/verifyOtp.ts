import { Request, Response } from "express";
import { otpStore } from "./sendEmailController";
import { User } from "../models/userModel";

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

  // TODO: Create token/session here
  return res.json({ message: "Login success", user });

};
