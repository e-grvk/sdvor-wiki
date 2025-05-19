import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request, context: { params: { id: string } }) {
  const supabase = createRouteHandlerClient({ cookies: () => cookies() })
  const body = await request.json()
  const { title, description } = body
  const { id } = context.params

  const { data, error } = await supabase
    .from('sections')
    .update({ title, description })
    .eq('id', id)
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ section: data[0] })
}
