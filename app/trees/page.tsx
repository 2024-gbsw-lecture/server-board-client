'use client';

import { Button } from '@/components/ui/button';
import Ornament from '@/containers/tree/Ornament';
import Pagnation from '@/containers/tree/Pagnation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Pencil, Plus } from 'lucide-react';
import Link from 'next/link';

function TreePage() {
	return (
    <div className="h-screen bg-[#050e11] text-white">
      <div className="w-full h-[667px] absolute top-1/2 -translate-y-1/2">
        <div className="relative top-0 left-0 w-full  p-4 z-10">
          <div className="w-full max-w-lg text-2xl font-bold mx-auto flex items-center">
            <div className="bg-slate-900 bg-opacity-80">
              내 <span className="text-cyan-400">트리</span>를 꾸며봐! 
            </div>
            <div className="flex-1"></div>
            <div>
              <Link href="/auth/login">
                <Button size="sm" className="bg-slate-500">로그인</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative min-h-28 lg:min-h-20"></div>
        <div className="w-full h-[667px] max-h-[400px] max-w-96 px-2 relative bottom-[0px] lg:bottom-[0px] left-1/2 -translate-x-1/2 ">
          <div className="w-full h-full relative">
            <img
              className="w-full h-full object-contain absolute"
              alt="크리스마스 트리"
              src="/tree.png"
              draggable="false"  />
            <div className="absolute w-72 top-1/4 left-1/2 -translate-x-1/2 flex flex-col gap-8">
              <div className="flex justify-evenly px-16">
                <Ornament id={1} onClick={(id) => {}}/>
                <Ornament id={1} onClick={(id) => {}}/>
              </div>
              <div className="flex justify-evenly px-8">
                <Ornament id={1} onClick={(id) => {}}/>
                <Ornament id={1} onClick={(id) => {}}/>
                <Ornament id={1} onClick={(id) => {}}/>
              </div>
              <div className="flex justify-evenly px-2">
                <Ornament id={1} onClick={(id) => {}}/>
                <Ornament id={1} onClick={(id) => {}}/>
                <Ornament id={1} onClick={(id) => {}}/>
                <Ornament id={1} onClick={(id) => {}}/>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex justify-center mt-4 gap-4">
          <Link href="/trees/write">
            <Button className="bg-red-500 text-white shadow-xl">
              <Pencil className="w-4 h-4 mr-2"/> 트리 꾸며주기!
            </Button>
          </Link>
          
          <Pagnation page={1} totalPage={5}/>
        </div>
        <div className="w-full h-[667px] absolute -z-10 top-0">
          <img
            className="aspect-video w-full h-full object-bottom object-cover"
            alt="눈이 내리고 있는 마을 배경 사진, 크리스마스 트리들에 여러 장식들이 달려있다."
            src="/tree-background.png"
            draggable="false"  />
        </div>
      </div>
    </div>
  )
}

export default TreePage;