import multer from "multer";
import cloudinary from "../config";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    
    const nameWithoutExt = file.originalname.replace(/\.[^.]+$/, "");
    const sanitizedName = nameWithoutExt.replace(/\s+/g, "-"); // Replace spaces with hyphens
    // Original file extension
    const ext = file.mimetype.split("/")[1]; 
    return {
      folder: "projects",
      format: ext,
      public_id: `${sanitizedName}-${Date.now()}`,
    };
  },
});

// ─── Allowed file types ─────────────────────────────
const allowedMimeTypes = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "application/pdf",
];



// Create Multer instance with Cloudinary storage
// export const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 },
// }); // 15 MB limit

export const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB per file
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only .png, .jpg, .jpeg, .gif, and .pdf files are allowed!"
        )
      );
    }
  },
});