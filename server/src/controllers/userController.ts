import { Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
import { otpsender } from "../utils/otpsender";
dotenv.config();

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });
    }
    const admin = await User.findOne({ email });
    // If admin not found → Delete all users and create this admin
    if (!admin) {
      return res.status(201).json({
        success: false,
        message: "Not Found Admin",
      });
    }

    // Check password for existing admin
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Send OTP
    await otpsender(email);

    return res.json({
      success: true,
      message: "OTP sent to email",
      user: { email: admin.email, name: admin.name },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", err });
  }
};
export const getAdminDetails = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.json({ data: users });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};
export const logoutAdmin = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", err });
  }
};
export const updateBanner = async (req: Request, res: Response) => {
  try {
    const filePath = req.file?.path;
    if (!filePath) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findOneAndUpdate(
      {}, // no condition, pick first user
      { banner: filePath },
      { new: true },
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, message: "Banner updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

export const updateAvatar = async (req: Request, res: Response) => {
  try {
    const filePath = req.file?.path;

    if (!filePath) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findOneAndUpdate(
      {},
      { avatar: filePath },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    res.json({
      success: true,
      message: "Avatar updated successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};
