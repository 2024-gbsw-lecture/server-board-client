import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { sha512 } from '../../utils/sha512';
import Lazy from '@/components/Lazy';

export interface ArticleEditorOnSubmitProps {
    title: string, content: string, author: string
}

interface ArticleEditorProps {
    title?: string,
    content?: string,
    author?: string,
    password?: string,
    submitButtonText?: string,
    isAnonymous?: boolean,
    onSubmit: (data: ArticleEditorOnSubmitProps) => void
}

const ArticleEditor: React.FC<ArticleEditorProps> = (props: ArticleEditorProps) => {
  const [title, setTitle] = useState(props.title ?? "");
  const [content, setContent] = useState(props.content ?? "");
  const [author, setAuthor] = useState(props.author ?? "");
  const [password, setPassword] = useState(props.password ?? "");

  const [enablePassword] = useLocalStorage('enable_password', false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!content) {
      alert('내용을 입력해주세요.');
      return;
    }
    if (props.isAnonymous) {
      if (!author) {
        alert('작성자를 입력해주세요.');
        return;
      }
      if (enablePassword && !password) {
        alert('비밀번호를 입력해주세요.');
        return;
      }
    }

    props.onSubmit(Object.assign({title, content, author}, enablePassword ? {password: sha512(password)} : {}));
  };

  return (
    <Lazy>
      <div className="flex flex-col gap-3">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              className=""
              placeholder="제목을 입력해주세요."
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="content">
              내용
            </Label>
            <Textarea
              id="content"
              placeholder="내용을 입력해주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className={!props.isAnonymous ? 'hidden' : ''}>
            <Label htmlFor="author">
              작성자
            </Label>
            <Input
              id="author"
              type="text"
              placeholder="작성자를 입력해주세요."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className={!props.isAnonymous || !enablePassword ? 'hidden' : ''}>
            <Label htmlFor="password">
              비밀번호
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button>{props.submitButtonText ?? "게시물 등록"}</Button>
        </form>
      </div>
    </Lazy>
  );
};

export default ArticleEditor;
