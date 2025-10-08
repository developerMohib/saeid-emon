import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { otpStore } from "../utils/otpsender";
import { User } from "../models/userModel";

export const verifyAdminOtp = async (req: Request, res: Response) => {
  try {
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
    delete otpStore[email]; // done ✅
    // ☑ Get admin from DB
    const admin = await User.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }
    // ☑ JWT payload
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );
const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction, // production e MUST true
     sameSite: isProduction ? "none" : "lax", // cross-site cookie allow
      maxAge: 24 * 24 * 60 * 60 * 1000, // 1 days
    });
    // res.cookie("token", token, {
    //   httpOnly: false,
    //   secure: process.env.NODE_ENV === "production",
    //   // sameSite: "strict",
    //   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    //   // maxAge: parseInt(process.env.JWT_EXPIRES_IN as string, 10) * 60 * 1000,
    //   maxAge: 24 * 60 * 60 * 1000, // 1 day
    // });

    return res.status(200).json({
      success: true,
      message: "OTP verified, login success",
      user: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
