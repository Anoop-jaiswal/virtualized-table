import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import type { Table } from "@tanstack/react-table";
import type { User } from "../../types/userTypes";
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
  const [tempSelection, setTempSelection] = useState<string[]>([]);
  const [previousSelection, setPreviousSelection] = useState<string[]>([]);
  const currentSelection = Object.entries(table.getState().columnVisibility)
    .filter(([_, value]) => value)
    .map(([key]) => key);

  const openPopover = () => {
    setPreviousSelection(currentSelection);
    setTempSelection(currentSelection);
    setIsOpen(true);
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  const handleShowAllOrNone = (value: string) => {
    if (value === "all") {
      setTempSelection([...columnIds]);
    } else {
      setTempSelection([]);
    }
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      setTempSelection((prev) => [...prev, id]);
    } else {
      setTempSelection((prev) => prev.filter((v) => v !== id));
    }
  };

  const handleSave = () => {
    table.setColumnVisibility(
      columnIds.reduce((acc: { [id: string]: boolean }, val) => {
        acc[val] = tempSelection.includes(val);
        return acc;
      }, {})
    );
    closePopover();
  };

  const handleCancel = () => {
    table.setColumnVisibility(
      columnIds.reduce((acc: { [id: string]: boolean }, val) => {
        acc[val] = previousSelection.includes(val);
        return acc;
      }, {})
    );
    closePopover();
  };

  const isAllSelected = tempSelection.length === columnIds.length;
  const isNoneSelected = tempSelection.length === 0;

  return (
    <div className="relative inline-block text-left">
      <button
        aria-label="Show Column Visibility"
        onClick={openPopover}
        className="m-2 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 transition"
      >
        <FaFilter size={18} className="text-gray-600" />
      </button>

      {isOpen && (
        <div
          className="origin-top-left absolute left-0 mt-2 w-[600px] rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          tabIndex={-1}
        >
          <div className="p-4">
            <div className="mb-4 flex space-x-6">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="showColumns"
                  value="all"
                  checked={isAllSelected}
                  className="form-radio text-green-500"
                  onChange={() => handleShowAllOrNone("all")}
                />
                <span className="ml-2 select-none font-medium">
                  {t("ShowAll")}
                </span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="showColumns"
                  value="none"
                  checked={isNoneSelected}
                  className="form-radio text-green-500"
                  onChange={() => handleShowAllOrNone("none")}
                />
                <span className="ml-2 select-none font-medium">
                  {t("ShowNone")}
                </span>
              </label>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2 border border-gray-200 rounded-md">
              <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
                {columnIds.map((id) => (
                  <label
                    key={id}
                    className="inline-flex items-center cursor-pointer select-none hover:bg-gray-50 p-1 rounded"
                  >
                    <input
                      type="checkbox"
                      value={id}
                      checked={tempSelection.includes(id)}
                      onChange={(e) =>
                        handleCheckboxChange(id, e.target.checked)
                      }
                      className="form-checkbox text-green-500"
                    />
                    <span className="ml-2">{convertCamelToTitleCase(id)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-500 text-gray-700 text-sm rounded hover:bg-gray-200 transition"
              >
                {t("Cancel")}
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 border border-gray-500 hover:text-gray-200 text-sm rounded hover:bg-gray-700 transition"
              >
                {t("Save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
