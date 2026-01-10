"use client";
import { NotificationsDrawer } from "@/components/ui/notifications-drawer";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

export function AppHeader() {
  const { data: session } = useSession();
  if (!session) {
    return <></>;
  }

  return (
    <header className="flex items-center justify-between w-full bg-background border-b border-border px-2 py-1">
      <SidebarTrigger className="cursor-pointer" />
      <div>
        <NotificationsDrawer />
      </div>
    </header>
  );
}
