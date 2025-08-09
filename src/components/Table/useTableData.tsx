import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { USERS } from "../../data";
import type { User } from "../../types";

const DISPLAY_COLUMN_SIZE = 100;
const MAX_CELL_CHAR = 30;
const columnHelper = createColumnHelper<User>();

export const useTableData = () => {
  const [data, setData] = useState(USERS);

  const allKeys = useMemo(
    () => (data.length ? Object.keys(data[0]) : []),
    [data]
  );

  const fieldColumns = useMemo(() => {
    return allKeys
      .filter(
        (key) => !["id", "avatar", "name", "birthDate", "age"].includes(key)
      )
      .map((key) =>
        columnHelper.accessor(key as keyof User, {
          id: key,
          header: key,
          size: DISPLAY_COLUMN_SIZE,
          cell: (info) => {
            const value = String(info.getValue() ?? "");
            const isLong = value.length > MAX_CELL_CHAR;
            return (
              <div
                className="truncate"
                title={isLong ? "Click + to view full" : undefined}
                style={{ maxWidth: "100%" }}
              >
                {isLong ? value.slice(0, MAX_CELL_CHAR) + "..." : value}
              </div>
            );
          },
        })
      );
  }, [allKeys]);

  const columns = useMemo(() => [...fieldColumns], [fieldColumns, setData]);

  const columnIds = useMemo(
    () => columns.map((col) => col.id) as string[],
    [columns]
  );

  const initialColumnVisibility = useMemo(() => {
    return columnIds.reduce((acc: Record<string, boolean>, id) => {
      acc[id] = true;
      return acc;
    }, {});
  }, [columnIds]);

  return { columns, data, initialColumnVisibility, columnIds };
};
