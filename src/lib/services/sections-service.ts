export async function fetchSections() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const response = await fetch(`${baseUrl}/api/sections`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Ошибка сервера: ${response.status}`)
  }

  return response.json()
}
