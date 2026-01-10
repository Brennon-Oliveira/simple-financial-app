import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

interface PProps extends ComponentProps<"p"> {
  children: ReactNode;
}

export function P({ children, className, ...props }: PProps) {
  return (
    <p {...props} className={cn("leading-7", className)}>
      {children}
    </p>
  );
}

interface H1Props extends ComponentProps<"h1"> {
  children: ReactNode;
}

export function H1({ children, className, ...props }: H1Props) {
  return (
    <h1
      {...props}
      className={cn(
        "scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance",
        className
      )}
    >
      {children}
    </h1>
  );
}

interface H2Props extends ComponentProps<"h2"> {
  children: ReactNode;
}

export function H2({ children, className, ...props }: H2Props) {
  return (
    <h2
      {...props}
      className={cn(
        "scroll-m-20 text-center text-2xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

interface H3Props extends ComponentProps<"h3"> {
  children: ReactNode;
}

export function H3({ children, className, ...props }: H3Props) {
  return (
    <h3
      {...props}
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

interface H4Props extends ComponentProps<"h4"> {
  children: ReactNode;
}

export function H4({ children, className, ...props }: H4Props) {
  return (
    <h4
      {...props}
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
}

interface SmallProps extends ComponentProps<"small"> {
  children: ReactNode;
}

export function Small({ children, className, ...props }: SmallProps) {
  return (
    <small
      {...props}
      className={cn("text-sm leading-none font-medium", className)}
    >
      {children}
    </small>
  );
}

interface MutedProps extends ComponentProps<"p"> {
  children: ReactNode;
}

export function Muted({ children, className, ...props }: MutedProps) {
  return (
    <p {...props} className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}
