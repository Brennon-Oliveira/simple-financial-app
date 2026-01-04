"use client";

import { projetar } from "@/app/simuladores/projecao-de-rentabilidade/_actions/projetar";
import { FormularioProjecaoRentabilidade } from "@/app/simuladores/projecao-de-rentabilidade/_components/formulario-projecao-rentabilidade";
import { useActionState } from "react";

type State = { resultado: string | null };

const initialState: State = {
  resultado: null,
};

type Props = {
  action: (prevState: State, formData: FormData) => Promise<State> | State;
};

export default function ProjecaoDeRentabilidadePage() {
  const [state, formAction] = useActionState(projetar, initialState);

  return (
    <section>
      <FormularioProjecaoRentabilidade projetar={formAction} />
      <h1>Projeção de retanbilidade</h1>
      {state.resultado ?? <code>{state.resultado}</code>}
    </section>
  );
}
