export default interface PostInterface {
  id: number;
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
  id: 999,
  title: "",
  author: "",
  updated: "",
  rating: 0,
  category: "",
  image: "",
  short: "",
  recipe: "",
}