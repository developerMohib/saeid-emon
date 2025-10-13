import multer from "multer";
import cloudinary from "../config";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    console.log('requ 8 uplaod', req)
    console.log('file 8 uplaod', file)
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

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
  fileFilter: (req, file, cb) => {
    
    console.log('requ 36 uplaod', req)
    console.log('file 37 uplaod', file)
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