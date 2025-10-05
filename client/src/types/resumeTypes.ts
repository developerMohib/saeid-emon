export interface IResume {
  name: string;
  profession: string;
  location: string;
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
