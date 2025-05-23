import fs from 'fs/promises'
import path from 'path'

const SUPABASE_PROJECT_ID = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const TYPES_PATH = path.join(process.cwd(), 'src/types/database.types.ts')

// Функция логирования ошибок
function logError(message: string) {
  console.error(`❌ ${message}`)
}

async function generateTypes() {
  if (!SUPABASE_PROJECT_ID || !ANON_KEY) {
    logError('SUPABASE_PROJECT_ID или ANON_KEY отсутствуют.')
    return
  }

  try {
    const response = await fetch(
      `https://${SUPABASE_PROJECT_ID}.supabase.co/rest/v1/?apikey=${ANON_KEY}`,
      { headers: { Accept: 'application/json' } },
    )

    if (!response.ok) {
      throw new Error(`Ошибка запроса типов: ${response.status} ${response.statusText}`)
    }

    const { definitions } = await response.json()
    if (!definitions) {
      throw new Error('От Supabase не получено определений.')
    }

    const typeContent =
      `// Автоматически сгенерировано ${new Date().toISOString()}\n` +
      `export type Database = {\n  public: {\n    Tables: ${JSON.stringify(definitions, null, 2)}\n  }\n}`

    await fs.writeFile(TYPES_PATH, typeContent)
    console.log('✅ Типы успешно обновлены.')
  } catch (error) {
    logError(error instanceof Error ? error.message : 'Неизвестная ошибка.')
  }
}

generateTypes()
