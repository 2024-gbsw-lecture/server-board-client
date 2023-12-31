// components/ArticleList.tsx

import { Article } from '@/types/Article';
import Link from 'next/link';

interface ArticleListProps {
  articles: Article[]
}

const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl pb-4">게시물 목록</h1>
      <div>
        {articles.map(article => (
          <div className="border rounded-md px-4 py-2" key={article.id}>
            <Link href={`/articles/${article.id}`}>
              <h2 className="text-lg mb-2">{article.title}</h2>
              <div>{article.author}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
