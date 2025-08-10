import type { Table } from "@tanstack/react-table";
import type { User } from "./userTypes";

export type ColumnSelector = {
  table: Table<User>;
  columnIds: string[];
};
