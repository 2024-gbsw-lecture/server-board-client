'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useToken from "@/hooks/useToken";
import { customAxios } from "@/utils/axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { sha512 } from '../../../utils/sha512';
import { AxiosError } from "axios";

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  const { token, setToken } = useToken();
  const redirectTo = searchParams.get('redirect-to') ?? '/';

  useEffect(() => {
    if (!!token) {
      alert('이미 로그인이 되어있습니다.');
      router.push(redirectTo);
    }
  }, [])

  const loginHandler = async () => {
    try {
      const response = await customAxios.post('/auth/login', { id, password: sha512(password) });
            
      const token = response.data.token
      setToken(token);
      router.push(redirectTo);
    } catch (error) {
      console.error('로그인 중 오류 발생', error);
      const response = (error as AxiosError<any>).response;
      alert('로그인 중 오류가 발생했습니다. ' + (response?.data.message ?? response?.status));
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="text-2xl">
        로그인
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div>
            <Label htmlFor="id">
              아이디
            </Label>
            <Input
              id="id"
              type="text"
              placeholder="아이디를 입력해주세요."
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div>
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
        </div>
        <Button onClick={loginHandler}>로그인</Button>
        <Link href="/auth/join" className="text-blue-500">계정이 없으신가요? 여기서 회원가입하세요!</Link>
      </div>
    </div>
  )
}

export default LoginPage;