import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { sha512 } from '../../utils/sha512';

export interface CommentEditorOnSubmitProps {
  content: string, author: string, password: string
}

interface CommentEditorProps {
  content?: string,
  author?: string,
  password?: string,
  submitButtonText?: string,
  onSubmit: (data: CommentEditorOnSubmitProps) => void
}

const CommentEditor: React.FC<CommentEditorProps> = (props: CommentEditorProps) => {
  const [content, setContent] = useState(props.content ?? "");
  const [author, setAuthor] = useState(props.author ?? "");
  const [password, setPassword] = useState(props.password ?? "");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <Input value={author}
            placeholder="작성자"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Input value={password}
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Textarea value={content}
            placeholder="내용을 입력해주세요."
            onChange={(e) => setContent(e.target.value)}
          />
      </div>
      <div>
        <Button onClick={() => props.onSubmit({content, author, password: sha512(password)})}>등록</Button>
      </div>
    </div>

  )
}

export default CommentEditor;