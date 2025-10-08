import { Router } from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  updateProject,
} from "../controllers/projectsController";
import { verifyAdminOtp } from "../controllers/verifyOtpController";
import {
  getAdminDetails,
  loginAdmin,
  logoutAdmin,
  updateAvatar,
  updateBanner,
} from "../controllers/userController";
// import { verifyToken } from "../utils/accesstoken";
import { upload } from "../utils/multer";
import { contactwithUser } from "../controllers/contactController";
import { resumes } from "../controllers/resumeController";
import { forgetPassword, resetPassword } from "../controllers/authController";
import { createBranding, deleteBranding, getBrands, updateBranding } from "../controllers/brandingController";

const router = Router();

router.post("/contact", contactwithUser);
router.get("/all", getAllProjects);
router.get("/single/:id", getProjectById);
router.get("/resume", resumes);
router.post("/create", upload.array("images", 5), createProject);
router.put("/update/:id", updateProject); // not completed yet
router.delete("/delete/:id", deleteProject);
router.put("/user/banner", upload.single("banner"), updateBanner);
router.put("/user/avatar", upload.single("avatar"), updateAvatar);


router.post("/brand", createBranding);     // Create
router.get("/brand", getBrands);       // Read all
router.put("/brand/:id", updateBranding);   // Update
router.delete("/brand/:id", deleteBranding); // Delete
// auth related routes
router.post("/verify-otp", verifyAdminOtp);
router.get("/me", getAdminDetails);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);


router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

export default router;