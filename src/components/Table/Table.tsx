import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import "./index.css";

import { fuzzyFilter } from "./Table.utils";
import { ColumnVisibilitySelector } from "./ColumnVisibilitySelector";

import type { User } from "../../types/userTypes";
import { useTableData } from "./useTableData";
import { TableHeader } from "./TableHeader";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function Table() {
  const { columns, data, initialColumnVisibility, columnIds } = useTableData();
  const { t } = useTranslation();

  const defaultColumn = {
    size: 150,
    minSize: 240,
    maxSize: 600,
    enableResizing: true,
  };

  const table = useReactTable<User>({
    data,
    columns,
    columnResizeMode: "onChange",
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: { fuzzy: fuzzyFilter },
    globalFilterFn: fuzzyFilter,
    initialState: {
      columnVisibility: initialColumnVisibility,
      columnOrder: columnIds,
    },
  });

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = table
        .getState()
        .columnOrder.indexOf(active.id as string);
      const newIndex = table.getState().columnOrder.indexOf(over.id as string);

      const newOrder = arrayMove(
        table.getState().columnOrder,
        oldIndex,
        newIndex
      );
      table.setColumnOrder(newOrder);
    }
  }

  return (
    <div className="w-screen flex justify-center p-1">
      <div className="border border-gray-300 rounded-md overflow-hidden flex flex-col w-full h-[98vh]">
        <div className="flex items-center p-2 bg-white sticky top-0 left-0 z-10 border-b border-gray-300">
          <ColumnVisibilitySelector table={table} columnIds={columnIds} />
          <input
            type="text"
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="ml-2 w-[300px] px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder={t("Search")}
          />
        </div>

        <div
          ref={parentRef}
          className="flex-1 overflow-auto relative will-change-transform"
        >
          <table
            style={{
              borderCollapse: "collapse",
              minWidth: `${table.getTotalSize()}px`,
            }}
          >
            <thead
              style={{
                position: "sticky",
                top: 0,
                zIndex: 5,
                background: "white",
              }}
            >
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={table.getState().columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header, index) => (
                        <TableHeader
                          key={header.id}
                          header={header}
                          index={index}
                        />
                      ))}
                    </tr>
                  ))}
                </SortableContext>
              </DndContext>
            </thead>

            <tbody style={{ position: "relative" }}>
              <tr
                style={{
                  height: `${
                    rowVirtualizer.getVirtualItems()[0]?.start ?? 0
                  }px`,
                }}
              />

              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = table.getRowModel().rows[virtualRow.index];
                return (
                  <React.Fragment key={row.id}>
                    <tr
                      style={{
                        background: row.getIsSelected() ? "#3c3c80ff" : "white",
                        height: `${virtualRow.size}px`,
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          style={{
                            borderRight: "1px solid #eee",
                            padding: "4px 8px",
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  </React.Fragment>
                );
              })}

              <tr
                style={{
                  height: `${
                    rowVirtualizer.getTotalSize() -
                    (rowVirtualizer.getVirtualItems().at(-1)?.end ?? 0)
                  }px`,
                }}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
