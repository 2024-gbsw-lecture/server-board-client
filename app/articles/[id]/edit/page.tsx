'use client'

import React, { useEffect } from 'react';
import { customAxios, fetcher } from '@/utils/axios';
import { useRouter } from 'next/navigation';
import ArticleEditor, { ArticleEditorOnSubmitProps } from '@/containers/article/ArticleEditor';
import useSWR from 'swr';
import { Article } from '@/types/Article';
import useToken from '@/hooks/useToken';

const EditArticle = ({ params }: { params: { id: number } }) => {
  const { isLoading: isArticleLoading, data: article, error } = useSWR<Article>(`/articles/${params.id}`, fetcher);
  const router = useRouter();
  const { token, subject } = useToken();

  useEffect(() => {
    if (!isArticleLoading && !error && article?.user?.id != subject) {
      alert('본인의 글또는 익명글만 수정가능합니다.');
      router.back();
    }
  }, []);

  if (error) return <div>데이터를 불러오는데 실패했습니다.</div>;
  if (!article) return <div>로딩 중...</div>;

  const handleSubmit = async (data: ArticleEditorOnSubmitProps) => {
    try {
      const response = await customAxios.put(`/articles/${params.id}`, data, {
        headers: !!token ? {
          'Authorization': `Bearer ${token}`
        } : {}
      });
      
      if (response.status === 200) {
        alert('게시물이 수정되었습니다.');
        router.push(`/articles/${params.id}`);
      } else {
        alert('게시물 수정 실패: '+ (response.data.message ?? response.status));
      }
    } catch (error) {
      console.error('게시물 수정 중 오류 발생', error);
      alert('게시물 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl">게시물 수정</h1>
      <ArticleEditor
        title={article.title}
        content={article.content}
        author={article.author}
        isAnonymous={!!article.author}
        submitButtonText='게시물 수정'
        onSubmit={handleSubmit}/>
    </div>
  );
};

export default EditArticle;
