import { OAuthNaoVinculado } from "@/app/auth/entrar/_error-cards/oauth-nao-vinculado";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { H3, P } from "@/components/ui/typography";

type PickErrorProps = {
  erro: string;
};

export function PickError({ erro }: PickErrorProps) {
  if (erro === "OAuthAccountNotLinked") {
    return <OAuthNaoVinculado />;
  }

  return (
    <Card className="flex flex-col gap-2 items-center w-full max-w-sm ">
      <CardTitle>
        <H3>Houve um erro</H3>
      </CardTitle>
      <CardContent className="flex flex-col gap-2">
        <P className="text-center">
          Ocorreu um erro ao tentar realizar seu login.
        </P>
        <P className="text-center">
          Estamos trabalhando para solucionar, por favor, tente novamente mais
          tarde
        </P>
      </CardContent>
    </Card>
  );
}
