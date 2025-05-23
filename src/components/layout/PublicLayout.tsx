import React from 'react'
import { Header } from '../shared/Header'
import { Footer } from '../shared/Footer'

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-2">{children}</main>
      <Footer />
    </div>
  )
}
