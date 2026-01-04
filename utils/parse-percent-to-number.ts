import { isString } from "@/utils/type-check";
import { z } from "zod";

export function parsePercentToNumber(value: unknown): number {
  if (!isString(value)) return NaN;

  const onlyDigitsAndSeparators = value.replace(/[^\d,.%-]/g, "");
  const normalized = onlyDigitsAndSeparators.replace(",", ".");
  return Number(normalized);
}

export const zPercent = z.preprocess(
  (val) => parsePercentToNumber(val),
  z.number()
);
