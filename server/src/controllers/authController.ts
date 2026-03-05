// controllers/authController.ts
import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { User } from "../models/userModel";
import { config } from "../config";
import { createToken } from "../utils/accesstoken";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

// ─── Forget Password ─────────────────────────────────────────
export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    // Validation
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is required" 
      });
    }

    // Check if user exists
    const user = await User.isUserExistsByEmail(email);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found!" 
      });
    }

    // Create JWT token for reset link
    const jwtPayload = { userEmail: user.email as string };

    if (!config.jwtSecret) {
      throw new Error("JWT secret is not configured");
    }

    const resetToken = createToken(jwtPayload, config.jwtSecret, "1d");

    const resetUILink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Check email configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials not configured");
    }

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    // Email options
    const mailOptions = {
      from: `"Password Change Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>You requested to reset your password for your Saeid Emon Portfolio account.</p>
          <p>Click the link below to reset your password (valid for 1 hour):</p>
          <a href="${resetUILink}" 
             style="display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; margin: 16px 0;">
            Reset Your Password
          </a>
          <p>If the button doesn't work, copy and paste this link in your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetUILink}</p>
          <p><small>If you didn't request this password reset, please ignore this email.</small></p>
          <hr style="margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">This is an automated message from Saeid Emon Portfolio.</p>
        </div>
      `,
    };

    // Send email
    const emailResult = await transporter.sendMail(mailOptions);

    // Response
    return res.status(200).json({
      success: true,
      message: "Reset link sent to your email.",
    });

  } catch (error) {
    console.error("Forget password error details:", error);
    
    // More specific error messages
    let errorMessage = "Something went wrong, please check email configuration.";
    
    if (error instanceof Error) {
      if (error.message.includes("Invalid login")) {
        errorMessage = "Email configuration error: Invalid credentials";
      } else if (error.message.includes("ECONNREFUSED")) {
        errorMessage = "Email service connection failed";
      } else {
        errorMessage = error.message;
      }
    }

    return res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};



// ─── Reset Password ──────────────────────────────────────────
export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
  const { token, newPassword, email } = req.body as {
    token?: string;
    newPassword: string;
    email: string;
  };

  // Validation
  if (!token || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Token and new password are required",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

    // Check email match
    if (email !== decoded?.userEmail) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Hash new password
    const newHashedPassword = await bcrypt.hash(newPassword, Number(config.salt));

    // Update user password in DB
    await User.findOneAndUpdate(
      { email: decoded?.userEmail },
      { password: newHashedPassword, passwordChangedAt: new Date() }
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
