import { Request, Response } from "express";
import Card from "../models/detailsCard";

// GET all cards
export const getAllCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find();
    
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
export const getCardById = async (req: Request, res: Response) => {
  try {
    const card = await Card.findOne({ id: req.params.id });
    if (!card) return res.status(404).json({ error: "Card not found" });
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

// CREATE new card
export const createCard = async (req: Request, res: Response) => {
  try {
    const newCard = new Card(req.body);
    await newCard.save();
    res.status(201).json(newCard);
  } catch (err: unknown) {
    if (err instanceof Error) {
      // TS now knows err has `message`
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

// UPDATE card
export const updateCard = async (req: Request, res: Response) => {
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
export const deleteCard = async (req: Request, res: Response) => {
  try {
    const deleted = await Card.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: "Card not found" });
    res.json({ message: "Card deleted successfully" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      // TS now knows err has `message`
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};
