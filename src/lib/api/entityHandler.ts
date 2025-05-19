// src/lib/api/entityHandler.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Database } from '@/types/database.types'

// Контекст, в который Next.js передаёт params
type Params = { params: { id: string } }

// Фабрика клиента для route handlers
function getClient() {
  return createRouteHandlerClient<Database>({ cookies: () => cookies() })
}

// GET all
export async function handleGetAll<TableName extends keyof Database['public']['Tables']>(
  table: TableName,
) {
  const supabase = getClient()
  const { data, error } = await supabase
    // 1-й аргумент — это Row‑тип, 2-й — Insert‑тип (только для insert/update, но для select достаточно Row)
    .from<Database['public']['Tables'][TableName]['Row']>(table)
    .select('*')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ items: data })
}

// GET one
export async function handleGetOne<TableName extends keyof Database['public']['Tables']>(
  table: TableName,
  context: Params,
) {
  const supabase = getClient()
  const id = Number(context.params.id)
  const { data, error } = await supabase
    .from<Database['public']['Tables'][TableName]['Row']>(table)
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error || data === null) {
    return NextResponse.json({ error: error?.message ?? 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ item: data })
}

// CREATE
export async function handleCreate<TableName extends keyof Database['public']['Tables']>(
  table: TableName,
  body: Database['public']['Tables'][TableName]['Insert'],
) {
  const supabase = getClient()
  const { data, error } = await supabase
    .from<
      Database['public']['Tables'][TableName]['Row'],
      Database['public']['Tables'][TableName]['Insert']
    >(table)
    .insert([body])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  return NextResponse.json({ item: data![0] }, { status: 201 })
}

// UPDATE
export async function handleUpdate<TableName extends keyof Database['public']['Tables']>(
  table: TableName,
  context: Params,
  body: Database['public']['Tables'][TableName]['Update'],
) {
  const supabase = getClient()
  const id = Number(context.params.id)
  const { data, error } = await supabase
    .from<
      Database['public']['Tables'][TableName]['Row'],
      Database['public']['Tables'][TableName]['Update']
    >(table)
    .update(body)
    .eq('id', id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  return NextResponse.json({ item: data![0] })
}

// DELETE
export async function handleDelete<TableName extends keyof Database['public']['Tables']>(
  table: TableName,
  context: Params,
) {
  const supabase = getClient()
  const id = Number(context.params.id)
  const { error } = await supabase.from(table).delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  return NextResponse.json({ success: true })
}
