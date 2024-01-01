'use client'

import { Button } from '@/components/ui/button';
import Article from '@/containers/article/Article';
import { customAxios, fetcher } from '@/utils/axios';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

export default function ArticlePage({ params }: { params: { id: number } }) {
  const { data: article, error } = useSWR<Article>(`/articles/${params.id}`, fetcher);
  const router = useRouter();

  if (error) return <div>데이터를 불러오는데 실패했습니다.</div>;
  if (!article) return <div>로딩 중...</div>;

  const handleDeleteButtonClicked = async () => {
    try {
      const response = await customAxios.delete(`/articles/${params.id}`);
      
      if (response.status === 200) {
        alert('게시물이 삭제되었습니다.');
        router.push('/articles');
      } else {
        alert('게시물 삭제 실패: ' + response.status);
      }
    } catch (error) {
      console.error('게시물 삭제 중 오류 발생', error);
      alert('게시물 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-3 border rounded-md px-4 py-4">
      <Article article={article}/>
      <div className="w-full border-b"></div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => router.push(`${params.id}/edit`)}>수정하기</Button>
        <Button variant="destructive" onClick={handleDeleteButtonClicked}>삭제하기</Button>
      </div>
    </div>
  )
}

