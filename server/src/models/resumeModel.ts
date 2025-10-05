import { Schema, model, Document } from "mongoose";

interface IResume extends Document {
  about: string;
  workExperience: {
    company: string;
    role: string;
    period: string;
    link: string;
    position: string;
    website: string;
    description: string;
    duration: string;
    location: string;
  }[];
  education: {
    school: string;
    link: string;
    degree: string;
    institution: string;
    period: string;
    website: string;
    description: string;
    duration: string;
    location: string;
  }[];
  languages: {
    language: string;
    level: string;
  }[];
  skills: string[];
}

const resumeSchema = new Schema<IResume>({
  about: { type: String, required: true },
  workExperience: [
    {
      company: String,
      position: String,
      role: String,
      period: String,
      link: String,
      website: String,
      description: String,
      duration: String,
      location: String,
    },
  ],
  education: [
    {
      school: String,
      degree: String,
      institution: String,
      link: String,
      period: String,
      website: String,
      description: String,
      duration: String,
      location: String,
    },
  ],
  languages: [
    {
      language: String,
      level: String,
    },
  ],
  skills: [String],
});

export const Resume = model<IResume>("Resume", resumeSchema);
