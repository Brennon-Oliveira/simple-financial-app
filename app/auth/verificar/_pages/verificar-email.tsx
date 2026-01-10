import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { H3, P } from "@/components/ui/typography";
import { signIn } from "next-auth/react";

export function VerificarEmailPage() {
  return (
    <Card className="flex flex-col gap-2 items-center w-full max-w-sm ">
      <CardTitle>
        <H3>Verifique seu email</H3>
      </CardTitle>
      <CardContent className="flex flex-col gap-2">
        <P className="text-center">
          Um link de acesso foi enviado para sua caixa de email.
        </P>
      </CardContent>
      <Button variant="outline" onClick={() => signIn()}>
        Voltar para login
      </Button>
    </Card>
  );
}
