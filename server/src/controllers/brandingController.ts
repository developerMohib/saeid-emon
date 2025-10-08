import { Request, Response } from "express";
import { Types } from "mongoose";
import { Branding, IBranding } from "../models/brandingModel";



// ✅ Create new Branding
export const createBranding = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, img, link } = req.body;
    const branding = new Branding({ name, img, link });
    await branding.save();

    res.status(201).json({
      success: true,
      Branding,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "Unknown server error" });
    }
  }
};

// ✅ Get all Brands
export const getBrands = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const brands: IBranding[] = await Branding.find();
    res.json({ success: true, brands });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "Unknown server error" });
    }
  }
};

// ✅ Update Branding
export const updateBranding = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: "Invalid Branding ID" });
      return;
    }

    const updated = await Branding.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      res.status(404).json({ success: false, message: "Branding not found" });
      return;
    }

    res.json({ success: true, updated });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "Unknown server error" });
    }
  }
};

// ✅ Delete Branding
export const deleteBranding = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: "Invalid Branding ID" });
      return;
    }

    const deleted = await Branding.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ success: false, message: "Branding not found" });
      return;
    }

    res.json({ success: true, message: "Branding deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "Unknown server error" });
    }
  }
};
