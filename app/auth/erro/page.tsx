"use client";
import { LinkInvalidoPage } from "@/app/auth/erro/_pages/link-invalido";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

const errosPages: Partial<{
  [key in string]: ReactNode;
}> = {
  Verification: <LinkInvalidoPage />,
};

export default function LinkExpiradoPage() {
  const searchParams = useSearchParams();

  return (
    <section className="flex w-full mx-auto h-full justify-center items-center">
      {errosPages[searchParams.get("error") ?? ""]}
    </section>
  );
}
