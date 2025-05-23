import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function GET(
  request: Request,
  context: { params: { section: string; topic: string } },
) {
  try {
    // Ожидание резолва параметров
    const { section, topic } = await context.params

    const sectionId = parseInt(section, 10)
    const topicId = parseInt(topic, 10)

    if (isNaN(sectionId) || isNaN(topicId)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('id', topicId)
      .eq('section_id', sectionId)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
