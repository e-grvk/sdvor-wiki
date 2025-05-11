import { AuthForm } from '@/components/auth/AuthForm'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg border">
        <h2 className="text-center text-2xl font-bold">Вход в админ-панель</h2>
        <AuthForm />
      </div>
    </div>
  )
}
