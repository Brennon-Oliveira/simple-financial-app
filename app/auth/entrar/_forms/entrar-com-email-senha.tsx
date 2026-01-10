import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, PasswordInput } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const signInCredentialsSchema = z.object({
  username: z.string({ error: "Nome de usuário é obrigatório" }),
  password: z.string({ error: "Senha é obrigatória" }),
});

type SignInCredentialsSchema = z.infer<typeof signInCredentialsSchema>;

type EntrarComEmailESenhaProps = {
  trocarUltimoAcesso: () => void;
};

export function EntrarComEmailESenha({
  trocarUltimoAcesso,
}: EntrarComEmailESenhaProps) {
  const [isPending, setIsPending] = useState(false);

  const signInCredentialsForm = useForm({
    resolver: zodResolver(signInCredentialsSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onTouched",
  });
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = signInCredentialsForm;
  const handleCredentialSignin = useCallback(
    async ({ username, password }: SignInCredentialsSchema) => {
      setIsPending(true);
      const res = await signIn("credentials", {
        username: username,
        password: password,
        callbackUrl: "/",
        redirect: false,
      });
      if (res?.status === 401) {
        setError("root", {
          message: "Usuário ou senha incorretos.",
        });
        setIsPending(false);
        return;
      }

      trocarUltimoAcesso();
      redirect("/");
    },
    [setError, trocarUltimoAcesso]
  );

  return (
    <Form {...signInCredentialsForm}>
      <form
        onSubmit={handleSubmit(handleCredentialSignin)}
        className="flex flex-col gap-4 w-full"
      >
        {errors.root?.message && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{errors.root?.message}</AlertTitle>
          </Alert>
        )}
        <FormField
          control={control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Ex. john.due" {...field} />
              </FormControl>
              {fieldState.error?.message && (
                <FormMessage>{fieldState.error?.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Senha" {...field} />
              </FormControl>
              {fieldState.error?.message && (
                <FormMessage>{fieldState.error?.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <Button disabled={isPending}>{isPending && <Spinner />} Entrar</Button>
      </form>
    </Form>
  );
}
