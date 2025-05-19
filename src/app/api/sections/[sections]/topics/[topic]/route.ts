import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'
import { NextResponse } from 'next/server'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

interface Params {
  params: { topic: string }
}

export async function GET(_req: Request, { params }: Params) {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('slug', params.topic)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }

  return NextResponse.json(data)
}
