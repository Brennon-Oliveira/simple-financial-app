import { AuthRoute } from "@/utils/routes/auth-route";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <AuthRoute>{children}</AuthRoute>;
}
