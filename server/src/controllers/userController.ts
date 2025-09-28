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
