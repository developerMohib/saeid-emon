import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  role: "admin";
  bio?: string;
  proffession?: string;
  currentPosition?: string;
  experience?: string;
  location?: string;
  avatar?: string;
  description?: string;
  banner?: string;
  social?: {
    facebook?: string;
    freelancer?: string;
    fiverr?: string;
    instagram?: string;
  };
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["admin"], default: "admin" },
    bio: { type: String },
    proffession: { type: String },
    currentPosition: { type: String },
    experience: { type: String },
    location: { type: String },
    avatar: { type: String },
    banner: { type: String },
    description: { type: String },
    social: {
      facebook: { type: String },
      freelancer: { type: String },
      fiverr: { type: String },
      instagram: { type: String },
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
