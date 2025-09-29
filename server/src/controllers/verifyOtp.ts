import { Request, Response } from "express";
import { Admin } from "../models/adminModel";
import jwt from "jsonwebtoken";
import { otpStore } from "../utils/otpsender";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const verifyAdminOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    console.log("Verifying OTP for:", email, otp);
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
    const record = otpStore[email];
    console.log("Stored OTP record:", record);

    if (!record) return res.status(400).json({ message: "No OTP requested" });
    if (Date.now() > record.expiresAt) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    delete otpStore[email]; // done ✅

    // ☑ Get admin from DB
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // ☑ JWT payload
    const payload = { id: admin._id, email: admin.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
    console.log("Generated JWT Token: ", token);

    return res.status(200).json({
      success: true,
      message: "OTP verified, login success",
      user: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Error in verifyAdminOtp:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
