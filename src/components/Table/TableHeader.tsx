import type { Header } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, ChevronUp, MoreVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { User } from "../../types";

interface TableHeaderProps {
  header: Header<User, unknown>;
  index: number;
}

export const TableHeader = ({ header }: TableHeaderProps) => {
  const isPinned = header.column.getIsPinned();
  const isSorted = header.column.getIsSorted();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: header.id });

  const style = {
    width: header.getSize(),
    position: "relative" as const,
    borderRight: "1px solid #c4c6c9ff",
    transform: CSS.Transform.toString(transform),
    transition,
    background: isDragging ? "gray" : isPinned ? "rgb(97 6 79)" : undefined,
  };

  return (
    <th
      ref={setNodeRef}
      {...attributes}
      style={style}
      colSpan={header.colSpan}
      className="select-none relative"
    >
      <div
        {...listeners}
        className="absolute left-1.5 top-1/2 -translate-y-1/2 cursor-grab z-30 select-none"
        style={{ userSelect: "none" }}
      >
        <span className="text-xs opacity-50">::</span>
      </div>

      <div className="absolute right-2 top-2 z-40" ref={menuRef}>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Options"
          className="text-black p-1 rounded hover:bg-gray-200 focus:outline-none"
          type="button"
        >
          <MoreVertical size={16} />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg text-black text-sm z-50">
            <ul>
              {isPinned !== "right" && (
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    header.column.pin("right");
                    setOpen(false);
                  }}
                >
                  Pin to Right
                </li>
              )}
              {isPinned !== "left" && (
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    header.column.pin("left");
                    setOpen(false);
                  }}
                >
                  Pin to Left
                </li>
              )}
              {isPinned && (
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    header.column.pin(false);
                    setOpen(false);
                  }}
                >
                  Unpin
                </li>
              )}

              <li
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  header.column.getToggleSortingHandler();
                  setOpen(false);
                }}
              >
                {isSorted === "desc" ? "Sort Asc" : "Sort Desc"}
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-1 select-text">
        {!header.isPlaceholder && (
          <span className="text-sm font-medium">
            {header.column.columnDef.header
              ? typeof header.column.columnDef.header === "function"
                ? header.column.columnDef.header(header.getContext())
                : header.column.columnDef.header
              : null}
          </span>
        )}

        {isSorted && (
          <span className="inline-block">
            {isSorted === "asc" && <ChevronDown size={14} />}
            {isSorted === "desc" && <ChevronUp size={14} />}
          </span>
        )}
      </div>

      <div
        onMouseDown={header.getResizeHandler()}
        onTouchStart={header.getResizeHandler()}
        className="absolute right-0 top-0 h-full w-1.5 cursor-col-resize hover:bg-blue-400 z-50"
      />
    </th>
  );
};
