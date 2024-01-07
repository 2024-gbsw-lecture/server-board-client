// types/Article.ts

import { User } from "./User";

export interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  password?: string;
  user?: User;
  comments?: Comment[];
  createdAt: Date;
  updatedAt: Date;
}
  
export interface Comment {
  id: number;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}