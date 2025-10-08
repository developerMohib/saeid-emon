import { Schema, model, Document } from "mongoose";

export interface IBranding extends Document {
  name: string;
  img: string;
  link: string;
}

const brandingSchema = new Schema<IBranding>(
  {
    name: { type: String, required: true, trim: true },
    img: { type: String, required: true },
    link: { type: String, default: "/" },
  },
  { timestamps: true }
);

export const Branding = model<IBranding>("Branding", brandingSchema);
