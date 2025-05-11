import { validateAdmin } from "@/lib/auth/admin";

export default async function TestPage() {
  try {
    await validateAdmin();
    return <div>Доступ разрешён</div>;
  } catch (error) {
    return <div>Ошибка: {(error as Error).message}</div>;
  }
}
