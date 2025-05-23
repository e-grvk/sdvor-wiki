'use client'

import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholderVariants?: string[]
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  className = '',
  placeholderVariants = [
    'Как отгрузить обратку?',
    'Как начинается день на магазине?',
    'Как отгрузить дебитора?',
  ],
}) => {
  const [displayed, setDisplayed] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  const currentPhrase = placeholderVariants[currentIndex]

  // Печатаем текущую фразу по буквам
  useEffect(() => {
    if (!value && charIndex < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + currentPhrase[charIndex])
        setCharIndex((i) => i + 1)
      }, 50)
      return () => clearTimeout(timeout)
    }

    if (!value && charIndex === currentPhrase.length) {
      // Задержка перед следующей фразой
      const delay = setTimeout(() => {
        setDisplayed('')
        setCharIndex(0)
        setCurrentIndex((i) => (i + 1) % placeholderVariants.length)
      }, 2000)
      return () => clearTimeout(delay)
    }
  }, [charIndex, currentPhrase, placeholderVariants, value])

  // При вводе текста — сброс
  useEffect(() => {
    if (value) {
      setDisplayed('')
      setCharIndex(0)
    }
  }, [value])

  return (
    <div
      className={`relative flex items-center w-full max-w-xl mx-auto px-4 py-3 bg-white border border-gray-300 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-orange-500 transition ${className}`}
    >
      <span className="mr-3 text-gray-500">
        <FiSearch size={20} />
      </span>

      {/* Анимированный псевдо-placeholder */}
      <AnimatePresence>
        {!value && (
          <motion.span
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-12 text-gray-400 pointer-events-none select-none"
          >
            {displayed}
          </motion.span>
        )}
      </AnimatePresence>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent focus:outline-none text-black placeholder-transparent"
        placeholder="."
      />
    </div>
  )
}
