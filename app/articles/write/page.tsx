'use client'

import React, { useState } from 'react';
import { customAxios } from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import ArticleEditor, { ArticleEditorOnSubmitProps } from '@/containers/article/ArticleEditor';

const CreateArticle: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (data: ArticleEditorOnSubmitProps) => {
    try {
      const response = await customAxios.post('/articles', data);
      
      if (response.status === 200) {
        alert('게시물이 생성되었습니다.');
        router.push('/articles')
      } else {
        alert('게시물 생성 실패: ' + response.status);
      }
    } catch (error) {
      console.error('게시물 생성 중 오류 발생', error);
      alert('게시물 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl">새 게시물 작성</h1>
      <ArticleEditor onSubmit={handleSubmit}/>
    </div>
  );
};

export default CreateArticle;
