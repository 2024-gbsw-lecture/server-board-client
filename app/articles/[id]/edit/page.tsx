'use client'

import React, { useState } from 'react';
import { customAxios, fetcher } from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import ArticleEditor, { ArticleEditorOnSubmitProps } from '@/containers/article/ArticleEditor';
import useSWR from 'swr';
import { Article } from '@/types/Article';

const EditArticle = ({ params }: { params: { id: number } }) => {
  const { data: article, error } = useSWR<Article>(`/articles/${params.id}`, fetcher);
  const router = useRouter();

  if (error) return <div>데이터를 불러오는데 실패했습니다.</div>;
  if (!article) return <div>로딩 중...</div>;

  const handleSubmit = async (data: ArticleEditorOnSubmitProps) => {
    try {
      const response = await customAxios.put(`/articles/${params.id}`, data);
      
      if (response.status === 200) {
        alert('게시물이 수정되었습니다.');
        router.push(`/articles/${params.id}`);
      } else {
        alert('게시물 수정 실패: ' + response.status);
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
        submitButtonText='게시물 수정'
        onSubmit={handleSubmit}/>
    </div>
  );
};

export default EditArticle;
