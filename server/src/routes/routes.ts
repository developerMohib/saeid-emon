import { Router } from "express";
import {
  createCard,
  deleteCard,
  getAllCards,
  getCardById,
  updateCard,
} from "../controllers/cardController";

const router = Router();

// Example route
router.get("/", (req, res) => {
  res.send("API is running");
});

router.get("/all", getAllCards);
router.get("/single/:id", getCardById);
router.post("/", createCard);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);
// Add more routes here
export default router;
