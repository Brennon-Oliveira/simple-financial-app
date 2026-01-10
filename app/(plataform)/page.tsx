"use client";

import { H1 } from "@/components/ui/typography";
import { ProtectedRoute } from "@/utils/routes/protected-route";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
      <div>
        <H1>Bem vindo(a) {session?.user?.name} ao Simples Financial App</H1>
      </div>
    </ProtectedRoute>
  );
}
