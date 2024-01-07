'use client';

import Lazy from "@/components/Lazy";
import { Switch } from "@/components/ui/switch"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import useMounted from "@/hooks/useMounted";
import useToken from "@/hooks/useToken"
import { tokenFetcher } from "@/utils/axios";
import Link from "next/link"
import useSWR from "swr";

export default function Home() {
  const [enablePassword, setEnablePassword] = useLocalStorage('enable_password', false)
  const [enableComment, setEnableComment] = useLocalStorage('enable_comment', false)
  const { token, removeToken } = useToken();

  const { 
    isLoading: isProfileLoading,
    error: profileLoadError,
    data: profile
  } = useSWR('/users/me', tokenFetcher(token));

  return (
    <div className="max-w-xl mx-auto py-4 flex flex-col gap-5">
      <h1 className="text-2xl">Hello, 경소고!</h1>

      <div className="flex flex-col gap-2">
        <Lazy>
          <div>
            <div>
              {!!token ? '로그인되어있습니다.' : <Link className="text-blue-500" href="/auth/login">로그인해주세요.</Link>}
            </div>
            <div>
              {!!token ? <div className="text-blue-500 cursor-pointer" onClick={removeToken}>로그아웃하기</div> : ''}
            </div> 
          </div>
          <div className={!!token ? '' : 'hidden'}>
            <div className="text-xl">내 프로필</div>
            {profileLoadError ? '프로필을 불러오지 못했습니다.' : isProfileLoading ? '프로필 로딩중...' : (
              <div>
                <div>아이디 : {profile?.id}</div>
                <div>이름 : {profile?.name}</div>
                <div>이메일 : {profile?.email}</div>
              </div>
            )}
          </div>
        </Lazy>
      </div>

      <div className="border-b w-full"></div>

      <div className="flex flex-col gap-2">
        <Link className="text-blue-500" href="/articles">&gt; 게시글 목록 보러가기</Link>
        <Link className="text-blue-500" href="/trees">&gt; 내 트리 보러가기</Link>
        <Link className="text-blue-500" href="/auth/login">&gt; 로그인 페이지 가기</Link>
      </div>

      <div className="flex flex-col gap-5">
        <div className="border-b w-full"></div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2"><Switch className="border" checked={enablePassword} onCheckedChange={() => setEnablePassword(!enablePassword)}/> 비밀번호 기능</div>
          <div className="flex items-center gap-2"><Switch className="border" checked={enableComment} onCheckedChange={() => setEnableComment(!enableComment)}/> 댓글 기능</div>
        </div>
      </div>
    </div>
  )
}
