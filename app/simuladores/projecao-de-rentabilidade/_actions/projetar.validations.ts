import { zCurrencyBR } from "@/utils/parse-brl-to-number";
import { zPercent } from "@/utils/parse-percent-to-number";
import { z } from "zod";

export const projetarRentabilidadeSchema = z.object({
  montanteFinal: zCurrencyBR(
    "Montante final precisa estar num formato válido",
    "Montante final é obrigatório"
  ),
  saldoInicial: zCurrencyBR(
    "Saldo inicial precisa estar num formato válido",
    "Saldo inicial é obrigatório"
  ),
  aportesMensais: zCurrencyBR(
    "Aportes mensais precisa estar num formato válido",
    "Aportes mensais é obrigatório"
  ),
  rentabilidadeAnual: zPercent(
    "Rentabilidade anual precisa estar num formato válido",
    "Rentabilidade anual é obrigatório"
  ),
  mesesAdicionais: z.coerce.number().optional(),
  anosAdicionais: z.coerce.number().optional(),
});

export type ProjetarRentabilidadeSchema = z.infer<
  typeof projetarRentabilidadeSchema
>;
