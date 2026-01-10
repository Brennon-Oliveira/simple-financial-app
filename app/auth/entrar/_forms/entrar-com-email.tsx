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
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const signInCredentialsSchema = z.object({
  email: z.string({ error: "Email é obrigatório" }),
});

type SignInCredentialsSchema = z.infer<typeof signInCredentialsSchema>;

type EntrarComEmailProps = {
  trocarUltimoAcesso: () => void;
};

export function EntrarComEmail({ trocarUltimoAcesso }: EntrarComEmailProps) {
  const [isPending, setIsPending] = useState(false);

  const signInCredentialsForm = useForm({
    resolver: zodResolver(signInCredentialsSchema),
    defaultValues: {
      email: "",
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
    async ({ email }: SignInCredentialsSchema) => {
      const res = await signIn("email", {
        email,
        callbackUrl: "/",
        redirect: false,
      });

      trocarUltimoAcesso();
      redirect("/auth/verificar?provider=email");
    },
    [trocarUltimoAcesso]
  );

  return (
    <Form {...signInCredentialsForm}>
      <form
        onSubmit={handleSubmit(handleCredentialSignin)}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        {errors.root?.message && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{errors.root?.message}</AlertTitle>
          </Alert>
        )}
        <FormField
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Ex. john.due@email.xpto" {...field} />
              </FormControl>
              {fieldState.error?.message && (
                <FormMessage>{fieldState.error?.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && <Spinner />} Enviar email
        </Button>
      </form>
    </Form>
  );
}
