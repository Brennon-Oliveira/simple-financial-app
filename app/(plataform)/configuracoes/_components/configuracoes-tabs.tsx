"use client";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import LoadingIndicator from "@/components/ui/loading-indicator";
import { MenuItem } from "@/types/menu-item";
import { getRoute } from "@/utils/routes-tools";
import { BookUser, ShieldEllipsis } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ConfiguracoesTabs() {
  const pathname = usePathname();

  const tabItems: MenuItem[] = [
    {
      route: "dados-gerais",
      icon: BookUser,
    },
    {
      route: "seguranca",
      icon: ShieldEllipsis,
    },
  ];

  function AppSidebarItem({ item }: { item: MenuItem }) {
    const route = getRoute(item.route);

    return (
      <Button data-active={pathname === route.path} variant="outline" asChild>
        <Link prefetch="auto" href={route.path}>
          <LoadingIndicator>
            <item.icon />
          </LoadingIndicator>
          <span>{route.title}</span>
        </Link>
      </Button>
    );
  }

  return (
    <ButtonGroup>
      {tabItems.map((item) => (
        <AppSidebarItem key={item.route} item={item} />
      ))}
    </ButtonGroup>
  );
}
