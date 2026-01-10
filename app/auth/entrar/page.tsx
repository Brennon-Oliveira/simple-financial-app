"use client"; // Required for client-side functionality in App Router

import { EntrarComEmail } from "@/app/auth/entrar/_forms/entrar-com-email";
import { EntrarComEmailESenha } from "@/app/auth/entrar/_forms/entrar-com-email-senha";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { H3, Muted, P } from "@/components/ui/typography";
import { BuiltInProviderType } from "next-auth/providers/index";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { getProviders } from "next-auth/react";
import { ReactNode, useCallback, useEffect, useState } from "react";

const LAST_USED_PROVIDER_LOCALSTORAGE_KEY = "sfa@last_used_auth_provider";

export default function SignInPage() {
  const [currentProvider, setCurrentProvider] =
    useState<LiteralUnion<BuiltInProviderType, string>>("credentials");
  const [lastUsedProvider, setLastUsedProvider] = useState<LiteralUnion<
    BuiltInProviderType,
    string
  > | null>(localStorage.getItem(LAST_USED_PROVIDER_LOCALSTORAGE_KEY) ?? null);
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  useEffect(() => {}, [currentProvider]);

  const trocarUltimoAcesso = useCallback(
    (provider: LiteralUnion<BuiltInProviderType, string>) => {
      localStorage.setItem(LAST_USED_PROVIDER_LOCALSTORAGE_KEY, provider);
    },
    []
  );

  const providerForms: Partial<{
    [key in LiteralUnion<BuiltInProviderType, string>]: ReactNode;
  }> = {
    credentials: (
      <EntrarComEmailESenha
        trocarUltimoAcesso={() => {
          trocarUltimoAcesso("credentials");
        }}
      />
    ),
    email: (
      <EntrarComEmail
        trocarUltimoAcesso={() => {
          trocarUltimoAcesso("email");
        }}
      />
    ),
  };

  if (!providers) {
    return (
      <div className="flex flex-col gap-2 items-center w-full max-w-sm mx-auto h-full justify-center">
        <H3>Simple Financial App</H3>
        <P>Carregando, aguarde...</P>
        <Progress indeterminate value={30} />
      </div>
    );
  }

  const providersValues = Object.values(providers);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-sm">
        <h1 className="text-2xl mb-4">Entre em sua conta!</h1>
        {providerForms[currentProvider]}
        {providersValues.length > 0 && <Separator />}
        {providersValues.map(
          (provider) =>
            provider.id !== currentProvider && (
              <div key={provider.name} className="mb-2 w-full">
                <Button
                  variant="outline"
                  onClick={() => setCurrentProvider(provider.id)}
                  className="p-2 bg-blue-500 w-full text-white rounded hover:bg-blue-600"
                >
                  Continuar com {provider.name}{" "}
                  {lastUsedProvider === provider.id && (
                    <Muted>Último acesso</Muted>
                  )}
                </Button>
              </div>
            )
        )}
      </div>
    </section>
  );
}
