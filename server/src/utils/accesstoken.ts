import { Response, NextFunction } from "express";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { AuthRequest } from "../types/express";


interface DecodedUser {
  id: string;
}

export interface TJwtPayload {
    userEmail: string;
}


export const createToken = (
    jwtPayload: TJwtPayload,
    secret: Secret,
    expiresIn: string | number
) => {
    const options: SignOptions = { expiresIn: expiresIn as SignOptions['expiresIn'] };

    return jwt.sign(jwtPayload, secret, options);
};

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

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as DecodedUser;
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    return res.status(403).json({  message: "Token expired or invalid", err });
  }
};
