import * as React from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";
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
      <MaskInput
        mask="R$ num"
        inputRef={ref}
        blocks={{
          // @ts-expect-error - Erro avulso de tipo da mascara
          num: {
            mask: Number,
            thousandsSeparator: ".",
            radix: ",",
            mapToRadix: [","],
            scale: 2,
            padFractionalZeros: true,
            normalizeZeros: true,
            min: 0,
            format: (value: string) => value.replace(/[.]/g, ""),
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

type PasswordInputProps = React.ComponentProps<"input"> & {
  className?: string;
  defaultVisibility?: boolean;
};
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, defaultVisibility, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState<boolean>(
      defaultVisibility ?? false
    );

    const visibleText = !isVisible ? "Mostrar senha" : "Esconder senha";

    return (
      <InputGroup className={cn("", className)}>
        <InputGroupInput
          ref={ref}
          type={!isVisible ? "password" : "text"}
          {...props}
        />
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton
                size="icon-xs"
                className="rounded-full"
                title={visibleText}
                onClick={() => setIsVisible((current) => !current)}
              >
                {!isVisible ? <EyeClosed /> : <Eye />}
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>{visibleText}</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

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

export { CurrencyInput, Input, MaskInput, PasswordInput };
