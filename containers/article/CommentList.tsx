// components/CommentList.tsx

import { Comment } from '@/types/Article';
import dayjs from 'dayjs';

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="flex flex-col gap-3">
      {comments.map(comment => (
        <div className="border rounded-md px-4 py-2" key={comment.id}>
          <div className="text-lg mb-1">{comment.content}</div>
          <div className="text-sm">{comment.author} · {dayjs(comment.createdAt).format("YYYY년 MM월 DD일")}</div>
        </div>
      ))}
      {comments.length == 0 ? "댓글이 없습니다." : ""}
    </div>
  );
};

export default CommentList;
