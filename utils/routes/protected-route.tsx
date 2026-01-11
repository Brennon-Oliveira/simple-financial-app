"use client";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { signIn, useSession } from "next-auth/react";
import { ReactNode } from "react";

type ProtectedRouteProps = { children: ReactNode };

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { status } = useSession();

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status === "unauthenticated") {
    signIn();
    return null;
  }

  return <>{children}</>;
}
