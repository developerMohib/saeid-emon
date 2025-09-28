import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  intro: string;
  category: string;
  images: string[];
}

const ProductSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  intro: { type: String, required: true },
  category: { type: String, required: true },
  images: [{ type: String, required: true }],
});

export const Product = model<IProduct>("Product", ProductSchema);
