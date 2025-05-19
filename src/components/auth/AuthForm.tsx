'use client'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function AuthForm() {
  const router = useRouter()

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'securepassword',
    })

    if (!error) {
      router.refresh()
      router.push('/admin')
    }
  }

  return (
    <button onClick={handleSignIn} className="w-full rounded-md bg-blue-600 px-4 py-2 text-white">
      Войти как администратор
    </button>
  )
}
