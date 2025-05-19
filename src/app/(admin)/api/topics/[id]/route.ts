import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Database } from '@/types/database.types'

export async function PATCH(request: Request, context: { params: { id: string } }) {
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookies() })
  const { id } = context.params
  const { title, content, section_id } = await request.json()

  const { data, error } = await supabase
    .from('topics')
    .update({ title, content, section_id })
    .eq('id', id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  return NextResponse.json({ topic: data[0] })
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
  const supabase = createRouteHandlerClient({ cookies: () => cookies() })
  const { id } = context.params
  const { error } = await supabase.from('sections').delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
