/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import express, { Application, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/routes";

const app: Application = express();

// ─── Middleware Order ────────────────────────────────

// 1️⃣ Cookie & Body Parsers
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 2️⃣ CORS (must come before routes)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
      "https://www.app.saeidemon.com",
      "https://www.saeidemon.com",
      "https://saeid-emon.vercel.app",
      "https://client-mohib-the-maziests-projects.vercel.app",
    ],
    credentials: true,
  })
);

// 3️⃣ Express built-in parsers (redundant but safe)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ──────────────────────────────────────────
app.use("/api", router);
app.use("/api/cards", router);
app.use("/products", router);
app.use("/auth", router);

// ─── Health Check ────────────────────────────────────
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is healthy 🚀" });
});

// ─── Root Route ──────────────────────────────────────
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Saeid Emon Server is ready 🚀",
  });
});

// ─── 404 Handler ─────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ─── Global Error Handler ────────────────────────────
app.use(
  (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error("❌ Error:", err);

    // Catch all Error objects
    if (err instanceof Error) {
      return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
      });
    }

    // Fallback for unknown errors
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
    });
  }
);

export default app;
