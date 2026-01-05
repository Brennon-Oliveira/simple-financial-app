import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCallback } from "react";

type Props = {
  rentabilidadeMensal: number;
  quantidadeDeMeses: number;
  valoresPorMes: {
    valorTotal: number;
    totalAportado: number;
    totalDeJuros: number;
    mes: number;
  }[];
};

export function ResultadoProjecaoRentabilidade({
  quantidadeDeMeses,
  rentabilidadeMensal,
  valoresPorMes,
}: Props) {
  const quantidadeDeAnos = useCallback((quantidadeDeMeses: number) => {
    if (quantidadeDeMeses < 12) {
      return <></>;
    }
    const anosRedondos = Math.floor(quantidadeDeMeses / 12);

    return (
      <b>
        ({anosRedondos} anos
        {quantidadeDeMeses % 12 !== 0 && (
          <> e {quantidadeDeMeses - anosRedondos * 12} meses</>
        )}
        )
      </b>
    );
  }, []);

  return (
    <section className="flex flex-col gap-3 px-2 p-4">
      <h2 className="text-xl">Projeção de rentabilidade</h2>
      {!!quantidadeDeMeses && (
        <p>
          Quantidade de meses para atingir o objetivo:{" "}
          <b>{quantidadeDeMeses}</b> meses {quantidadeDeAnos(quantidadeDeMeses)}{" "}
          a uma rentabilidade de{" "}
          <b>{(rentabilidadeMensal * 100).toFixed(2)}%</b> por mês
        </p>
      )}

      <Table>
        <TableCaption>Projeção para cada mês</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Mês</TableHead>
            <TableHead>Valor total</TableHead>
            <TableHead>Total aportado</TableHead>
            <TableHead>Total de juros</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {valoresPorMes.map((valoresMes) => (
            <TableRow key={valoresMes.mes}>
              <TableCell className="font-medium">
                Mês {valoresMes.mes}
              </TableCell>
              <TableCell>
                {valoresMes.valorTotal.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell>
                {valoresMes.totalAportado.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell>
                {valoresMes.totalDeJuros.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
