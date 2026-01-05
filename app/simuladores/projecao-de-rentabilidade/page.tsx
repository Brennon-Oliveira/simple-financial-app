"use client";

import {
  projetar,
  ProjetarState,
} from "@/app/simuladores/projecao-de-rentabilidade/_actions/projetar";
import { FormularioProjecaoRentabilidade } from "@/app/simuladores/projecao-de-rentabilidade/_components/formulario-projecao-rentabilidade";
import { ResultadoProjecaoRentabilidade } from "@/app/simuladores/projecao-de-rentabilidade/_components/resultado-projecao-rentabilidade";
import { useActionState } from "react";

const initialState: ProjetarState = {
  result: null,
};

type Props = {
  action: (
    prevState: ProjetarState,
    formData: FormData
  ) => Promise<ProjetarState> | ProjetarState;
};

export default function ProjecaoDeRentabilidadePage() {
  const [state, formAction] = useActionState(projetar, initialState);

  return (
    <section>
      <FormularioProjecaoRentabilidade projetar={formAction} />
      {state.result && <ResultadoProjecaoRentabilidade {...state.result} />}
    </section>
  );
}
