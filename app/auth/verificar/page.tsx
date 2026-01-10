"use client";
import { VerificarEmailPage } from "@/app/auth/verificar/_pages/verificar-email";
import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

const verificacaoPages: Partial<{
  [key in LiteralUnion<BuiltInProviderType, string>]: ReactNode;
}> = {
  email: <VerificarEmailPage />,
};

export default function LinkExpiradoPage() {
  const searchParams = useSearchParams();

  return (
    <section className="flex w-full mx-auto h-full justify-center items-center">
      {verificacaoPages[searchParams.get("provider") ?? ""]}
    </section>
  );
}
