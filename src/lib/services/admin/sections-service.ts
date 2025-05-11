import { supabase } from '@/lib/supabase/client'
import { SectionCreate, SectionUpdate } from '@/types/sections.types'

export const SectionsService = {
  //Получение общего пула разделов
  getAll: async () => supabase.from('sections').select('*'),

  //Создание раздела
  create: async (data: SectionCreate) => supabase.from('sections').insert(data).select().single(),

  //Обновление раздела
  update: async (id: number, data: SectionUpdate) =>
    supabase.from('sections').update(data).eq('id', id).select().single(),

  //Удаление раздела
  delete: async (id: number) => supabase.from('sections').delete().eq('id', id),
}
