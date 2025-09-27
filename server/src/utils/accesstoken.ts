import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/express";

interface DecodedUser {
  id: string;
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as DecodedUser;
    (req).user = { id: decoded.id };
    console.log("decoded", decoded);

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token", err });
  }
};
