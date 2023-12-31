'use client'

import Article from '@/containers/article/Article';

export default function ArticlePage({ params }: { params: { id: number } }) {
  return (
    <div className="max-w-xl mx-auto py-4">
      {params.id}
    </div>
  )
}

