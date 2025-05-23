'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchSections } from '@/lib/services/sections-service'
import { Section } from '@/types/sections.types'
import { SearchInput } from '@/components/ui/inputs/searchinput'

export default function HomePage() {
  const [sections, setSections] = useState<Section[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const loadSections = async () => {
      try {
        const data = await fetchSections()
        setSections(data)
      } catch (error: unknown) {
        console.error('Error loading sections:', error)
        setError('Не удалось загрузить секции. Попробуйте позже.')
      } finally {
        setLoading(false)
      }
    }

    loadSections()
  }, [])

  const filteredSections = sections?.filter((section) =>
    section.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <main className="min-h-screen bg-[#F5F5F5] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-6">
            Давай найдем информацию?
          </h1>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholderVariants={[
              'Как отгрузить обратку?',
              'Как начинается день на магазине?',
              'Как отгрузить дебитора?',
            ]}
          />
        </div>

        {loading && <p className="text-center text-gray-500">Загрузка...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && filteredSections?.length === 0 && (
          <p className="text-center text-gray-600">Секции не найдены</p>
        )}

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {!loading &&
            filteredSections &&
            filteredSections.map((section) => (
              <SectionLink key={section.id} slug={section.slug} title={section.title} />
            ))}
        </ul>
      </div>
    </main>
  )
}

interface SectionLinkProps {
  slug: string
  title: string
}

const SectionLink: React.FC<SectionLinkProps> = ({ slug, title }) => (
  <li>
    <Link
      href={`/${slug}`}
      className="block bg-white p-5 rounded-[var(--radius)] shadow-sm border hover:shadow-md transition hover:border-[var(--color-primary)]"
    >
      <h2 className="text-lg font-medium text-[var(--color-text)]">{title}</h2>
    </Link>
  </li>
)
