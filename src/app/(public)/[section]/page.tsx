import Link from 'next/link'
import { Database } from '@/types/database.types'

type TopicRow = Database['public']['Tables']['topics']['Row']

async function getTopics(sectionSlug: string): Promise<Pick<TopicRow, 'id' | 'title' | 'slug'>[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/sections/${sectionSlug}/topics`, {
    cache: 'no-store', // или 'force-cache' в зависимости от логики
  })

  if (res.status === 404) throw new Error('Section not found')
  if (!res.ok) throw new Error(`Failed to load topics: ${res.status}`)

  return res.json()
}

export default async function SectionPage({ params }: { params: { section: string } }) {
  const topics = await getTopics(params.section)

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-4">{params.section.replace(/-/g, ' ')}</h1>
      <ul className="list-disc pl-5">
        {topics.map((topic) => (
          <li key={topic.id} className="mb-2">
            <Link href={`/${params.section}/${topic.slug}`}>{topic.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
