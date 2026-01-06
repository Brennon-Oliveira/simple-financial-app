"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { compareStrings } from "@/utils/string-compare";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Cell,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Header,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Columns3,
  GripVertical,
  RefreshCcw,
  Search,
  Trash2,
} from "lucide-react";
import {
  CSSProperties,
  Fragment,
  ReactNode,
  useCallback,
  useId,
  useState,
} from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  title?: string;
  description?: string;
  showColumns?: boolean;
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  data,
  title,
  description,
  showColumns,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((column) => column.id as string)
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    onColumnOrderChange: setColumnOrder,
    enableSortingRemoval: false,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnOrder,
      columnVisibility,
    },
  });

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);

        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          {title && <h4 className="text-lg font-semibold">{title}</h4>}
          {description && (
            <p className="text-muted-foreground text-base">{description}</p>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full max-w-3xs justify-between"
            >
              <span className="flex items-center gap-2">
                <Columns3 />
                Colunas
              </span>
              <ChevronDown className="ml-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <InputGroup>
              <InputGroupInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
                placeholder="Buscar"
                onKeyDown={(e) => e.stopPropagation()}
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                if (
                  searchQuery &&
                  !compareStrings(column.id, searchQuery, "fuzzy")
                ) {
                  return null;
                }

                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                    onSelect={(e) => e.preventDefault()}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                table.resetColumnVisibility();
                setSearchQuery("");
              }}
            >
              <RefreshCcw /> Restaurar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <DndContext
          id={useId()}
          collisionDetection={closestCenter}
          modifiers={[restrictToHorizontalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <Table
            className="table-fixed min-w-full"
            style={{
              width: table.getCenterTotalSize(),
            }}
          >
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <SortableContext
                    items={columnOrder}
                    strategy={horizontalListSortingStrategy}
                  >
                    {headerGroup.headers.map((header) =>
                      header.isPlaceholder ? null : (
                        <Fragment key={header.id}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </Fragment>
                      )
                    )}
                  </SortableContext>
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <SortableContext
                        key={cell.id}
                        items={columnOrder}
                        strategy={horizontalListSortingStrategy}
                      >
                        <DragAlongCell cell={cell} />
                      </SortableContext>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Nenhum resultado encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>
    </div>
  );
}

type DataTableHeaderProps<TData, TValue> = {
  sortable?: boolean;
  draggable?: boolean;
  header: Header<TData, TValue>;
  children: ReactNode;
};

function DataTableHeader<TData, TValue>({
  sortable,
  draggable,
  header,
  children,
}: DataTableHeaderProps<TData, TValue>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: header.column.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition,
    whiteSpace: "nowrap",
    width: header.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <TableHead
      ref={setNodeRef}
      className={`group/head before:bg-border relative h-10 border-t before:absolute before:inset-y-0 before:left-0 before:w-px first:before:bg-transparent ${
        header.column.getCanResize()
          ? "select-none last:[&>.cursor-col-resize]:opacity-0"
          : ""
      }`}
      colSpan={header.colSpan}
      style={style}
      // {...{
      //   colSpan: header.colSpan,
      //   style: {
      //     ...style,
      //     width: header.getSize(),
      //   },
      // }}
    >
      <div className="flex items-center justify-start gap-0.5 w-full truncate">
        {draggable && (
          <Button
            size="icon"
            variant="ghost"
            className="size-7"
            {...attributes}
            {...listeners}
            aria-label="Arraste para reordenar"
          >
            <GripVertical className="opacity-60" aria-hidden="true" />
          </Button>
        )}
        {sortable ? (
          <ButtonGroup className="w-full">
            <Button
              variant={header.column.getIsSorted() ? "secondary" : "ghost"}
              className="p-0"
              onClick={() =>
                header.column.toggleSorting(
                  header.column.getIsSorted() === "asc"
                )
              }
            >
              {children}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            {header.column.getIsSorted() && (
              <Button
                variant="outline"
                onClick={() => header.column.clearSorting()}
              >
                <Trash2 />
              </Button>
            )}
          </ButtonGroup>
        ) : (
          <div className="px-4 py-2">{children}</div>
        )}
      </div>
      {header.column.getCanResize() && (
        <div
          onDoubleClick={() => header.column.resetSize()}
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className="group-last/head:hidden absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:translate-x-px"
        />
      )}
    </TableHead>
  );
}

type DragAlongCellProps<TData, TValue> = {
  cell: Cell<TData, TValue>;
};

function DragAlongCell<TData, TValue>({
  cell,
}: DragAlongCellProps<TData, TValue>) {
  const { isDragging, setNodeRef, transform, transition } = useSortable({
    id: cell.column.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition,
    width: cell.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <TableCell ref={setNodeRef} className="truncate" style={style}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
}

// type DraggableTableHeaderProp<TData, TValue> = {
//   header: Header<TData, TValue>;
// };

// function DraggableTableHeader<TData, TValue>({
//   header,
// }: DraggableTableHeaderProp<TData, TValue>) {
//   const {
//     attributes,
//     isDragging,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//   } = useSortable({
//     id: header.column.id,
//   });

//   const style: CSSProperties = {
//     opacity: isDragging ? 0.8 : 1,
//     position: "relative",
//     transform: CSS.Translate.toString(transform),
//     transition,
//     whiteSpace: "nowrap",
//     width: header.column.getSize(),
//     zIndex: isDragging ? 1 : 0,
//   };

//   return (

//   );
// }

export { DataTable, DataTableHeader };
