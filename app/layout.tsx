import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'psvm - 스프링 강의용 프론트 예제',
  description: 'psvm - 스프링 강의용 프론트 예제',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="">{children}</body>
    </html>
  )
}
