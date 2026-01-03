"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>404 - Página não encontrada</EmptyTitle>
        <EmptyDescription>
          A página que você está acessando não existe!
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <EmptyDescription>
          Deseja voltar para a tela anterior?{" "}
          <Button onClick={() => router.back()} variant="link">
            Voltar
          </Button>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
}
