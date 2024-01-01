// article.tsx

import React from 'react';
import { Article } from '@/types/Article';
import dayjs from 'dayjs';

interface ArticleProps {
  article: Article;
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <p>{article.author}</p>
        <h1 className="text-2xl">{article.title}</h1>
        <p>
          {dayjs(article.createdAt).format("YYYY년 MM월 DD일")}
          { article.createdAt != article.updatedAt ? `(${dayjs(article.updatedAt).format("YYYY년 MM월 DD일에 수정됨.")})` : "" }
        </p>
      </div>
      <div className="w-full border-b"></div>
      <div className="flex flex-col gap-2">
        <p>{article.content}</p>
      </div>
   </div>
  );
};

export default Article;
