import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'
import { NextResponse } from 'next/server'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

interface Params {
  params: { section: number }
}

export async function GET(_req: Request, { params }: Params) {
  const { data, error } = await supabase
    .from('topics')
    .select('id, title, slug')
    .eq('section_id', params.section)
    .eq('status', 'published')
    .is('deleted_at', null)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
