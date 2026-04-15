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
      message: "Banners retrieved successfully",
      data: banners,
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
// export const updateBanner2 = async (req: Request, res: Response) => {
//   try {
//     const { data } = req.body;
//     console.log("Received update request for banner: 33", data);
//     if (!data || !data.id) {
//       res
//         .status(400)
//         .json({ success: false, message: "Banner ID is required" });
//       return;
//     }

//     const banner = await Banner.findByIdAndUpdate(data.id, req?.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!banner) {
//       res.status(404).json({ success: false, message: "Banner not found" });
//       return;
//     }

//     res.status(200).json({
//       success: true,
//       message: "Banner updated successfully",
//       data: banner,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Update failed", error });
//   }
// };

export const upsertSingleBanner = async (req: Request, res: Response) => {
  try {
    // Try to find the first banner
    let banner = await Banner.findOne();
    console.log("Received upsert request for banner: ", req.body);
    if (!banner) {
      // If no banner exists, create one
      banner = new Banner(req.body);
      await banner.save();
      return res.status(201).json({
        success: true,
        message: "Banner created successfully",
        data: banner,
      });
    }

    // If banner exists, update it
    banner.set(req.body);
    await banner.save();

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Upsert failed", error });
  }
};
