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

    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      // maxAge: 15 * 60 * 1000,
      maxAge: parseInt(process.env.JWT_EXPIRES_IN as string, 10) * 60 * 1000,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "OTP verified, login success",
      user: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" , error});
  }
};
