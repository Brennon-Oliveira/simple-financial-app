import * as React from "react";

import { cn } from "@/lib/utils";
import { IMaskInput } from "react-imask";

const INPUT_STYLES = cn(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
);

type IMaskProps = React.ComponentProps<typeof IMaskInput>;

type MaskInputProps = IMaskProps & {
  className?: string;
  onChange: (value: string) => void;
};

// type MaskInputProps = Omit<IMaskProps, "onChage" | "className"> & {
//   className?: string;
//   onChange: (value: string) => void;
// };

const MaskInput = React.forwardRef<HTMLInputElement, MaskInputProps>(
  ({ className, onChange, ...props }, ref) => {
    return (
      <IMaskInput
        className={cn(INPUT_STYLES, className)}
        inputRef={ref}
        onAccept={(value: string) => {
          onChange(value);
        }}
        {...props}
      />
    );
  }
);
MaskInput.displayName = "MaskInput";

const CurrencyInput = React.forwardRef<HTMLInputElement, MaskInputProps>(
  (props, ref) => {
    return (
      // @ts-expect-error - Erro avulso de tipo da mascara
      <MaskInput
        mask="R$ num"
        inputRef={ref}
        blocks={{
          num: {
            mask: Number,
            thousandsSeparator: ".",
            radix: ",",
            mapToRadix: ["."],
            scale: 2,
            padFractionalZeros: true,
            normalizeZeros: true,
            min: 0,
          },
        }}
        lazy={true}
        unmask={false}
        {...props}
      />
    );
  }
);
CurrencyInput.displayName = "CurrencyInput";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(INPUT_STYLES, className)}
      {...props}
    />
  );
}

export { CurrencyInput, Input, MaskInput };
