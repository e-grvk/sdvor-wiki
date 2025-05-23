'use client'

import React from 'react'

export interface BaseInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  icon?: React.ReactNode
  className?: string
}

export const BaseInput: React.FC<BaseInputProps> = ({
  placeholder = 'Введите текст...',
  value = '',
  onChange,
  icon,
  className = '',
}) => {
  return (
    <div
      className={`flex items-center w-full max-w-xl px-4 py-3 bg-white border border-gray-300 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-orange-500 transition ${className}`}
    >
      {icon && <span className="mr-3 text-gray-500">{icon}</span>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="flex-1 bg-transparent focus:outline-none text-black placeholder-gray-400"
      />
    </div>
  )
}
