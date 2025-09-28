import { Router } from "express";
import {
  addProduct,
  createCard,
  deleteCard,
  getAllCards,
  getCardById,
  updateCard,
} from "../controllers/cardController";
import { sendOtp } from "../controllers/sendEmailController";
import { verifyOtp } from "../controllers/verifyOtp";
import { getAdminUser } from "../controllers/userController";
// import { verifyToken } from "../utils/accesstoken";
import { upload } from "../utils/multer";

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

// auth related routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/me", getAdminUser);

router.post("/create", upload.array("images", 5), addProduct);


export default router;
