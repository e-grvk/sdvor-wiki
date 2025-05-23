'use client'

import React from 'react'

interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Поиск...',
  value = '',
  onChange,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-6 py-4 rounded-[var(--radius)] border border-[var(--color-border)] shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
      />
    </div>
  )
}
