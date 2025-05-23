import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export const Header: React.FC = () => {
  return (
    <header className="bg-[var(--color-bg)] border-b border-[var(--color-border)] px-4 py-1">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/sdvorLogo.png" alt="Строительный двор" width={64} height={64} />
          <h1 className="text-xl font-bold text-[var(--color-text)]">Консультант-Wiki</h1>
        </div>
        <nav className="space-x-6">
          <Link href="/" className="text-[var(--color-text)] hover:text-[var(--color-primary)]">
            Главная
          </Link>
          <Link
            href="/contacts"
            className="text-[var(--color-text)] hover:text-[var(--color-primary)]"
          >
            О проекте
          </Link>
        </nav>
      </div>
    </header>
  )
}
