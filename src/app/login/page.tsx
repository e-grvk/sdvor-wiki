// src/app/login/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "auth_required") {
      setError("Требуется авторизация администратора");
    }
  }, [searchParams]);

  // ... остальная часть формы
}
