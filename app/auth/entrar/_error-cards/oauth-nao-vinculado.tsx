import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { H3, P } from "@/components/ui/typography";

export function OAuthNaoVinculado() {
  return (
    <Card className="flex flex-col gap-2 items-center w-full max-w-sm ">
      <CardTitle>
        <H3>Acesso negado</H3>
      </CardTitle>
      <CardContent className="flex flex-col gap-2">
        <P className="text-center">
          Sua conta ainda não está vinculada com essa forma de autenticação
        </P>
        <P className="text-center">
          Por favor, selecione um forma de login já cadastra, e vincule sua
          conta pela plataforma
        </P>
      </CardContent>
    </Card>
  );
}
