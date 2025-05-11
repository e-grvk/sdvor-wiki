'use client'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  HeaderGroup,
  Row,
  Cell,
} from '@tanstack/react-table'
import { Button } from '../button'

interface DataTableProps<TData extends { id: number }> {
  columns: ColumnDef<TData>[]
  data: TData[]
  deleteAction?: (id: number) => Promise<unknown>
}

export const DataTable = <TData extends { id: number }>({
  columns,
  data,
  deleteAction,
}: DataTableProps<TData>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 text-left">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
              {deleteAction && <th className="px-4 py-2">Действия</th>}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row: Row<TData>) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              {deleteAction && (
                <td className="px-4 py-2 space-x-2">
                  <Button variant="destructive" onClick={() => deleteAction(row.original.id)}>
                    Удалить
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
