// import app from "./app";
// import { config } from "./config";
// import connectDB from "./db/db";
// import { keepAliveCronJob } from "./utils/cron";

// async function main() {
//   try {
//     // await mongoose.connect(config.databaseUrl as string);
//     await connectDB();

//     app.listen(config.port, () => {
//       console.log(`server of Saeid Emon is listening on port ${config.port}`);
//       if (process.env.NODE_ENV === "production") {
//     keepAliveCronJob.start();
//   }
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

// // Handle uncaught exceptions and unhandled rejections
// process.on("uncaughtException", (err) => {
//   console.error("❌ Uncaught Exception:", err);
// });

// process.on("unhandledRejection", (reason) => {
//   console.error("❌ Unhandled Rejection:", reason);
// });

// main();



import app from "./app";
import { config } from "./config";
import connectDB from "./db/db";
import { keepAliveCronJob } from "./utils/cron";

async function main() {
  try {
    // Connect database first
    await connectDB();

    const server = app.listen(config.port, () => {
      console.log(
        `🚀 Server is listening on port ${config.port}`
      );

      // Start cron job only in production
      if (process.env.NODE_ENV === "production") {
        keepAliveCronJob.start();
      }
    });

    // Handle unhandled promise rejection
    process.on("unhandledRejection", (reason) => {
      console.error("❌ Unhandled Rejection:", reason);

      server.close(() => {
        process.exit(1);
      });
    });

    // Handle uncaught exceptions
    process.on("uncaughtException", (err) => {
      console.error("❌ Uncaught Exception:", err);

      process.exit(1);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

main();