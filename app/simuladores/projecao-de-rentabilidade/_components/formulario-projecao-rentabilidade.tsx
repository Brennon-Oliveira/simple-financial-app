"use client";

import {
  projetarRentabilidadeSchema,
  ProjetarRentabilidadeSchema,
} from "@/app/simuladores/projecao-de-rentabilidade/_actions/projetar.validations";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { z } from "zod";

type ProjetarRentabilidadeInput = z.input<typeof projetarRentabilidadeSchema>;
type ProjetarRentabilidadeOutput = z.output<typeof projetarRentabilidadeSchema>;

export function FormularioProjecaoRentabilidade({
  projetar,
}: {
  projetar: (formData: ProjetarRentabilidadeSchema) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm<ProjetarRentabilidadeInput, unknown, ProjetarRentabilidadeOutput>(
    {
      resolver: zodResolver(projetarRentabilidadeSchema),
      mode: "onTouched",
    }
  );
  const registerWithMask = useHookFormMask(register);

  async function handleProjetar(data: ProjetarRentabilidadeSchema) {
    const res = await projetar(data);
    console.log(res);
  }

  return (
    <form onSubmit={handleSubmit(handleProjetar)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>
            Preencha as informações para projetar a rentabilidade
          </FieldLegend>
          <FieldDescription>
            A projeção vai retornar a informação completa de quanto tempo irá
            acumular determinado valor pela rentabilidade e aporte mensal
          </FieldDescription>
          <FieldGroup className="flex flex-row">
            <Field>
              <FieldLabel>Montante final desejado</FieldLabel>
              <Input
                type="text"
                autoComplete="off"
                placeholder="R$ 20.000,00"
                required
                {...registerWithMask("montanteFinal", "currency", {
                  prefix: "R$ ",
                  groupSeparator: ".",
                  radixPoint: ",",
                  digitsOptional: true,
                  digits: 2,
                  rightAlign: false,
                })}
              />
            </Field>
            <Field>
              <FieldLabel>Saldo inicial</FieldLabel>
              <Input
                type="text"
                autoComplete="off"
                placeholder="R$ 10.000,00"
                {...registerWithMask("saldoInicial", "currency", {
                  prefix: "R$ ",
                  groupSeparator: ".",
                  radixPoint: ",",
                  digitsOptional: true,
                  digits: 2,
                  rightAlign: false,
                })}
              />
            </Field>
            <Field>
              <FieldLabel>Aportes mensais</FieldLabel>
              <Input
                type="text"
                autoComplete="off"
                placeholder="R$ 1.500,00"
                {...registerWithMask("aportesMensais", "currency", {
                  prefix: "R$ ",
                  groupSeparator: ".",
                  radixPoint: ",",
                  digitsOptional: true,
                  digits: 2,
                  rightAlign: false,
                })}
              />
            </Field>
          </FieldGroup>
          <FieldGroup className="flex flex-row">
            <Field>
              <FieldLabel>Rentabilidade anual (%)</FieldLabel>
              <Input
                type="text"
                autoComplete="off"
                placeholder="12%"
                {...registerWithMask("rentabilidadeAnual", "percentage", {
                  rightAlign: false,
                })}
              />
            </Field>
            <Field>
              <FieldLabel>Meses adicionas para simular</FieldLabel>
              <Input
                type="text"
                autoComplete="off"
                placeholder="0"
                {...registerWithMask("mesesAdicionais", "numeric", {
                  rightAlign: false,
                })}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <Field orientation="horizontal">
          <Button disabled={!isValid} type="submit">
            Simular
          </Button>
        </Field>
      </FieldGroup>
      <code>
        valid: {!isValid}
        valores: {errors.montanteFinal?.message}
      </code>
    </form>
  );
}
