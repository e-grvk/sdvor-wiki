import { ColumnDef } from '@tanstack/react-table'
import { Section } from '@/types/sections.types'

export const sectionColumns: ColumnDef<Section>[] = [
  {
    accessorKey: 'title',
    header: 'Название',
  },
  {
    accessorKey: 'slug',
    header: 'URL',
  },
  {
    accessorKey: 'cover_url',
    header: 'Обложка',
    cell: ({ row }) =>
      row.getValue('cover_url') ? (
        <img
          src={row.getValue('cover_url')}
          className="h-12 w-12 object-cover rounded"
          alt="Обложка"
        />
      ) : (
        '—'
      ),
  },
]
