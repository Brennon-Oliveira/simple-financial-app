"use client";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";

type EntrarComGoogleProps = {
  trocarUltimoAcesso: () => void;
};

export function EntrarComGoogle({ trocarUltimoAcesso }: EntrarComGoogleProps) {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      await signIn("google", {
        callbackUrl: searchParams.get("callbackUrl") ?? "/",
      });

      trocarUltimoAcesso();
    });
  }, [searchParams, trocarUltimoAcesso]);

  return <LoadingScreen />;
}
