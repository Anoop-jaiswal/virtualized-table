import { useState } from "react";
import { FaFilter } from "react-icons/fa";

import type { Table } from "@tanstack/react-table";
import type { User } from "../../types";
import { convertCamelToTitleCase } from "./Table.utils";
import { t } from "i18next";

interface ColumnSelector {
  table: Table<User>;
  columnIds: string[];
}

export const ColumnVisibilitySelector = ({
  table,
  columnIds,
}: ColumnSelector) => {
  const [isOpen, setIsOpen] = useState(false);

  const columnVisibilityCheckboxState = Object.entries(
    table.getState().columnVisibility
  )
    .filter(([_, value]) => value)
    .map(([key]) => key);

  const togglePopover = () => setIsOpen(!isOpen);

  const handleShowAllOrNone = (value: string) => {
    table.setColumnVisibility(
      columnIds.reduce((acc: { [id: string]: boolean }, val) => {
        acc[val] = value === "all";
        return acc;
      }, {})
    );
  };

  const handleCheckboxChange = (selectedOptions: string[]) => {
    table.setColumnVisibility(
      columnIds.reduce((acc: { [id: string]: boolean }, val) => {
        acc[val] = selectedOptions.includes(val);
        return acc;
      }, {})
    );
  };

  return (
    <div className="relative inline-block text-left shadow-2xl">
      <button
        aria-label="Show Column Visibility"
        onClick={togglePopover}
        className="m-2 p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
      >
        <FaFilter size={20} />
      </button>

      {isOpen && (
        <div
          className="origin-top-left absolute left-0 mt-2 w-[600px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setIsOpen(false);
            }
          }}
          tabIndex={-1}
        >
          <div className="p-4">
            <div className="mb-3 flex space-x-6">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="showColumns"
                  value="all"
                  defaultChecked
                  className="form-radio text-green-500"
                  onChange={() => handleShowAllOrNone("all")}
                />
                <span className="ml-2 select-none">{t("ShowAll")}</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="showColumns"
                  value="none"
                  className="form-radio text-green-500"
                  onChange={() => handleShowAllOrNone("none")}
                />
                <span className="ml-2 select-none">{t("ShowNone")}</span>
              </label>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-1 border border-gray-200 rounded">
              <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
                {columnIds.map((id) => (
                  <label
                    key={id}
                    className="inline-flex items-center cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      value={id}
                      checked={columnVisibilityCheckboxState.includes(id)}
                      onChange={(e) => {
                        let newSelection: string[];
                        if (e.target.checked) {
                          newSelection = [...columnVisibilityCheckboxState, id];
                        } else {
                          newSelection = columnVisibilityCheckboxState.filter(
                            (v) => v !== id
                          );
                        }
                        handleCheckboxChange(newSelection);
                      }}
                      className="form-checkbox text-green-500"
                    />
                    <span className="ml-2">{convertCamelToTitleCase(id)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
