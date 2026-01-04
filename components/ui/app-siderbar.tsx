"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingIndicator from "@/components/ui/loading-indicator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Routes } from "@/utils/routes";
import { getRoute } from "@/utils/routes-tools";
import {
  ChartNoAxesCombined,
  ChevronUp,
  HandCoins,
  Handshake,
  Home,
  LucideIcon,
  User2,
  Wallet,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
  route: Routes;
  icon: LucideIcon;
};

export function AppSidebar() {
  const { open } = useSidebar();
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();

  const finantialControlItems: MenuItem[] = [
    {
      route: "meus-orcamentos",
      icon: Wallet,
    },
  ];

  const investmentsItems: MenuItem[] = [
    {
      route: "dashboard-investimentos",
      icon: ChartNoAxesCombined,
    },
    {
      route: "meus-aportes",
      icon: Handshake,
    },
  ];

  const simulationsItems: MenuItem[] = [
    {
      route: "projecao-rentabilidade",
      icon: HandCoins,
    },
  ];

  function AppSidebarItem({ item }: { item: MenuItem }) {
    const route = getRoute(item.route);

    return (
      <SidebarMenuItem>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton asChild>
              <Link
                prefetch="auto"
                data-active={pathname === route.path}
                href={route.path}
              >
                <LoadingIndicator>
                  <item.icon />
                </LoadingIndicator>
                <span>{route.title}</span>
              </Link>
            </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent side="right" hidden={open}>
            <p>{route.title}</p>
          </TooltipContent>
        </Tooltip>
      </SidebarMenuItem>
    );
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="w-full flex justify-center text-nowrap items-center select-none">
            {open ? <h1>Simple Financial App</h1> : <h1>SFA</h1>}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className={open ? "" : "gap-0"}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {AppSidebarItem({
                item: {
                  icon: Home,
                  route: "home",
                },
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          {open && <SidebarGroupLabel>Controle financeiro</SidebarGroupLabel>}

          <SidebarGroupContent>
            <SidebarMenu>
              {finantialControlItems.map((item) => (
                <AppSidebarItem key={item.route} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          {open && <SidebarGroupLabel>Investimentos</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {investmentsItems.map((item) => (
                <AppSidebarItem key={item.route} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          {open && <SidebarGroupLabel>Simuladores</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {simulationsItems.map((item) => (
                <AppSidebarItem key={item.route} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full flex justify-center text-nowrap items-center select-none">
                  <User2 />
                  {open && (
                    <>
                      Brennon Oliveira
                      <ChevronUp className="ml-auto" />
                    </>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-(--radix-popper-anchor-width)"
              >
                <DropdownMenuItem>
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Tema</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup
                        value={theme}
                        onValueChange={setTheme}
                      >
                        <DropdownMenuRadioItem value="system">
                          Sistema
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="light">
                          Modo claro
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="dark">
                          Modo escuro
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
