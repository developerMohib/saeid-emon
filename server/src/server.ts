import app from "./app";
import { config } from "./config";
import connectDB from "./db/db";

async function main() {
  try {
    // await mongoose.connect(config.databaseUrl as string);
    await connectDB();

    app.listen(config.port, () => {
      console.log(`server of Saeid Emon is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

// Handle uncaught exceptions and unhandled rejections
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Rejection:", reason);
});

main();
