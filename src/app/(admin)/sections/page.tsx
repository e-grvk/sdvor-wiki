import { SectionService } from '@/lib/services/admin/sections-service'
import { SectionForm } from '@/components/admin/sections/SectionForm'
import { DataTable } from '@/components/ui/DataTable/TadaTable'
import { sectionColumns } from '@/components/admin/sections/colums'
import { SectionCreate } from '@/types/sections.types'

export default async function SectionsPage() {
  const { data: sections } = await SectionService.getAll()

  const handleCreate = async (data: SectionCreate) => {
    'use server'
    await SectionService.create(data)
  }

  const handleDelete = async (id: number) => {
    'use server'
    await SectionService.delete(id)
    return null
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Управление разделами</h1>

      <div className="mb-8">
        <SectionForm onSubmitAction={handleCreate} initialData={undefined} />
      </div>

      <DataTable columns={sectionColumns} data={sections || []} deleteAction={handleDelete} />
    </div>
  )
}
