"use client";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type AuthRouteProps = { children: ReactNode };

export function AuthRoute({ children }: AuthRouteProps) {
  const { status } = useSession();

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status === "authenticated") {
    return redirect("/");
  }

  return <>{children}</>;
}
