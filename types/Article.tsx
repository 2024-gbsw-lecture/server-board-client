// types/Article.ts

export interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  password?: string;
  comments?: Comment[];
  createdAt: string;
  updatedAt: string;
}
  
export interface Comment {
  id: number;
  content: string;
  author: string;
  createdAt: string;
}