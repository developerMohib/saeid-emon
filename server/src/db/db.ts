import mongoose from "mongoose";
import { config } from "../config";

// const bannerdata = {
//   badge: "Available for Freelance",
//   titleLine: "Design That",
//   highlight: "Works Harder",
//   subTitleLine: "I build exceptional digital experiences",
//   description:
//     "I am a passionate full-stack developer with experience in creating modern web applications.",
// };

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

    // await Banner.deleteMany();
    // await Banner.insertMany(bannerdata);
    // console.log("Seeding completed ✅");

    console.log(`MongoDB Connected Successfully in : ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
