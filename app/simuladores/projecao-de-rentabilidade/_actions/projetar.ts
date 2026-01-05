"use server";

import { ProjetarRentabilidadeSchema } from "@/app/simuladores/projecao-de-rentabilidade/_actions/projetar.validations";

export type ProjetarState = {
  result: {
    rentabilidadeMensal: number;
    quantidadeDeMeses: number;
    valoresPorMes: {
      valorTotal: number;
      totalAportado: number;
      totalDeJuros: number;
      mes: number;
    }[];
  } | null;
};

function calcularRentabilidadeMensal(rentabilidadeAnual: number): number {
  const fatorDeAnoParaMes = 1 / 12;
  const valorPorMes = Math.pow(1 + rentabilidadeAnual, fatorDeAnoParaMes);

  return valorPorMes - 1;
}

function calcularQuantidadeDeMeses({
  montanteFinalDesejado,
  saldoInicial,
  aportesMensais,
  rentabilidadeMensal,
}: {
  montanteFinalDesejado: number;
  saldoInicial: number;
  aportesMensais: number;
  rentabilidadeMensal: number;
}) {
  const rentabilidade = 1 + rentabilidadeMensal;
  const rentabilidadePorAportes =
    (aportesMensais / rentabilidadeMensal) * rentabilidade;

  const rentabilidadeMontante = montanteFinalDesejado + rentabilidadePorAportes;
  const rentabilidadeSaldoInicial = saldoInicial + rentabilidadePorAportes;

  const valorPreLog = rentabilidadeMontante / rentabilidadeSaldoInicial;

  const numeroDeMesesQuebrado = Math.log(valorPreLog) / Math.log(rentabilidade);

  return Math.ceil(numeroDeMesesQuebrado);
}

function calcularValoresPorMes({
  aportesMensais,
  rentabilidadeMensal,
  saldoInicial,
  quantidadeDeMeses,
}: {
  aportesMensais: number;
  rentabilidadeMensal: number;
  saldoInicial: number;
  quantidadeDeMeses: number;
}) {
  const aportesPorRentabilidade = aportesMensais / rentabilidadeMensal;
  const inicialMaisAportesPorRendimento =
    saldoInicial + aportesPorRentabilidade;
  const rentabilidadeMaisUm = 1 + rentabilidadeMensal;

  const meses = Array.from({
    length: quantidadeDeMeses,
  }).map((_, index) => {
    const mes = index + 1;
    const valorTotal =
      inicialMaisAportesPorRendimento * Math.pow(rentabilidadeMaisUm, mes) -
      aportesPorRentabilidade;

    const totalAportado = saldoInicial + mes * aportesMensais;
    const totalDeJuros = valorTotal - totalAportado;

    return {
      valorTotal,
      totalAportado,
      totalDeJuros,
      mes,
    };
  });
  return meses;
}

export async function projetar(
  prevState: ProjetarState,
  formData: ProjetarRentabilidadeSchema
): Promise<ProjetarState> {
  "use server";

  const rentabilidadeMensal = calcularRentabilidadeMensal(
    formData.rentabilidadeAnual / 100
  );

  const mesesAdicionais = formData.anosAdicionais
    ? formData.anosAdicionais * 12
    : formData.mesesAdicionais || 0;

  const montanteFinal =
    formData.montanteFinal >= formData.saldoInicial
      ? formData.montanteFinal
      : formData.saldoInicial;

  const quantidadeDeMeses = calcularQuantidadeDeMeses({
    montanteFinalDesejado: montanteFinal,
    saldoInicial: formData.saldoInicial,
    aportesMensais: formData.aportesMensais,
    rentabilidadeMensal: rentabilidadeMensal,
  });

  const valoresPorMes = calcularValoresPorMes({
    aportesMensais: formData.aportesMensais,
    rentabilidadeMensal,
    saldoInicial: formData.saldoInicial,
    quantidadeDeMeses: quantidadeDeMeses + mesesAdicionais,
  });

  return {
    result: {
      rentabilidadeMensal,
      quantidadeDeMeses,
      valoresPorMes,
    },
  };
}
