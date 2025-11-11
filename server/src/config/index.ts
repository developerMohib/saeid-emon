import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const getEnv = (key: string, required = true): string | undefined => {
  const value = process.env[key];
  if (required && !value) {
    console.warn(`⚠️ Environment variable ${key} is missing!`);
  }
  return value;
};

interface Config {
  port: number | string;
  dbUri: string | undefined;
  salt: number | undefined;
  jwtSecret: string | undefined;
  JWT_EXPIRES_IN?: string | undefined;
}

export const config: Config = {
  port: process.env.PORT || 4000,
  dbUri: process.env.DB_URI as string,
  salt: process.env.SALTROUNDS ? parseInt(process.env.SALTROUNDS, 10) : 10,
  jwtSecret: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};

// ✅ Configure Cloudinary safely
cloudinary.config({
  cloud_name: getEnv("CLOUDINARY_CLOUD_NAME") || "",
  api_key: getEnv("CLOUDINARY_API_KEY") || "",
  api_secret: getEnv("CLOUDINARY_API_SECRET") || "",
});

// ✅ Optional: check required envs to avoid runtime crash
const requiredEnvs = [
  "DB_URI",
  "JWT_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];
requiredEnvs.forEach((env) => {
  if (!process.env[env]) {
    console.warn(
      `⚠️ Warning: ${env} is missing. Some features may not work properly.`,
    );
  }
});

export default cloudinary;
