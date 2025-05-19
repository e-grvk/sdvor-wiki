'use client'

import { useState, useEffect } from 'react'

type SectionType = {
  id: number
  title: string
  description: string
}

export default function SectionsAdmin() {
  const [sections, setSections] = useState<SectionType[]>([])
  const [form, setForm] = useState({ title: '', description: '' })

  useEffect(() => {
    fetch('/(admin)/api/sections')
      .then((r) => r.json())
      .then(setSections)
  }, [])

  const submit = async () => {
    const res = await fetch(`/(admin)/api/sections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const newSection = await res.json()
    setSections((prev) => [...prev, newSection])
    setForm({ title: '', description: '' })
  }
  return (
    <div>
      <h1>Разделы</h1>
      <ul>
        {sections.map((s) => (
          <li key={s.id}>{s.title}</li>
        ))}
      </ul>
    </div>
  )
}
