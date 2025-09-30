/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import express, { Application, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/routes";
const app: Application = express();

// ─── Middleware
app.use(express.json());
// Middleware
// app.use(
//   cors({
//     // origin: process.env.FRONTEND_URL || "http://localhost:3000",
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//     credentials: true, // Allow cookies to be sent
//   }),
// );
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
      "https://saeid-hasan-emon.vercel.app",
      "https://saeid-hasan-emon-git-master-mohib-the-maziests-projects.vercel.app",
      "https://saeid-hasan-emon-celr40ub3-mohib-the-maziests-projects.vercel.app"
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// ─── API Route
app.use("/api", router);
app.use("/api/cards", router);
app.use("/products", router);
app.use("/auth", router);

// ─── Health Check Route
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is healthy 🚀" });
});

// ─── Example Route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Saeid Emon Server is ready 🚀",
  });
});

// ─── Not Found Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ─── Centralized Error Handler
app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);

  // Handle known errors
  if (err instanceof Error) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }

  // Handle unknown errors (edge cases)
  res.status(500).json({
    success: false,
    message: "An unexpected error occurred",
  });
});

export default app;
