'use client'

import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl">Hello, 경소고!</h1>

      <div className="flex flex-col gap-2">
        <Link className="text-blue-500" href="/articles">&gt; 게시글 목록 보러가기</Link>
      </div>
    </div>
  )
}
