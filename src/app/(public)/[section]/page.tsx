import Link from 'next/link'

interface Section {
  id: number
  title: string
  slug: string
}

async function getSections(): Promise<Section[]> {
  const res = await fetch('/api/sections')
  if (!res.ok) throw new Error(`Failed to fetch sections: ${res.statusText}`)
  return res.json()
}

export default async function HomePage() {
  const sections = await getSections()

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Разделы</h1>
      {sections.length === 0 ? (
        <p>Секции не найдены</p>
      ) : (
        <ul className="list-disc pl-5">
          {sections.map((section: Section) => (
            <li key={section.id} className="mb-2">
              <Link href={`/${section.slug}`}>{section.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
