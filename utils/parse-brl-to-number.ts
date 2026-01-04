import { isString } from "@/utils/type-check";
import { z } from "zod";

export function parseBRLToNumber(value: unknown): number {
  if (!isString(value)) return NaN;

  const onlyDigitsAndSeparators = value.replace(/[^\d,.-]/g, "");
  const normalized = onlyDigitsAndSeparators
    .replace(/\./g, "")
    .replace(",", ".");

  return Number(normalized);
}

export const zCurrencyBR = z.preprocess(
  (val) => parseBRLToNumber(val),
  z.number()
);
