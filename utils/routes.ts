export type Routes =
  | "home"
  | "meus-orcamentos"
  | "dashboard-investimentos"
  | "meus-aportes"
  | "projecao-rentabilidade";

export type RouteData = {
  title: string;
  path: string;
  createPath: (...args: string[]) => string;
};

export const routes = {
  home: {
    title: "Página inicial",
    path: "/",
    createPath: () => {
      return "/";
    },
  },
  "meus-orcamentos": {
    title: "Meus orçamentos",
    path: "/controle-financeiro/meus-orcamentos",
    createPath: () => {
      return "/controle-financeiro/meus-orcamentos";
    },
  },
  "dashboard-investimentos": {
    title: "Dashboard de investimentos",
    path: "/investimentos/dashboard-investimentos",
    createPath: () => {
      return "/investimentos/dashboard-investimentos";
    },
  },
  "meus-aportes": {
    title: "Meus aportes",
    path: "/investimentos/meus-aportes",
    createPath: () => {
      return "/investimentos/meus-aportes";
    },
  },
  "projecao-rentabilidade": {
    title: "Projeção de rentabilidade",
    path: "/simuladores/projecao-de-rentabilidade",
    createPath: () => {
      return "/simuladores/projecao-de-rentabilidade";
    },
  },
} as const;
