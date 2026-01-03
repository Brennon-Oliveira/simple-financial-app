import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Bell, X } from "lucide-react";

export function NotificationsDrawer() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button size="icon" variant="ghost" className="size-7">
          <Bell />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex flex-row gap-2 items-center justify-start">
          <DrawerClose asChild>
            <Button size="icon" variant="ghost" className="size-7">
              <X />
            </Button>
          </DrawerClose>
          <DrawerTitle>Notificações</DrawerTitle>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
