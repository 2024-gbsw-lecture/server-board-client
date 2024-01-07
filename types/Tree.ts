// types/Article.ts

import { Article } from "./Article";
import { User } from "./User";

export interface Tree {
  id: number;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}