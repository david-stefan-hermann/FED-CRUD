export default interface PostInterface {
  _id: string;
  title: string;
  author: string;
  updated: string;
  rating: number;
  category: string;
  image: string;
  short: string;
  recipe: string;
}

export const newBlankPost: PostInterface = {
  _id: "",
  title: "",
  author: "",
  updated: "",
  rating: 0,
  category: "",
  image: "",
  short: "",
  recipe: "",
}