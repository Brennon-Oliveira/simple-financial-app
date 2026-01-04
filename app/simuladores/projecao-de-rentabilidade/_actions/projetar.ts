"use server";

import { ProjetarRentabilidadeSchema } from "@/app/simuladores/projecao-de-rentabilidade/_actions/projetar.validations";

type State = { resultado: string | null };

export async function projetar(
  prevState: State,
  formData: ProjetarRentabilidadeSchema
): Promise<State> {
  "use server";
  console.log(formData);

  return {
    resultado: JSON.stringify(formData),
  };
}
