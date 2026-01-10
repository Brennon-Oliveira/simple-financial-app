"use client";
import { Progress } from "@/components/ui/progress";
import { H3, P } from "@/components/ui/typography";
import { signIn, useSession } from "next-auth/react";
import { ReactNode } from "react";

type ProtectedRouteProps = { children: ReactNode };

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-2 items-center w-full max-w-sm mx-auto h-full justify-center">
        <H3>Simple Financial App</H3>
        <P>Carregando, aguarde...</P>
        <Progress indeterminate value={30} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    signIn();
    return null;
  }

  return <>{children}</>;
}
