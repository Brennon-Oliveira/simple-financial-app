import { NotificationsDrawer } from "@/components/ui/notifications-drawer";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppHeader() {
  return (
    <header className="flex items-center justify-between w-full bg-background border-b border-border px-2 py-1">
      <SidebarTrigger className="cursor-pointer" />
      <div>
        <NotificationsDrawer />
      </div>
    </header>
  );
}
