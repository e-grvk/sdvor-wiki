import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/database.types'

export const supabaseServer = () => {
  return createServerComponentClient<Database>({ cookies })
}
