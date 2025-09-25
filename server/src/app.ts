import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();

// ─── Middleware
app.use(express.json());

// ─── Health Check Route
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is healthy 🚀" });
});

// ─── Example Route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Saeid Emon Server is ready",
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
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
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
