import '@/styles/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-blue-600 text-white p-4">
            <h1 className="text-xl">Tailwind CSS + App Router</h1>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  )
}
