import '../styles/globals.css' // путь может отличаться, но важно, чтобы файл был импортирован именно здесь

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
