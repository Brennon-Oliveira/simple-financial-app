import { isString } from "@/utils/type-check";
import { z } from "zod";

export function parsePercentToNumber(value: unknown): number {
  if (!isString(value)) return NaN;

  const onlyDigitsAndSeparators = value.replace(/[^\d,.]/g, "");
  const normalized = onlyDigitsAndSeparators.replace(",", ".");
  return Number(normalized);
}

export const zPercent = (
  invalidFormatMessage: string,
  requiredMessage?: string
) =>
  z.string().transform((val, ctx) => {
    const parsed = parsePercentToNumber(val);

    if (Number.isNaN(parsed)) {
      ctx.addIssue({
        code: "custom",
        message: invalidFormatMessage,
      });
      return z.NEVER;
    }

    if (requiredMessage && !parsed) {
      ctx.addIssue({
        code: "custom",
        message: requiredMessage,
      });
      return z.NEVER;
    }

    return parsed;
  });
