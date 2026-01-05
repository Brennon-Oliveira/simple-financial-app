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

export const zCurrencyBR = (
  invalidFormatMessage: string,
  requiredMessage?: string
) =>
  z.string().transform((val, ctx) => {
    const parsed = parseBRLToNumber(val);

    if (Number.isNaN(parsed)) {
      ctx.addIssue({
        code: "custom",
        message: invalidFormatMessage,
      });
      return z.NEVER;
    }

    if (requiredMessage && !parsed && parsed !== 0) {
      ctx.addIssue({
        code: "custom",
        message: requiredMessage,
      });
      return z.NEVER;
    }

    return parsed;
  });
