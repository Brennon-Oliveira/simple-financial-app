import { zCurrencyBR } from "@/utils/parse-brl-to-number";
import { zPercent } from "@/utils/parse-percent-to-number";
import { z } from "zod";

export const projetarRentabilidadeSchema = z.object({
  montanteFinal: zCurrencyBR,
  saldoInicial: zCurrencyBR,
  aportesMensais: zCurrencyBR,
  rentabilidadeAnual: zPercent,
  mesesAdicionais: z.coerce.number(),
});

export type ProjetarRentabilidadeSchema = z.infer<
  typeof projetarRentabilidadeSchema
>;
