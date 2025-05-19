import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'
import { NextResponse } from 'next/server'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export async function GET() {
  const { data, error } = await supabase
    .from('sections')
    .select('id, title, slug')
    .eq('status', 'published')
    .is('deleted_at', null)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
