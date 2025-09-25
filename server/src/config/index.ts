import dotenv from "dotenv";

dotenv.config();
interface Config {
  port: number | string;
  dbUri: string | undefined;
  salt  : number | undefined
  jwtSecret: string | undefined;
  JWT_EXPIRES_IN?: string | undefined;
}

export const config: Config = {
  port: process.env.PORT || 4000,
  dbUri: process.env.DB_URI as string,
  salt: process.env.SALTROUNDS ? parseInt(process.env.SALTROUNDS, 10) : 14,
  jwtSecret: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "30d",
};
