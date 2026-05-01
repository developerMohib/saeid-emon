import { Schema, model, Document } from "mongoose";

export interface IAuthor extends Document {
  badge?: string;
  titleLine?: string;
  highlight?: string;
  subTitleLine?: string;
  description?: string;
}

const AuthorSchema = new Schema<IAuthor>(
  {
    badge: { type: String },
    titleLine: { type: String },
    highlight: { type: String },
    subTitleLine: { type: String },
    description: { type: String },
  },
  { timestamps: true },
);

export const Author = model<IAuthor>("Author", AuthorSchema);
