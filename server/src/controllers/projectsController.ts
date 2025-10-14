/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from "express";
import { Product } from "../models/product";
import sharp from "sharp";
import cloudinary from "../config";

// ─── GET all cards ──────────────────────────────────────
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const cards = await Product.find();
    res.json({
      success: true,
      message: "All Data Retrieved Successfully",
      data: cards,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

// ─── GET single card by ID ─────────────────────────────
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const card = await Product.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ error: "Card not found from server" });
    }

    res.json(card);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

// ─── CREATE new project ────────────────────────────────
// export const createProject = async (req: Request, res: Response) => {
//   try {
//     const { title, intro, category } = req.body;
//     const files = req.files as Express.Multer.File[];

//     if (!files || files.length === 0) {
//       return res.status(400).json({ message: "Images are required" });
//     }

//     const uploadedImages = files.map((file) => file.path);

//     const newProduct = await Product.create({
//       title,
//       intro,
//       category,
//       images: uploadedImages,
//     });

//     res.status(201).json({
//       message: "Product created successfully",
//       data: newProduct,
//       success: true,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


const MAX_TOTAL = 10 * 1024 * 1024; // 10 MB

// ─── Helper: Compress to target size ────
async function compressToTarget(
  buffer: Buffer,
  targetSize: number,
): Promise<Buffer> {
  const ratio = targetSize / buffer.length;
  const quality = Math.max(30, Math.min(90, Math.floor(ratio * 90)));
  return await sharp(buffer).jpeg({ quality }).toBuffer();
}

// ─── Main Controller ────────────────────
export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, intro, category } = req.body;
    const files = req.files as Express.Multer.File[];

    // ✅ Input validation
    if (!title || !intro || !category) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Title, intro, and category are required",
        });
    }

    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    // ✅ Sort by size
    const sorted = [...files].sort((a, b) => b.size - a.size);
    let total = sorted.reduce((sum, f) => sum + f.size, 0);

    // ✅ Progressive equalizing
    let k = 1;
    while (total > MAX_TOTAL && k < sorted.length) {
      const target = sorted[k].size;
      for (let i = 0; i < k; i++) {
        if (
          sorted[i].mimetype.startsWith("image/") &&
          sorted[i].size > target
        ) {
          const compressed = await compressToTarget(sorted[i].buffer, target);
          sorted[i].buffer = compressed;
          sorted[i].size = compressed.length;
        }
      }
      total = sorted.reduce((sum, f) => sum + f.size, 0);
      k++;
    }

    // ✅ Final proportional shrink if still > 10MB
    if (total > MAX_TOTAL) {
      const ratio = MAX_TOTAL / total;
      for (const file of sorted) {
        if (file.mimetype.startsWith("image/")) {
          const targetSize = Math.floor(file.size * ratio);
          const compressed = await compressToTarget(file.buffer, targetSize);
          file.buffer = compressed;
          file.size = compressed.length;
        }
      }
      total = sorted.reduce((sum, f) => sum + f.size, 0);
    }

    // ✅ Upload files to Cloudinary
    const uploadedUrls = await Promise.all(
      sorted.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const publicId = `${file.originalname.replace(/\.[^.]+$/, "")}-${Date.now()}`;
            cloudinary.uploader
              .upload_stream(
                {
                  folder: "projects",
                  resource_type:
                    file.mimetype === "application/pdf" ? "raw" : "image",
                  public_id: publicId,
                },
                (err, result) => {
                  if (err) {
                    console.error(
                      `❌ Upload failed for ${file.originalname}`,
                      err,
                    );
                    reject(
                      new Error(
                        `Upload failed for ${file.originalname}: ${err.message}`,
                      ),
                    );
                  } else {
                    resolve((result as any).secure_url);                    
                  }
                },
              )
              .end(file.buffer);
          }),
      ),
    );

    // ✅ Save project to DB
    const newProject = new Product({
      title,
      intro,
      category,
      images: uploadedUrls,
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: newProject,
    });
  } catch (err) {
    console.error("❌ Error in createProject:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: err,
    });
  }
};




// ─── UPDATE card ───────────────────────────────────────
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { title, category } = req.body;

    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { title, category },
      { new: true, upsert: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.json({
      message: "Card updated successfully",
      success: true,
      data: updated,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

// ─── DELETE card ───────────────────────────────────────
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleted = await Product.findOneAndDelete({ _id: new Object(id) });

    if (!deleted) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.json({
      message: "Card deleted successfully",
      success: true,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};
