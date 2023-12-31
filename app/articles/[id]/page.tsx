'use client'

import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from "lucide-react"
import Article from '@/containers/article/Article';
import CommentEditor, { CommentEditorOnSubmitProps } from '@/containers/article/CommentEditor';
import CommentList from '@/containers/article/CommentList';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { customAxios, fetcher } from '@/utils/axios';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { sha512 } from '../../../utils/sha512';
import { Comment } from '@/types/Article';
import useToken from '@/hooks/useToken';

export default function ArticlePage({ params }: { params: { id: number } }) {
  const { data: article, error } = useSWR<Article>(`/articles/${params.id}`, fetcher);
  const { data: comments, error: commentsFetchError, mutate: mutateComments } = useSWR<Comment[]>(`/articles/${params.id}/comments`, fetcher);
  const router = useRouter();
  const [enablePassword] = useLocalStorage('enable_password', false);
  const [enableComment] = useLocalStorage('enable_comment', false);
  const {token, subject} = useToken();
  const isAnonymous = !(article?.user);

  if (error) return <div>데이터를 불러오는데 실패했습니다.</div>;
  if (!article) return <div>로딩 중...</div>;

  const handleDeleteButtonClicked = async () => {
    try {
      if (!isAnonymous && !!token && subject != article.user?.id) {
        alert('본인의 글만 삭제 가능합니다.');
        return;
      }

      const body = { password: '' }
      if (enablePassword && isAnonymous) {
        body['password'] = sha512(prompt('비밀번호를 입력하세요.') ?? "")
      }

      const response = await customAxios.delete(`/articles/${params.id}`, {
        data: enablePassword && isAnonymous ? body : undefined,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      alert('게시물이 삭제되었습니다.');
      router.push('/articles');
    } catch (error) {
      console.error('게시물 삭제 중 오류 발생', error);
      alert('게시물 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleCommentCreateButtonClicked = async (props: CommentEditorOnSubmitProps) => {
    try {
      const response = await customAxios.post<Comment>(`/articles/${params.id}/comments`, props);
      
      mutateComments([...(comments ?? []), response.data])
    } catch (error) {
      console.error('댓글 등록 중 오류 발생', error);
      alert('댓글 등록 중 오류가 발생했습니다.');
    }
  }

  const handleCommentModify = async (id: number, props: CommentEditorOnSubmitProps) => {
    try {
      const response = await customAxios.put<Comment>(`/articles/comments/${id}`, props);
      mutateComments();
    } catch (error) {
      console.error('댓글 수정 중 오류 발생', error);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  }

  const handleCommentDelete = async (id: number, password: string) => {
    try {
      const response = await customAxios.delete<Comment>(`/articles/comments/${id}`, {
        data: { password }
      });
      
      mutateComments();
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  }

  return (
    <div className="flex flex-col gap-3 border rounded-md px-4 py-4">
      <Article article={article}/>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={() => router.push(`${params.id}/edit`)}><Pencil/></Button>
        <Button variant="destructive" size="icon" onClick={handleDeleteButtonClicked}><Trash2/></Button>
      </div>
      <div className={`flex flex-col gap-3 ${enableComment ? "" : "hidden"}`}>
        <div className="w-full border-b"></div>
        <div></div>
        <div>
          <CommentList
            comments={comments ?? []}
            onModify={handleCommentModify}
            onDelete={handleCommentDelete}
            />
        </div>
        <div className="w-full border-b"></div>
        <div>
          <CommentEditor onSubmit={handleCommentCreateButtonClicked}/>
        </div>        
      </div>
    </div>
  )
}

