
export interface ICard extends Document {
  _id : string,
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