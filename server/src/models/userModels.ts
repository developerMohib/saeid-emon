import { Schema, model, Document } from "mongoose";

interface IResume extends Document {
  name: string;
  profession: string;
  location: string;
  about: string;
  workExperience: {
    company: string;
    position: string;
    website: string;
    description: string;
    duration: string;
    location: string;
  }[];
  education: {
    school: string;
    degree: string;
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
  name: { type: String, required: true },
  profession: { type: String, required: true },
  location: { type: String, required: true },
  about: { type: String, required: true },
  workExperience: [
    {
      company: String,
      position: String,
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
