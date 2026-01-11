"use client";
import { Button } from "@/components/ui/button";
import { H3 } from "@/components/ui/typography";
import { signIn } from "next-auth/react";

export default function SegurancaPage() {
  function teste() {
    signIn("google");
  }
  return (
    <div>
      <H3>Segurança</H3>
      <Button onClick={() => teste()}>Vincular conta Google</Button>
    </div>
  );
}
