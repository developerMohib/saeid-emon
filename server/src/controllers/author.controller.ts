import { Request, Response } from "express";
import { Author } from "../models/author.model";

/**
 * @description   Get all author data
 * @route   GET /api/author/get
 */

export const authorData = async (req: Request, res: Response) => {
  try {
    const author = await Author.find().lean();

    res.status(200).json({
      success: true,
      message: "Author data is retrieved successfully",
      data: author,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "To find author details in server, but server is not connected",
      error,
    });
  }
};

/**
 * @description    Update author data by ID
 * @route   PUT /api/author/update/data
 */

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const data = req.body;
console.log("Received data for update:", data);
    const updatedAuthor = await Author.findOneAndUpdate({}, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedAuthor) {
      res.status(404).json({
        success: false,
        message: "No data found to update",
      });
       return
    }

    res.status(200).json({
      success: true,
      message: "Author data updated successfully",
      data: updatedAuthor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update author data",
      error,
    });
  }
};
