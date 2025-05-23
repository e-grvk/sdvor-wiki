import '@/styles/globals.css'
import { PublicLayout } from '@/components/layout/PublicLayout'

export const metadata = { title: 'Консультант-вики' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-bg text-text antialiased">
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  )
}
