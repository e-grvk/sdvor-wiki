import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-bg)] fixed bottom-0 left-0 w-full border-t border-[var(--color-border)] text-center py-6 text-sm text-[var(--color-text)]">
      <div className="max-w-screen-lg mx-auto px-4">
        <p className="mb-2">&copy; 2025 Консультант-Wiki — помощник консультанта</p>
        <p className="text-xs text-gray-500">Сделано людьми для людей</p>
      </div>
    </footer>
  )
}
