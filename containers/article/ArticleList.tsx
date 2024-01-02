// components/ArticleList.tsx

import { Article } from '@/types/Article';
import dayjs from 'dayjs';
import Link from 'next/link';

interface ArticleListProps {
  articles: Article[]
}

const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <div className="flex flex-col gap-3">
      {articles.map(article => (
        <div className="border rounded-md px-4 py-2" key={article.id}>
          <Link href={`/articles/${article.id}`}>
            <h2 className="text-lg mb-1">{article.title}</h2>
            <div className="text-sm">{article.author} · {dayjs(article.createdAt).format("YYYY년 MM월 DD일")}</div>
          </Link>
        </div>
      ))}
      {articles.length == 0 ? "게시물이 없습니다." : ""}
    </div>
  );
};

export default ArticleList;
