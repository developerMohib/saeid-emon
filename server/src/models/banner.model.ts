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
    badge: { type: String ,default: "Welcome to Saeid Emon's Portfolio"},
    titleLine: { type: String ,default: "Hi, I'm Saeid Emon"},
    highlight: { type: String ,default: "a Full Stack Developer"},
    subTitleLine: { type: String ,default: "I build exceptional digital experiences" },
    description: { type: String ,default: "I am a passionate full-stack developer with experience in creating modern web applications." },
  },
  { timestamps: true },
);

export const Banner = model<IBanner>("Banner", BannerSchema);
