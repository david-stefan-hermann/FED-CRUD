export default interface PostInterface {
  id: number;
  title: string;
  author: string;
  updated: number;
  rating: number;
  category: string;
  image: string;
  desc: string;
  recipe: string;
}

export const newBlankPost: PostInterface = {
  id: 999,
  title: "",
  author: "",
  updated: Date.now(),
  rating: 0,
  category: "",
  image: "",
  desc: "",
  recipe: "",
}