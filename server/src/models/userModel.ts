import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  role: "admin";
  bio?: string;
  currentPosition?: string;
  experience?: string;
  location?: string;
  avatar?: string;
  description?: string;
  social?: {
    fb?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["admin", ]},
    bio: { type: String },
    currentPosition: { type: String },
    experience: { type: String },
    location: { type: String },
    avatar: { type: String },
    description: { type: String },
    social: {
      fb: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
      instagram: { type: String },
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
