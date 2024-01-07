export default function TreeWriteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="max-w-xl mx-auto py-4">{children}</section>
  )
}
