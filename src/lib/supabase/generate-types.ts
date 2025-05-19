import fs from 'fs/promises'
import path from 'path'

const SUPABASE_PROJECT_ID = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const TYPES_PATH = path.join(process.cwd(), 'src/types/database.types.ts')

async function generateTypes() {
  if (!SUPABASE_PROJECT_ID || !ANON_KEY) {
    throw new Error('Не найдено окружение supabase')
  }

  try {
    const response = await fetch(
      `https://${SUPABASE_PROJECT_ID}.supabase.co/rest/v1/?apikey=${ANON_KEY}`,
      { headers: { Accept: 'application/json' } },
    )

    if (!response.ok) throw new Error('Failed to fetch types')

    const { definitions } = await response.json()
    const typeContent =
      `// Автоматически сгенерированно ${new Date().toISOString()}\n` +
      `export type Database = {\n  public: {\n    Tables: ${JSON.stringify(definitions, null, 2)}\n  }\n}`

    await fs.writeFile(TYPES_PATH, typeContent)
    console.log('✅ Типы обнавлены успешно')
  } catch (error) {
    console.error('❌ Ошибка при обновлении типов:', error)
  }
}

generateTypes()
