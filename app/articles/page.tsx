'use client'

import ArticleList from '@/containers/article/ArticleList';
import useSWR from 'swr';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Article } from '@/types/Article';

const apiServer = 'http://localhost:8080';

// API 호출을 수행하는 fetcher 함수
const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function ArticlesPage() {
  // useSWR을 사용하여 API에서 데이터를 가져옵니다.
  const { data: articles, error } = useSWR<Article[]>(`${apiServer}/articles`, fetcher);

  if (error) return <div>데이터를 불러오는데 실패했습니다.</div>;
  if (!articles) return <div>로딩 중...</div>;

  return (
    <div className="max-w-xl mx-auto py-4">
      <ArticleList articles={articles}/>
    </div>
  )
}
