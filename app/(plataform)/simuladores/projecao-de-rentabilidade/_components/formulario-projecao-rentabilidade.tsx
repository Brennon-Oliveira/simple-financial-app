"use client";

import {
  projetarRentabilidadeSchema,
  ProjetarRentabilidadeSchema,
} from "@/app/(plataform)/simuladores/projecao-de-rentabilidade/_actions/projetar.validations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { CurrencyInput, Input, MaskInput } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Percent } from "lucide-react";
import { startTransition } from "react";
import { Controller, useForm } from "react-hook-form";

// const CURRENCY_OPTIONS: Options = {
//   prefix: "R$ ",
//   groupSeparator: ".",
//   radixPoint: ",",
//   digitsOptional: true,
//   digits: 2,
//   rightAlign: false,
// };

// const NUMERIC_OPTIONS: Options = {
//   rightAlign: false,
//   groupSeparator: ".",
//   radixPoint: ",",
//   digitsOptional: true,
//   digits: 2,
// };

export function FormularioProjecaoRentabilidade({
  projetar,
}: {
  projetar: (formData: ProjetarRentabilidadeSchema) => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(projetarRentabilidadeSchema),
    mode: "onTouched",
  });

  async function handleProjetar(data: ProjetarRentabilidadeSchema) {
    startTransition(() => {
      projetar(data);
    });
  }

  return (
    <form onSubmit={handleSubmit(handleProjetar)}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            Preencha as informações para projetar a rentabilidade
          </CardTitle>
          <CardDescription>
            A projeção vai retornar a informação completa de quanto tempo irá
            acumular determinado valor pela rentabilidade e aporte mensal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <FieldSet>
              <FieldGroup className="flex flex-row">
                <Field>
                  <FieldLabel>Montante final desejado</FieldLabel>
                  <Controller
                    control={control}
                    name="montanteFinal"
                    render={({ field: { onChange, name, value, ref } }) => (
                      <CurrencyInput
                        onChange={onChange}
                        value={value}
                        name={name}
                        ref={ref}
                        placeholder="R$ 20.000,00"
                      />
                    )}
                  />
                  <FieldError>{errors.montanteFinal?.message}</FieldError>
                </Field>
                <Field>
                  <FieldLabel>Saldo inicial</FieldLabel>
                  <Controller
                    control={control}
                    name="saldoInicial"
                    render={({ field: { onChange, name, value, ref } }) => (
                      <CurrencyInput
                        onChange={onChange}
                        value={value}
                        name={name}
                        ref={ref}
                        placeholder="R$ 10.000,00"
                      />
                    )}
                  />
                  <FieldError>{errors.saldoInicial?.message}</FieldError>
                </Field>
                <Field>
                  <FieldLabel>Aportes mensais</FieldLabel>
                  <Controller
                    control={control}
                    name="aportesMensais"
                    render={({ field: { onChange, name, value, ref } }) => (
                      <CurrencyInput
                        onChange={onChange}
                        value={value}
                        name={name}
                        ref={ref}
                        placeholder="R$ 1.500,00"
                      />
                    )}
                  />
                  <FieldError>{errors.aportesMensais?.message}</FieldError>
                </Field>
              </FieldGroup>
              <FieldGroup className="flex flex-row">
                <Field>
                  <FieldLabel>Rentabilidade anual (%)</FieldLabel>
                  <InputGroup>
                    <Controller
                      control={control}
                      name="rentabilidadeAnual"
                      render={({ field: { onChange, name, value, ref } }) => (
                        <MaskInput
                          mask={Number}
                          onChange={onChange}
                          value={value}
                          name={name}
                          ref={ref}
                          className="flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent"
                          placeholder="12%"
                          thousandsSeparator="."
                          radix=","
                          mapToRadix={["."]}
                          scale={2}
                        />
                      )}
                    />
                    <InputGroupAddon align="inline-end">
                      <Percent />
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldError>{errors.rentabilidadeAnual?.message}</FieldError>
                </Field>
                <Tabs defaultValue="porMes" className="w-full">
                  <TabsContent value="porMes">
                    <Field>
                      <FieldLabel>Meses adicionas para simular</FieldLabel>
                      <Input
                        type="number"
                        autoComplete="off"
                        placeholder="0"
                        {...register("mesesAdicionais")}
                      />
                      <FieldError>{errors.mesesAdicionais?.message}</FieldError>
                    </Field>
                  </TabsContent>
                  <TabsContent value="porAno">
                    <Field>
                      <FieldLabel>Anos adicionas para simular</FieldLabel>
                      <Input
                        type="number"
                        autoComplete="off"
                        placeholder="0"
                        {...register("anosAdicionais")}
                      />
                      <FieldError>{errors.anosAdicionais?.message}</FieldError>
                    </Field>
                  </TabsContent>
                  <TabsList>
                    <TabsTrigger
                      value="porMes"
                      onClick={() => setValue("anosAdicionais", undefined)}
                    >
                      Por mês
                    </TabsTrigger>
                    <TabsTrigger
                      value="porAno"
                      onClick={() => setValue("mesesAdicionais", undefined)}
                    >
                      Por ano
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button onClick={() => reset()} type="button" variant="outline">
            Limpar
          </Button>
          <Button disabled={!isValid} type="submit">
            Simular
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
