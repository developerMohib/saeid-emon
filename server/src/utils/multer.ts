import multer from "multer";
import cloudinary from "../config";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const nameWithoutExt = file.originalname.replace(/\.[^.]+$/, "");
    const sanitizedName = nameWithoutExt.replace(/\s+/g, "-"); // or .replace(/\s+/g, "") to remove spaces completely
    return {
      folder: "projects",
      format: "png",
      public_id: `${sanitizedName}-${Date.now()}`,
    };
  },
});

// Create Multer instance with Cloudinary storage
export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}); // 5MB limit
