import { DataTable, DataTableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback } from "react";

type ValorMes = {
  valorTotal: number;
  totalAportado: number;
  totalDeJuros: number;
  mes: number;
};

type Props = {
  rentabilidadeMensal: number;
  quantidadeDeMeses: number;
  valoresPorMes: ValorMes[];
};

const columns: ColumnDef<ValorMes>[] = [
  {
    id: "Mês",
    accessorKey: "Mês",
    cell: ({ row }) => <>Mês {row.original.mes}</>,
    header: ({ header }) => (
      <DataTableHeader header={header} sortable draggable>
        {header.id}
      </DataTableHeader>
    ),
    enableResizing: true,
  },
  {
    id: "Valor total",
    accessorKey: "Valor total",
    cell: ({ row }) => (
      <>
        {row.original.valorTotal.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </>
    ),
    header: ({ header }) => (
      <DataTableHeader header={header} sortable draggable>
        {header.id}
      </DataTableHeader>
    ),
    enableResizing: true,
  },
  {
    id: "Total aportado",
    accessorKey: "Total aportado",
    cell: ({ row }) => (
      <>
        {row.original.totalAportado.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </>
    ),
    header: ({ header }) => (
      <DataTableHeader header={header} draggable>
        {header.id}
      </DataTableHeader>
    ),
    enableResizing: true,
  },
  {
    id: "Total de juros",
    accessorKey: "Total de juros",
    cell: ({ row }) => (
      <>
        {row.original.totalDeJuros.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </>
    ),
    header: ({ header }) => (
      <DataTableHeader header={header} draggable>
        {header.id}
      </DataTableHeader>
    ),
    enableResizing: true,
  },
];

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

      <DataTable
        columns={columns}
        data={valoresPorMes}
        title="Projeção para cada mês"
        showColumns
      />
    </section>
  );
}
