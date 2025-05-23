'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchSections } from '@/lib/services/sections-service'
import { Section } from '@/types/sections.types'

export default function HomePage() {
  const [sections, setSections] = useState<Section[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

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

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Разделы</h1>

      {loading && <p>Загрузка...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && sections && sections.length === 0 && <p>Секции не найдены</p>}

      <ul className="list-disc pl-5 space-y-2">
        {!loading &&
          sections &&
          sections.map((section) => (
            <SectionLink key={section.id} slug={section.slug} title={section.title} />
          ))}
      </ul>
    </main>
  )
}

interface SectionLinkProps {
  slug: string
  title: string
}

const SectionLink: React.FC<SectionLinkProps> = ({ slug, title }) => {
  return (
    <li>
      <Link href={`/${slug}`} className="text-blue-600 hover:underline">
        {title}
      </Link>
    </li>
  )
}
