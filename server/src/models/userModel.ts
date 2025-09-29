import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";


export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
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
    freelancer?: string;
    fiverr?: string;
  };
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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
      freelancer: { type: String },
      fiverr: { type: String },
    },
  },
  { timestamps: true }
);

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});


export const User = model<IUser>("User", UserSchema);
