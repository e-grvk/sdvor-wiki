'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Section } from '@/types/sections.types'

const sectionSchema = z.object({
  title: z.string().min(5, 'Название не менее 5 символов'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Только латиница и дефисы'),
  cover_url: z.string().optional(),
})

export const SectionForm = ({
  initialData,
  onSubmitAction,
}: {
  initialData?: Section
  onSubmitAction: (data: z.infer<typeof sectionSchema>) => void
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sectionSchema),
    defaultValues: initialData,
  })

  return (
    <form onSubmit={handleSubmit(onSubmitAction)} className="space-y-4">
      <Input {...register('title')} label="Название раздела" error={errors.title?.message} />

      <Input {...register('slug')} label="URL-идентификатор" error={errors.slug?.message} />

      <Button type="submit">{initialData ? 'Обновить' : 'Создать'}</Button>
    </form>
  )
}
