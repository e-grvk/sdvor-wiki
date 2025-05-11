import { supabaseServer } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = supabaseServer()
  const { data } = await supabase.from('sections').select('*')
  return NextResponse.json(data)
}
