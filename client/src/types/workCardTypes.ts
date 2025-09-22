export type ICard = {
  id: number;
  category: string;
  name: string;
  price: string;
  image: string;
  description: {
    intro: string;
    whatIOffer: string[];
    whyChooseMe: string[];
    whatYouProvide: string[];
    extras: string[];
    closing: string;
  };
};