import Link from 'next/link'
import { Database } from '@/types/database.types'

type SectionRow = Database['public']['Tables']['sections']['Row']

async function getSections(): Promise<SectionRow[]> {
  const res = await fetch('/api/sections')
  if (!res.ok) throw new Error(`Failed to load sections: ${res.status}`)
  // Явно приводим JSON к нужному типу
  return res.json() as Promise<SectionRow[]>
}

export default async function HomePage() {
  const sections = await getSections()

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Разделы</h1>
      <ul className="list-disc pl-5">
        {sections.map((sec) => (
          <li key={sec.id} className="mb-2">
            <Link href={`/${sec.slug}`}>{sec.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
