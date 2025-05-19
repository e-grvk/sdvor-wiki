import { Database } from '@/types/database.types'
import { notFound } from 'next/navigation'

type TopicRow = Database['public']['Tables']['topics']['Row']

export async function generateStaticParams(): Promise<{ section: string; topic: string }[]> {
  const sectionsRes = await fetch('/api/sections', { cache: 'no-store' })
  const sections: { slug: string | null }[] = await sectionsRes.json()

  const paths: { section: string; topic: string }[] = []

  for (const sec of sections) {
    if (!sec.slug) continue

    const topicsRes = await fetch(`/api/sections/${sec.slug}/topics`, { cache: 'no-store' })
    const topics: { slug: string | null }[] = await topicsRes.json()

    for (const t of topics) {
      if (t.slug) {
        paths.push({
          section: sec.slug,
          topic: t.slug,
        })
      }
    }
  }

  return paths
}

interface TopicPageProps {
  params: { section: string; topic: string }
}

export default async function TopicPage({ params }: TopicPageProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/sections/${params.section}/topics/${params.topic}`,
    { cache: 'no-store' },
  )
  if (!res.ok) {
    notFound()
  }

  const topic: TopicRow = await res.json()

  return (
    <article className="p-8">
      <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>
      <div>
        {typeof topic.content === 'string' ? topic.content : JSON.stringify(topic.content, null, 2)}
      </div>
    </article>
  )
}
