'use client'

import ArticleList from '@/containers/article/ArticleList';
import useSWR from 'swr';
import { Article } from '@/types/Article';
import { customAxios, fetcher } from '@/utils/axios';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


export default function ArticlesPage() {
  // useSWR을 사용하여 API에서 데이터를 가져옵니다.
  const { data: articles, error } = useSWR<Article[]>(`/articles`, fetcher);

  if (error) return <div>데이터를 불러오는데 실패했습니다.</div>;
  if (!articles) return <div>로딩 중...</div>;

  return (
    <div className="flex flex-col max-w-xl mx-auto py-4 gap-5">
      <div className="flex">
        <h1 className="text-2xl">게시물 목록</h1>
        <div className="flex-1"></div>
        <Link href="/articles/write">
          <Button>게시물 등록</Button>
        </Link>
      </div>
      <ArticleList articles={articles}/>
    </div>
  )
}
