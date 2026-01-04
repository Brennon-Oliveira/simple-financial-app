import { routes, Routes } from "@/utils/routes";

export function isActiveRoute(pathname: string, route: Routes) {
  const routePathname = routes[route].path;

  return pathname === routePathname;
}

export function getRoute(route: Routes) {
  return routes[route];
}

export function getRoutePath(route: Routes) {
  const routePathname = routes[route].path;

  return routePathname;
}

export function getRouteTitle(route: Routes) {
  const routeName = routes[route].title;

  return routeName;
}
