export type Section = {
  id: number
  title: string
  slug: string
  cover_url?: string
}

export type SectionCreate = Omit<Section, 'id'>
export type SectionUpdate = Partial<SectionCreate>
