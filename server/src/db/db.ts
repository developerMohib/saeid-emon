import mongoose from "mongoose";
import { config } from "../config";

const connectDB = async (): Promise<void> => {
  if (!config.dbUri) {
    console.error(
      "MongoDB URI is missing in environment variables. Skipping connection.",
    );
    return;
  }
  try {
    // const conn = await mongoose.connect(config.dbUri as string);
    const conn = await mongoose.connect(config.dbUri);
    console.log(`MongoDB Connected Successfully in : ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
