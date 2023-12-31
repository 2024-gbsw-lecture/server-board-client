// article.tsx

import React from 'react';
import { Article } from '@/types/Article';

interface ArticleProps {
  article: Article;
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <p>작성자: {article.author}</p>
      <p>작성일: {new Date(article.createdAt).toLocaleDateString()}</p>
      <p>수정일: {new Date(article.updatedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default Article;
