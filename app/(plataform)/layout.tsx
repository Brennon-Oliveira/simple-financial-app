import { ProtectedRoute } from "@/utils/routes/protected-route";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
