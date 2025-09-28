import { Request, Response } from "express";
import Card from "../models/detailsCard";
import { Product } from "../models/product";

// GET all cards
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const cards = await Product.find();
    res.json({
      success: true,
      message: "All Data Retrived Successfully",
      data: cards,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      // TS now knows err has `message`
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

// GET single card by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card)
      return res.status(404).json({ error: "Card not found from server" });
    res.json(card);
  } catch (err: unknown) {
    if (err instanceof Error) {
      // TS now knows err has `message`
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

// CREATE new project
export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, intro, category } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "Images are required" });
    }
    const uploadedImages = files.map((file) => file.path);

    // Save to DB with Cloudinary URL
    const newProduct = await Product.create({
      title,
      intro,
      category,
      images: uploadedImages,
    });

    res.status(201).json({
      message: "Product created successfully",
      data: newProduct,
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE card
export const updateProject = async (req: Request, res: Response) => {
  try {
    const updated = await Card.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true },
    );
    if (!updated) return res.status(404).json({ error: "Card not found" });
    res.json(updated);
  } catch (err: unknown) {
    if (err instanceof Error) {
      // TS now knows err has `message`
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

// DELETE card
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleted = await Card.findOneAndDelete({ _id: new Object(id) });
    if (!deleted) return res.status(404).json({ error: "Card not found" });
    res.json({ message: "Card deleted successfully", success: true });
  } catch (err: unknown) {
    if (err instanceof Error) {
      // TS now knows err has `message`
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};
