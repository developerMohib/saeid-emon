import { Request, Response } from "express";
import { Banner } from "../models/banner.model";

/**
 * @description   Get all banners
 * @route   GET /api/banners
 */
export const getBanner2 = async (req: Request, res: Response) => {
  try {
    const banners = await Banner.find().lean();

    res.status(200).json({
      success: true,
      message: "Banner data is retrieved successfully",
      data : banners
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "To find banner details in server, but server is not connected",
      error,
    });
  }
};

/**
 * @description    Update a banner by ID
 * @route   PUT /api/update/banners
 */

export const updateBanner2 = async (req: Request, res: Response) => {
  try {

    console.log("Received banner update data:");
    

    res.status(200).json({
      success: true,
      message: "Banner saved successfully",
      data: " hello world",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Save failed", error });
  }
};