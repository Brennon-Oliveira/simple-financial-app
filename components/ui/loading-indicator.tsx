"use client";

import { Spinner } from "@/components/ui/spinner";
import { useLinkStatus } from "next/link";
import { ReactNode } from "react";

export default function LoadingIndicator({
  children,
}: {
  children?: ReactNode;
}) {
  const { pending } = useLinkStatus();

  return pending ? <Spinner /> : children;
  // return (

  //   <Spinner />
  //   // <span aria-hidden className={`link-hint ${pending ? "is-pending" : ""}`}>
  //   //   teste
  //   //   {pending ? "a" : "b"}
  //   // </span>
  // );
}
