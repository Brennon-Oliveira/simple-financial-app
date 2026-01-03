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
import {
  ChartNoAxesCombined,
  ChevronUp,
  HandCoins,
  Handshake,
  LucideIcon,
  User2,
  Wallet,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

type MenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export function AppSidebar() {
  const { open } = useSidebar();
  const { setTheme, theme } = useTheme();

  const finantialControlItems: MenuItem[] = [
    {
      title: "Meus orçamentos",
      url: "controle-financeiro/meus-orçamentos",
      icon: Wallet,
    },
  ];

  const investmentsItems: MenuItem[] = [
    {
      title: "Dashboard de investimentos",
      url: "investimentos/dashboard",
      icon: ChartNoAxesCombined,
    },
    {
      title: "Meus aportes",
      url: "investimentos/meus-aportes",
      icon: Handshake,
    },
  ];

  const simulationsItems: MenuItem[] = [
    {
      title: "Projeção de rentabilidade",
      url: "/simuladores/projecao-de-rentabilidade",
      icon: HandCoins,
    },
  ];

  function AppSidebarItem({ item }: { item: MenuItem }) {
    return (
      <SidebarMenuItem>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent side="right" hidden={open}>
            <p>{item.title}</p>
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
          {open && <SidebarGroupLabel>Controle financeiro</SidebarGroupLabel>}

          <SidebarGroupContent>
            <SidebarMenu>
              {finantialControlItems.map((item) => (
                <AppSidebarItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          {open && <SidebarGroupLabel>Investimentos</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {investmentsItems.map((item) => (
                <AppSidebarItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          {open && <SidebarGroupLabel>Simuladores</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {simulationsItems.map((item) => (
                <AppSidebarItem key={item.title} item={item} />
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
                <SidebarMenuButton>
                  <User2 /> Brennon Oliveira
                  <ChevronUp className="ml-auto" />
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
