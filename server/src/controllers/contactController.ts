import { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ─── Contact with User ─────────────────────────────────────
export const contactwithUser = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    // Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ─── 1. Send message to ADMIN ─────────────────────────
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      text: `Email: ${email}\n\nMessage:\n${message}`,
    });

    // ─── 2. Auto-reply to USER ───────────────────────────
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for contacting me!",
      text: `Hi ${name},\n\nThanks for reaching out! We've received your message and will get back to you shortly.\n\nBest regards,\nSaeid Emon`,
    });

    // ─── Response ─────────────────────────────────────────
    res.status(200).json({ message: "Message sent successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
};
