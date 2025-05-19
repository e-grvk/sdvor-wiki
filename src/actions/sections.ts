import { supabase } from '@/lib/supabase/client'

export async function createSection(formData: FormData) {
  const { error } = await supabase.from('sections').insert({ title: formData.get('title') })

  if (error) throw new Error('Ошибка при создании раздела')
}
