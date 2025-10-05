// controllers/authController.ts
import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { User } from "../models/userModel";
import { config } from "../config";
import { createToken } from "../utils/accesstoken";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

// forget Password of user
export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    // checking if the user is exist
    const user = await User.isUserExistsByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const jwtPayload = {
      userEmail: user?.email as string,
    };

    const resetToken = createToken(
      jwtPayload,
      config.jwtSecret as string,
      "1d",
    );

    const resetUILink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Email পাঠানো
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Password Change Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <h3>Password Reset Request</h3>
        <p>Click the link below to reset your password (valid for 15 minutes):</p>
        <a href="${resetUILink}" target="_blank">${resetUILink}</a>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Reset link sent to your email.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { token, newPassword, email } = req.body as {
    token?: string;
    newPassword: string;
    email: string;
  };

  if (!token || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Token and new password are required",
    });
  }

  try {
    // Verify token and cast to JwtPayload
    const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

    if (email !== decoded?.userEmail) {
      return res.status(404).json({ message: "User not found!" });
    }

    //hash new password
    const newHashedPassword = await bcrypt.hash(
      newPassword,
      Number(config.salt),
    );

    await User.findOneAndUpdate(
      {
        email: decoded?.userEmail,
      },
      {
        password: newHashedPassword,
        passwordChangedAt: new Date(),
      },
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token",
      error,
    });
  }
};
