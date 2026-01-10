import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { H3, P } from "@/components/ui/typography";
import { signIn } from "next-auth/react";

export function LinkInvalidoPage() {
  return (
    <Card className="flex flex-col gap-2 items-center w-full max-w-sm ">
      <CardTitle>
        <H3>Acesse negado</H3>
      </CardTitle>
      <CardContent className="flex flex-col gap-2">
        <P className="text-center">O link de acesso não é mais válido.</P>
        <P className="text-center">
          O link pode já ter sido usado, ou ter expirado.
        </P>
      </CardContent>
      <Button variant="outline" onClick={() => signIn()}>
        Voltar para login
      </Button>
    </Card>
  );
}
