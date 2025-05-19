// 'use client'
//
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from 'zod'
// import { Button } from '../ui/button'
// import { Input } from '../ui/input'
// import { Modal } from '@/components/modal/Modal'
//
// const loginSchema = z.object({
//   username: z.string().min(3, 'Имя пользователя должно содержать хотя бы 3 символа'),
//   password: z.string().min(6, 'Пароль должен содержать хотя бы 6 символов'),
// })
//
// export const LoginModal = ({ isOpen, closeModal }: { isOpen: boolean; closeModal: () => void }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//   })
//
//   const onSubmit = (data: { username: string; password: string }) => {
//     // Добавить логику авторизации с использованием Supabase
//     console.log(data)
//     closeModal()
//   }
//
//   return (
//     <Modal isOpen={isOpen} onClose={closeModal} title="Авторизация">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <Input
//           {...register('username')}
//           label="Имя пользователя"
//           error={errors.username?.message}
//         />
//         <Input
//           {...register('password')}
//           label="Пароль"
//           error={errors.password?.message}
//           type="password"
//         />
//         <Button type="submit">Войти</Button>
//       </form>
//     </Modal>
//   )
// }
