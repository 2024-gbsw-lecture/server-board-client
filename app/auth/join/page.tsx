'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { customAxios } from "@/utils/axios";
import { sha512 } from "@/utils/sha512";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const router = useRouter();

  const joinHandler = async () => {
    try {
      const response = await customAxios.post('/users', {
        id,
        password: sha512(password),
        name,
        email
      });
      
      alert('회원가입이 완료되었습니다. 다시 로그인하여주세요.')
      router.push('/');
    } catch (error) {
      console.error('회원가입 중 오류 발생', error);
      const response = (error as AxiosError<any>).response;
      alert('회원가입 중 오류가 발생했습니다. ' + (response?.data.message ?? response?.status));
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="text-2xl">
        회원가입
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
          <div>
            <Label htmlFor="password-repeat">
              비밀번호 재입력
            </Label>
            <Input
              id="password-repeat"
              type="password"
              placeholder="비밀번호를 재입력해주세요."
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="name">
              이름
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="이름을 입력해주세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">
              이메일
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={joinHandler}>회원가입</Button>
      </div>
    </div>
  )
}

export default RegisterPage;