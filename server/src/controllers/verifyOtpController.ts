import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { otpStore } from "../utils/otpsender";
import { User } from "../models/userModel";

export const verifyAdminOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    // ─── Validation ─────────────────────────────────────
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const record = otpStore[email];
    if (!record) {
      return res.status(400).json({ message: "No OTP requested" });
    }

    if (Date.now() > record.expiresAt) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ─── OTP Valid → Clean Up ───────────────────────────
    delete otpStore[email];

    // ─── Get Admin from DB ──────────────────────────────
    const admin = await User.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // ─── Generate JWT Token ─────────────────────────────
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );

    // ─── Set Cookie ─────────────────────────────────────
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction, // production e MUST true
      sameSite: isProduction ? "none" : "lax", // cross-site cookie allow
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // ─── Success Response ───────────────────────────────
    return res.status(200).json({
      success: true,
      message: "OTP verified, login success",
      user: {
        id: admin._id,
        email: admin.email,
      },
    });

  } catch (error) {
    // ─── Error Handler ─────────────────────────────────
    return res.status(500).json({ message: "Server error", error });
  }
};
