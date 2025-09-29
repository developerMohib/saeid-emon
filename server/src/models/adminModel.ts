import { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IAdmin extends Document {
  email: string;
  password: string;
  otp?: string;
  expiretime?: Date;
}

const AdminSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String },
    expiretime: { type: Date },
  },
  { timestamps: true },
);
//  Hash password before saving
AdminSchema.pre<IAdmin>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

export const Admin = model<IAdmin>("Admin", AdminSchema);
