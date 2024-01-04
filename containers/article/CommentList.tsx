// components/CommentList.tsx

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Comment } from '@/types/Article';
import dayjs from 'dayjs';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CommentEditor, { CommentEditorOnSubmitProps } from './CommentEditor';
import { sha512 } from '@/utils/sha512';

interface CommentListProps {
  comments: Comment[];
  onModify: (id: number, data: CommentEditorOnSubmitProps) => void,
  onDelete: (id: number, password: string) => void 
}

const CommentList = ({ comments, onModify, onDelete }: CommentListProps) => {
  const [editMode, setEditMode] = useState<number|undefined>();

  return (
	<div className="flex flex-col gap-3">
	  {comments.map(comment => (
      <div className={`flex gap-2 border rounded-md ${editMode == comment.id ? 'px-2' : 'px-4'} py-2 items-end`} key={comment.id}>
        <div className={`flex-1 ${editMode == comment.id ? 'hidden': ''}`}>
          <div className="mb-1">
            {comment.content}
          </div>
          <div className="text-sm">{comment.author} · {dayjs(comment.createdAt).format("YYYY년 MM월 DD일")}</div>
        </div>
        <div className={`flex-1 ${editMode != comment.id ? 'hidden': ''}`}>
          <CommentEditor content={comment.content} author={comment.author} submitButtonText="수정" onSubmit={(data) => {
            onModify(comment.id, data)
          }}/>
        </div>
        <div className={`flex gap-2 ${editMode == comment.id ? 'hidden': ''}`}>
          <u className="text-gray-700 text-sm text-g cursor-pointer" onClick={() => {
            setEditMode(comment.id)
          }}>수정</u>
          <u className="text-gray-700 text-sm text-g cursor-pointer" onClick={() => {
            onDelete(comment.id, sha512(prompt('비밀번호를 입력하세요.')))
          }}>삭제</u>
        </div>
      </div>
	  ))}
	  {comments.length == 0 ? "댓글이 없습니다." : ""}
	</div>
  );
};

export default CommentList;
