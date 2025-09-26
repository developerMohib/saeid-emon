import { Schema, Document, model } from "mongoose";

export interface ICard extends Document {
  category?: string;
  name: string;
  image: string;
  description: {
    intro: string;
    whatIOffer: string[];
    whyChooseMe: string[];
    whatYouProvide: string[];
    extras: string[];
    closing: string;
  };
}

const CardSchema: Schema = new Schema(
  {
    category: { type: String },
    name: { type: String },
    image: { type: String },
    description: {
      intro: { type: String },
      whatIOffer: [{ type: String }],
      whyChooseMe: [{ type: String }],
      whatYouProvide: [{ type: String }],
      extras: [{ type: String }],
      closing: { type: String },
    },
  },
  { timestamps: true },
);

export default model<ICard>("Card", CardSchema);
