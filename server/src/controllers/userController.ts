import { Request, Response } from "express";
import { User } from "../models/userModel";

export const getAdminUser = async (req: Request, res: Response) => {
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
