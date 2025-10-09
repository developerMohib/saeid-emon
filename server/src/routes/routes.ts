import { Router } from "express";

// ─── Controllers ──────────────────────────────────────────────
import {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  updateProject,
} from "../controllers/projectsController";

import {
  getAdminDetails,
  loginAdmin,
  logoutAdmin,
  tokenCheck,
  updateAvatar,
  updateBanner,
} from "../controllers/userController";

import { verifyAdminOtp } from "../controllers/verifyOtpController";
import { contactwithUser } from "../controllers/contactController";
import { resumes } from "../controllers/resumeController";
import { forgetPassword, resetPassword } from "../controllers/authController";
import {
  createBranding,
  deleteBranding,
  getBrands,
  updateBranding,
} from "../controllers/brandingController";

// ─── Utils ────────────────────────────────────────────────────
import { upload } from "../utils/multer";
// import { verifyToken } from "../utils/accesstoken";

// ─── Router Instance ─────────────────────────────────────────
const router = Router();

// ─── Contact & Resume ─────────────────────────────────────────
router.post("/contact", contactwithUser);
router.get("/resume", resumes);

// ─── Project Routes ───────────────────────────────────────────
router.get("/all", getAllProjects);
router.get("/single/:id", getProjectById);
router.post("/create", upload.array("images", 5), createProject);
router.put("/update/:id", updateProject);
router.delete("/delete/:id", deleteProject);

// ─── User Routes ──────────────────────────────────────────────
router.put("/user/banner", upload.single("banner"), updateBanner);
router.put("/user/avatar", upload.single("avatar"), updateAvatar);

// ─── Branding Routes ─────────────────────────────────────────
router.post("/brand", createBranding);
router.get("/brand", getBrands);
router.put("/brand/:id", updateBranding);
router.delete("/brand/:id", deleteBranding);

// ─── Auth Routes ─────────────────────────────────────────────
router.post("/login", loginAdmin);
router.post("/verify-otp", verifyAdminOtp);
router.get('/check',tokenCheck)
router.post("/logout", logoutAdmin);
router.get("/me", getAdminDetails);

// ─── Password Recovery Routes ────────────────────────────────
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

export default router;
