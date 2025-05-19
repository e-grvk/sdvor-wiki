import slugify from 'slugify'

export interface Topic {
  id: string
  title: string
  content: string
  slug: string
}

export interface Section {
  id: string
  title: string
  slug: string
  topics: Topic[]
}

export const sections: Section[] = []
