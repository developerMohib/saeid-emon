import { Request, Response } from "express";
import { Product } from "../models/product";

// ─── GET all cards ──────────────────────────────────────

export const myProjects = async (req: Request, res: Response) => {
  try {
    const cards = await Product.find()
      .select('title images category createdAt')
      .sort({ createdAt: -1 })
      .limit(100) // Prevent overload
      .lean();

    res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      data: cards,
      count: cards.length,
      timestamp: new Date().toISOString()
    });

  } catch (err: unknown) {
    console.error('Error fetching projects:', err);
    
    res.status(500).json({ 
      success: false,
      message: "Failed to retrieve projects",
      error: "Internal error happened"
    });
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 9));
    const skip = (page - 1) * limit;

    const cards = await Product.find()
      .select('title images category createdAt') 
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(); // Convert to plain objects for better performance

    const total = await Product.countDocuments();
    const hasMore = total > page * limit;

    res.json({
      success: true,
      message: "Data Retrieved Successfully",
      data: cards,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasMore,
        limit
      }
    });
  } catch (err: unknown) {
    console.error('Error fetching projects:', err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
    
    res.status(500).json({ 
      success: false,
      error: errorMessage 
    });
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
export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, intro, category, images } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Images array is required and cannot be empty",
      });
    }

    const invalidImages = images.filter(
      (url) => !url || typeof url !== "string" || !url.startsWith("http"),
    );

    if (invalidImages.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid image URLs provided",
      });
    }

    // ✅ Create and save project
    const newProject = new Product({
      title: title.trim(),
      intro: intro.trim(),
      category: category.trim(),
      images: images,
    });

    await newProject.save();

    res.status(201).json({
      message: "Product created successfully",
      data: newProject,
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal error occured" });
  }
};

// ─── UPDATE card ───────────────────────────────────────
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { title, category } = req.body;

    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { title, category },
      { new: true, upsert: true },
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
