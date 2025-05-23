import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function GET(
  request: Request,
  { params }: { params: { section: string; topic: string } },
) {
  try {
    const sectionId = parseInt(params.section, 10)
    const topicId = parseInt(params.topic, 10)

    if (isNaN(sectionId) || isNaN(topicId)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('id', topicId)
      .eq('section_id', sectionId)
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
