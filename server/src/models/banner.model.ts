import { Schema, model, Document } from "mongoose";

export interface IBanner extends Document {
  badge?: string;
  titleLine?: string;
  highlight?: string;
  subTitleLine?: string;
  description?: string;
}

const BannerSchema = new Schema<IBanner>(
  {
    badge: { type: String },
    titleLine: { type: String },
    highlight: { type: String },
    subTitleLine: { type: String },
    description: { type: String },
  },
  { timestamps: true },
);

export const Banner = model<IBanner>("Banner", BannerSchema);
