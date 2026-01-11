import { Progress } from "@/components/ui/progress";
import { H3, P } from "@/components/ui/typography";

export function LoadingScreen() {
  return (
    <div className="flex flex-col gap-2 items-center w-full max-w-sm mx-auto h-full justify-center">
      <H3>Simple Financial App</H3>
      <P>Carregando, aguarde...</P>
      <Progress indeterminate value={30} />
    </div>
  );
}
