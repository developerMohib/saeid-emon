import { Router } from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  updateProject,
} from "../controllers/projectsController";
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

router.get("/all", getAllProjects);
router.get("/single/:id", getProjectById);
router.post("/create", upload.array("images", 5), createProject);
router.put("/:id", updateProject);
router.delete("/delete/:id", deleteProject);

// auth related routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/me", getAdminUser);

export default router;
