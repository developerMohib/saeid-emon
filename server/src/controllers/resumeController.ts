import { Request, Response } from "express";
import { Resume } from "../models/resumeModel";

export const resumes = async (req: Request, res: Response) => {
  try {
    const resumes = await Resume.find();
    res.status(200).json({ success: true, data: resumes });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ success: false, message: err.message });
    } else {
      res.status(500).json({ success: false, message: "Unknown error occurred" });
    }
  }
};
