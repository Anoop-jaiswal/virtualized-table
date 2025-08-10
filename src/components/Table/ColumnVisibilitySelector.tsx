import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { convertCamelToTitleCase } from "./Table.utils";
import { t } from "i18next";
import { Popover, Button, Input } from "../UI";
import type { ColumnSelector } from "../../types/columnSelectorTypes";

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

  const closePopover = () => setIsOpen(false);

  const handleShowAllOrNone = (value: string) => {
    setTempSelection(value === "all" ? [...columnIds] : []);
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setTempSelection((prev) =>
      checked ? [...prev, id] : prev.filter((v) => v !== id)
    );
  };

  const handleSave = () => {
    table.setColumnVisibility(
      columnIds.reduce((acc, val) => {
        acc[val] = tempSelection.includes(val);
        return acc;
      }, {} as { [id: string]: boolean })
    );
    closePopover();
  };

  const handleCancel = () => {
    table.setColumnVisibility(
      columnIds.reduce((acc, val) => {
        acc[val] = previousSelection.includes(val);
        return acc;
      }, {} as { [id: string]: boolean })
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

      <Popover isOpen={isOpen} onClose={closePopover}>
        <div className="p-4">
          <div className="mb-4 flex space-x-6">
            <Input
              type="radio"
              name="showColumns"
              value="all"
              checked={isAllSelected}
              label={t("ShowAll")}
              onChange={() => handleShowAllOrNone("all")}
            />
            <Input
              type="radio"
              name="showColumns"
              value="none"
              checked={isNoneSelected}
              label={t("ShowNone")}
              onChange={() => handleShowAllOrNone("none")}
            />
          </div>

          <div className="max-h-[300px] overflow-y-auto p-2 border border-gray-200 rounded-md">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
              {columnIds.map((id) => (
                <Input
                  key={id}
                  type="checkbox"
                  value={id}
                  checked={tempSelection.includes(id)}
                  label={convertCamelToTitleCase(id)}
                  onChange={(e) => handleCheckboxChange(id, e.target.checked)}
                  wrapperClassName="hover:bg-gray-50 p-1 rounded"
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="secondary" size="sm" onClick={handleCancel}>
              {t("Cancel")}
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave}>
              {t("Save")}
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
};
