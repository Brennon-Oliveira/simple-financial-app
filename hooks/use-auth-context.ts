import { signIn, useSession } from "next-auth/react";

export function useAuthContext() {
  const { data: session } = useSession();

  if (!session) {
    signIn();
    return session!;
  }

  return session;
}
