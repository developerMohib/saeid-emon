import { Request, Response } from "express";
import { Admin } from "../models/adminModel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { otpsender } from "../utils/otpsender";
dotenv.config();

export const getAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });
    }

    const admin = await Admin.findOne({ email });
    // create new admin if not exist
    if (!admin) {
      // admin = new Admin({ email, password });
      // await admin.save();

      return res
        .status(201)
        .json({ success: true, message: "Not Found Admin" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // send OTP
    const otp = await otpsender(email);

    res.json({
      success: true,
      message: "OTP sent to email",
      otp, // remove in production
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
