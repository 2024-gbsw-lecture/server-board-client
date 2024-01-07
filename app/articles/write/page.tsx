'use client'

import React from 'react';
import { customAxios } from '@/utils/axios';
import { useRouter } from 'next/navigation';
import ArticleEditor, { ArticleEditorOnSubmitProps } from '@/containers/article/ArticleEditor';
import useToken from '@/hooks/useToken';

const CreateArticle: React.FC = () => {
  const router = useRouter();
  const { token } = useToken();

  const handleSubmit = async (data: ArticleEditorOnSubmitProps) => {
    try {
      const response = await customAxios.post('/articles', data, {
        headers: !!token ? {
          'Authorization': `Bearer ${token}`
        } : {}
      });
      
      alert('게시물이 생성되었습니다.');
      router.push('/articles')
    } catch (error) {
      console.error('게시물 생성 중 오류 발생', error);
      alert('게시물 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl">새 게시물 작성</h1>
      <ArticleEditor
        isAnonymous={!token}
        onSubmit={handleSubmit}/>
    </div>
  );
};

export default CreateArticle;
