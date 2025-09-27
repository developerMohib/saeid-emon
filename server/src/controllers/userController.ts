import {  Response } from "express";
import { User } from "../models/userModel";
import { AuthRequest } from "../types/express";

export const getAdminUser = async (req: AuthRequest, res: Response) => {
  try {
    console.log("user 6", req?.user); 

    const user = await User.findById(req?.user?.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" ,err});
  }
};
