import { ConfiguracoesTabs } from "@/app/(plataform)/configuracoes/_components/configuracoes-tabs";
import { ReactNode } from "react";

export default function ConfiguracoesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="h-full flex flex-col gap-3">
      <ConfiguracoesTabs />
      {children}
    </main>
  );
}
