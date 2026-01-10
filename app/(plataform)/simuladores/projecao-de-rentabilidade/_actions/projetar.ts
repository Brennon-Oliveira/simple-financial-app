"use server";

import { ProjetarRentabilidadeSchema } from "@/app/(plataform)/simuladores/projecao-de-rentabilidade/_actions/projetar.validations";

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

  const normalizedFormData: Required<ProjetarRentabilidadeSchema> = {
    montanteFinal: formData.montanteFinal || 0,
    saldoInicial: formData.saldoInicial || 0,
    aportesMensais: formData.aportesMensais || 0,
    rentabilidadeAnual: formData.rentabilidadeAnual,
    mesesAdicionais: formData.mesesAdicionais || 0,
    anosAdicionais: formData.anosAdicionais || 0,
  };

  const rentabilidadeMensal = calcularRentabilidadeMensal(
    normalizedFormData.rentabilidadeAnual / 100
  );

  const mesesAdicionais = normalizedFormData.anosAdicionais
    ? normalizedFormData.anosAdicionais * 12
    : normalizedFormData.mesesAdicionais || 0;

  const montanteFinal =
    normalizedFormData.montanteFinal >= normalizedFormData.saldoInicial
      ? normalizedFormData.montanteFinal
      : normalizedFormData.saldoInicial;

  const quantidadeDeMeses = calcularQuantidadeDeMeses({
    montanteFinalDesejado: montanteFinal,
    saldoInicial: normalizedFormData.saldoInicial,
    aportesMensais: normalizedFormData.aportesMensais,
    rentabilidadeMensal: rentabilidadeMensal,
  });

  const valoresPorMes = calcularValoresPorMes({
    aportesMensais: normalizedFormData.aportesMensais,
    rentabilidadeMensal,
    saldoInicial: normalizedFormData.saldoInicial,
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
