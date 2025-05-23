import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

// Изменённый обработчик
export async function GET(request: Request, { params }: { params: { section: string } }) {
  try {
    const sectionId = parseInt(params.section, 10)

    if (isNaN(sectionId)) {
      return NextResponse.json({ error: 'Invalid Section ID' }, { status: 400 })
    }

    // Упрощённый запрос к базе
    const { data, error } = await supabase.from('sections').select('*').eq('id', sectionId) // Убираем фильтры и .single()

    if (error || !data) {
      console.error('DB Error:', error)
      return NextResponse.json({ error: 'Section not found or error in DB query' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Unexpected Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
